import { parentPort } from 'worker_threads';

import type { GlobalState } from './rack';
import { MetaModule } from './modules/metamodule';
import { sleep } from './timer';
import { performance } from 'perf_hooks';

const RATE = 44100;

const STEPS_PER_RUN = 128;
const SLEEP_MS = 1;
const EXCESS_MS = 100;

class RackWorker {
    root: MetaModule;
    state: GlobalState;
    paused: boolean = true;
    shouldExit: boolean = false;
    resumedTime: number = 0;
    workTime: number = 0;
    handleMessageTime: number = 0;
    runsSinceResume = 0;
    
    load(filepath: string) {
        this.root = new MetaModule(filepath);
        parentPort.postMessage({ type: 'new-view', view: this.root.getView() });
    }

    pause() {
        const t = performance.now();
        
        console.log(`Work time: ${this.workTime * 100 / (t - this.resumedTime)} %`);
        console.log(`Handle message time: ${this.handleMessageTime * 100 / (t - this.resumedTime)} %`);
        console.log('-> pause');
        this.paused = true;
    }

    resume() {
        this.resumedTime = performance.now();
        this.workTime = 0;
        this.handleMessageTime = 0;
        console.log('-> resume');
        this.paused = false;
        this.runsSinceResume = 0;
        return 'ok';
    }

    async run() {
        this.state = {
            count: 0,
            timeDelta: 1/RATE,
        };
        while(true) {
            while(this.paused) {
                if (this.shouldExit) {
                    return;
                }
                await sleep(100);
            }
            const t0 = performance.now();
            //this.root.resetStats();
            for (let i = 0; i < STEPS_PER_RUN; i++) {
                if (this.shouldExit) {
                    return;
                }
                this.root.next({}, this.state);
                this.state.count++;
            }
            this.runsSinceResume++;
            const t1 = performance.now();
            const timeSinceResume = t1 - this.resumedTime;
            const timeProduced = this.runsSinceResume * STEPS_PER_RUN * 1000 / RATE;
            const excess = timeProduced - timeSinceResume - EXCESS_MS;
            if (excess > 5) {
                await sleep(excess);
            }
            this.workTime += t1 - t0;
            //console.log(this.root.getStats());
        }
    }

    async handleMessage(message: any) {
        const t0 = performance.now();
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
        const t1 = performance.now();
        this.handleMessageTime += t1 - t0;
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

