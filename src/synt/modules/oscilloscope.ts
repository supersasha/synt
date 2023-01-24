import { Module, Inputs, Outputs, GlobalState } from '../rack';
import { sleep } from '../timer';

export interface OscilloscopeData {
    xs: number[];
    ys: number[];
};

export class Oscilloscope implements Module {
    prev = 0;
    started = false;
    startedCount = 0;
    acc: OscilloscopeData = { xs: [], ys: [] };
    out?: OscilloscopeData;

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
        const dt = (s.count - this.startedCount) * s.timeDelta;
        if (this.started && dt >= winTime) {
            this.started = false;
            this.out = this.acc;
            this.acc = { xs: [], ys: [] };
        }
        if (this.started) {
            this.acc.xs.push(dt);
            this.acc.ys.push(val); // TODO: no push, constant length, maybe buffer or typed array
        }
        return {};
    }

    async getData(): Promise<OscilloscopeData> {
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
