import { Worker } from 'worker_threads';
import path from 'path';

export interface Topology {
    inputs: string[];
    outputs: string[];
}

export interface IORouter {
    // getInput returns the value of inputIndex'th input
    getInput(inputIndex: number, defaultValue: number): number;

    // putOuput sets the value to the outputIndex'th output
    putOutput(outputIndex: number, value: number): void;
}

export interface Module {
    next(ioRouter: IORouter, state: GlobalState): void;
    topology(): Topology;
    onRequest?(...args: any[]): any;
    getViewConfig?(): any;
    shutdown?(): void;
}

export interface GlobalState {
    timeDelta: number; // TODO: change to rate = 1/timeDelta
    count: number; // integer
}

export class Rack {
    viewUpdater: (view: any) => void = () => { /* just do nothing */ };
    isViewReady: boolean = false;
    isViewNew: boolean = false;
    worker: Worker;
    view: any;
    instanceCalls: Record<string, (v: any) => void> = {};

    constructor() {
        console.log('Filename:', __filename, 'DirName:', __dirname);
        this.worker = new Worker(path.join(__dirname, 'rack-worker.js'));
        //new URL('./rack-worker.ts', import.meta.url) as NodeURL);
        this.worker.on('message', (message) => {
            //console.log('New message from worker:', message);
            if (message.type === 'new-view') {
                this.view = message.view;
                if (this.isViewReady) {
                    this.viewUpdater(this.view);
                    this.isViewNew = false;
                } else {
                    this.isViewNew = true;
                }
            } else if (message.type === 'instance-reply') {
                const { reply, token } = message;
                this.instanceCalls[token](reply);
                delete this.instanceCalls[token];
            }
        });
        process.on('exit', () => {
            console.log('terminating rack worker...');
            this.worker.postMessage({ cmd: 'exit' });
        });
    }

    load(filepath: string) {
        this.worker.postMessage({ cmd: 'load', filepath});
    }

    viewReady() {
        console.log('view ready');
        this.isViewReady = true;
        if (this.isViewNew) {
            this.viewUpdater(this.view);
            this.isViewNew = false;
        }
    }

    run() {
        this.worker.postMessage({ cmd: 'run' });
    }

    pause() {
        this.worker.postMessage({ cmd: 'pause' });
    }

    resume() {
        this.worker.postMessage({ cmd: 'resume' });
    }

    async handle(req: any) {
        const { request, params } = req;
        if (request === 'callInstance') {
            const token = this.genToken();
            const promise = new Promise(resolve => {
                this.instanceCalls[token] = resolve;
            });
            this.worker.postMessage({
                cmd: 'callInstance',
                params,
                token
            });
            return promise;
        } else if (request === 'callRack') {
            const { method, args } = params;
            return await ((this as any)[method])(...args); // another local nastyness
        }
    }

    private genToken(): string {
        return 'token-' + Math.floor(Math.random() * 1024*1024*1024*4)
                              .toString(16)
                              .padStart(8, '0');
    }

    setViewUpdater(updater: (view: any) => void) {
        this.viewUpdater = updater;
    }
}

export const rack = new Rack();
