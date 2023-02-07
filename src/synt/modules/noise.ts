import { Inputs, Outputs, GlobalState, Module } from '../rack';

export class Noise implements Module {
    next(_inp: Inputs, _s: GlobalState): Outputs {
        return { out: Math.random() * 2 - 1 };
    }
}

