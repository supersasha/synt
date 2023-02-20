import { IORouter, GlobalState, Module } from '../rack';

export class Kxb implements Module {
    next(io: IORouter, _s: GlobalState) {
        const k = io.getInput(0, 1);
        const x = io.getInput(1, 0);
        const b = io.getInput(2, 0);
        io.putOutput(0, k * x + b);
    }

    topology() {
        return {
            inputs: ['k', 'x', 'b'],
            outputs: ['out']
        };
    }
}

