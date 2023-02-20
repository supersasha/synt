import { IORouter, GlobalState, Module } from '../rack';

export class Amplifier implements Module {
    next(io: IORouter, _s: GlobalState) {
        const signal = io.getInput(0, 0);
        const q = io.getInput(1, 0);
        io.putOutput(0, q * signal);
    }

    topology() {
        return {
            inputs: ['signal', 'q'],
            outputs: ['out']
        };
    }
}

/*
export class Step implements Module {
    next(inp: Inputs, s: GlobalState): Outputs {
        const t = s.count * s.timeDelta;
        return {
            out: t < inp.t0? inp.v0 : inp.v1
        };
    }
}
*/

/*
export class OutputAccumulator {
    xs: number[] = [];
    ys: number[] = [];
    next(inp: Inputs, s: GlobalState): Outputs {
        this.xs.push(s.count * s.timeDelta);
        this.ys.push(inp.output);
        return {};
    }
    
    accumulated() {
        const { xs, ys } = this;
        return { xs, ys };
    }
}
*/
