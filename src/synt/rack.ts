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
}

export interface GlobalState {
    timeDelta: number; // TODO: change to rate = 1/timeDelta
    count: number; // integer

    requestPause(): void;
}

export const RATE = 44100;

const STEPS_PER_RUN = 128;
const SLEEP_MS = 1;

export class Rack {
    root: MetaModule;
    state: GlobalState;

    constructor(filepath: string) {
        this.root = new MetaModule(filepath);
    }

    async run() {
        let pauseRequested = false;
        this.state = {
            count: 0,
            timeDelta: 1/RATE,
            requestPause: () => { pauseRequested = true; }
        };
        while(true) {
            for (let i = 0; i < STEPS_PER_RUN; i++) {
                this.root.next({}, this.state);
                this.state.count++;
            }
            if (pauseRequested) {
                //console.log('Pause requested');
                pauseRequested = false;
            }
            await sleep(SLEEP_MS);
        }
    }
}
