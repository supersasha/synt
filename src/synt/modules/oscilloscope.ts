import { Module, IORouter, Topology, GlobalState } from '../rack';

export interface OscilloscopeData {
    xs: number[];
    ys: number[];
};

const MAX_COUNTS_PER_MAX_WINDOW = 10 /* seconds */ * 200000;

export class Oscilloscope implements Module {
    prev = 0;
    started = false;
    startedCount = 0;

    // xs and ys are interleaved
    acc: Float32Array = new Float32Array(MAX_COUNTS_PER_MAX_WINDOW * 2);
    out?: Float32Array;

    title: string;

    resolve?: (data: Float32Array) => void;

    constructor(title = "oscilloscope") {
        this.title = title;
    }

    next(io: IORouter, s: GlobalState) {
        const val = io.getInput(0, 0);
        const winTime = io.getInput(1, 0.1);
        const threshold = io.getInput(2, 0);
        if (!this.started && this.prev <= threshold && threshold < val) {
            this.started = true;
            this.startedCount = s.count;
        }
        this.prev = val;
        const count = (s.count - this.startedCount);
        const dt = count * s.timeDelta;
        if (this.started && dt >= winTime) {
            this.started = false;
            this.out = this.acc.slice(0, count);
            if (this.resolve) {
                this.resolve(this.out);
                this.out = undefined;
                this.resolve = undefined;
            }
        }
        if (this.started) {
            this.acc[2 * count] = dt;
            this.acc[2 * count + 1] = val;
        }
    }

    topology(): Topology {
        return {
            inputs: ['val', 'winTime', 'threshold'],
            outputs: []
        };
    }
    
    getData(): Promise<Float32Array> {
        if (this.out) {
            const res = this.out;
            this.out = undefined;
            return Promise.resolve(res);
        }
        return new Promise(resolve => {
            this.resolve = resolve;
        });
    }

    getViewConfig() {
        return {
            type: 'oscilloscope',
            title: this.title,
        };
    }
}
