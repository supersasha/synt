import { MetaModule } from './modules/metamodule';
import {sleep} from './timer';

export interface Inputs {
    [name: string]: number;
}

export interface Outputs {
    [name: string]: number;
}

export interface Module {
    next(inp: Inputs, state: GlobalState): Outputs;
    onRequest?(...args: any[]): any;
    getViewConfig?(): any;
}

export interface GlobalState {
    timeDelta: number; // TODO: change to rate = 1/timeDelta
    count: number; // integer

    requestPause(): void;
}

export const RATE = 44100;

const STEPS_PER_RUN = 256;
const SLEEP_MS = 6;

export class Rack {
    root: MetaModule;
    state: GlobalState;
    paused: boolean = true;
    viewUpdater: (view: any) => void = () => { /* just do nothing */ };
    isViewReady: boolean = false;
    isViewNew: boolean = false;

    updateView() {
        console.log('about to update view');
        if (this.isViewReady && this.isViewNew) {
            console.log('updating view');
            const view = this.root.getView();
            this.viewUpdater(view);
            this.isViewNew = false;
        }
    }

    load(filepath: string) {
        this.root = new MetaModule(filepath);
        this.isViewNew = true;
        this.updateView();
        this.run();
    }

    async run() {
        let pauseRequested = false;
        this.state = {
            count: 0,
            timeDelta: 1/RATE,
            requestPause: () => { pauseRequested = true; }
        };
        while(true) {
            while(this.paused) {
                await sleep(100);
            }
            for (let i = 0; i < STEPS_PER_RUN; i++) {
                this.root.next({}, this.state);
                this.state.count++;
                if (pauseRequested) {
                    await sleep(5);
                    pauseRequested = false;
                    break;
                }
            }
            //console.log('Pause requested');
            await sleep(SLEEP_MS);
        }
    }

    pause() {
        console.log('-> pause');
        this.paused = true;
    }

    resume() {
        console.log('-> resume');
        this.paused = false;
        return 'ok';
    }

    viewReady() {
        this.isViewReady = true;
        this.isViewNew = true;
        this.updateView();
    }

    async handle(req: any) {
        const { request, params } = req;
        if (request === 'callInstance') {
            const { name, method, args } = params;
            const instance = this.root.getInstance(name);
            return await ((instance as any)[method])(...args); // dirty but local
        } else if (request === 'callRack') {
            const { method, args } = params;
            return await ((this as any)[method])(...args); // another local nastyness
        }
    }

    setViewUpdater(updater: (view: any) => void) {
        this.viewUpdater = updater;
    }
}

export const rack = new Rack();
