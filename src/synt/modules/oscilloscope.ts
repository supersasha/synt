import { Module, Inputs, Outputs, GlobalState } from '../rack';
import { sleep } from '../timer';

export interface OscilloscopeData {
    xs: number[];
    ys: number[];
};

const MAX_COUNTS_PER_MAX_WINDOW = 10 /* seconds */ * 200000;

export class Oscilloscope implements Module {
    prev = 0;
    started = false;
    startedCount = 0;
    //acc: OscilloscopeData = { xs: [], ys: [] };

    // xs and ys are interleaved
    acc: Float32Array = new Float32Array(MAX_COUNTS_PER_MAX_WINDOW * 2);
    out?: Float32Array; //OscilloscopeData;
    outputs = {};

    title: string;

    constructor(title = "oscilloscope") {
        this.title = title;
    }

    next(inp: Inputs, s: GlobalState): Outputs {
        const { val, winTime, threshold } = inp;
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
        }
        if (this.started) {
            this.acc[2 * count] = dt;
            this.acc[2 * count + 1] = val;
        }
        return this.outputs;
    }

    async getData(): Promise<Float32Array> {
        while (!this.out) {
            await sleep(20);
        }
        const res = this.out;
        this.out = undefined;
        return res;
    }

    getViewConfig() {
        return {
            type: 'oscilloscope',
            title: this.title,
        };
    }
}
