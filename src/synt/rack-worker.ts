import { parentPort } from 'worker_threads';

import type { GlobalState } from './rack';
import { MetaModule } from './modules/metamodule';
import { sleep } from './timer';

const RATE = 44100;

const STEPS_PER_RUN = 256;
const SLEEP_MS = 1;

class RackWorker {
    root: MetaModule;
    state: GlobalState;
    paused: boolean = true;
    shouldExit: boolean = false;
    
    load(filepath: string) {
        this.root = new MetaModule(filepath);
        parentPort.postMessage({ type: 'new-view', view: this.root.getView() });
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

    async run() {
        let pauseRequested = false;
        this.state = {
            count: 0,
            timeDelta: 1/RATE,
            requestPause: () => { pauseRequested = true; }
        };
        while(true) {
            while(this.paused) {
                if (this.shouldExit) {
                    return;
                }
                await sleep(100);
            }
            for (let i = 0; i < STEPS_PER_RUN; i++) {
                if (this.shouldExit) {
                    return;
                }
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

    async handleMessage(message: any) {
        if (message.cmd === 'pause') {
            this.pause();
        } else if (message.cmd === 'resume') {
            this.resume();
        } else if (message.cmd === 'load') {
            this.load(message.filepath);
        } else if (message.cmd === 'callInstance') {
            const { name, method, args } = message.params;
            const { token } = message;
            const instance = this.root.getInstance(name);
            const result = await ((instance as any)[method])(...args); // dirty but local
            parentPort.postMessage({ type: 'instance-reply', reply: result, token });
        } else if (message.cmd === 'run') {
            this.run();
        } else if (message.cmd === 'exit') {
            console.log('Rack worker: command to exit');
            this.shouldExit = true;
            this.shutdown();
        }
    }

    shutdown() {
        console.log('Rack stopped');
        this.root.shutdown();
    }
}

console.log('In rack worker');

const worker = new RackWorker();
parentPort.on('message', message => {
    worker.handleMessage(message);
});

