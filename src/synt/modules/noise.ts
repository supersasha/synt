import { Topology, IORouter, GlobalState, Module } from '../rack';

export class Noise implements Module {
    next(io: IORouter, _s: GlobalState) {
        io.putOutput(0, Math.random() * 2 - 1);
    }

    topology(): Topology {
        return {
            inputs: [],
            outputs: ['out']
        };
    }
}

