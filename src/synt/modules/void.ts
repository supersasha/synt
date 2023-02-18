import { Inputs, Outputs, GlobalState, Module } from '../rack';

const out = { out1: 0, out2: 1 };

export class Void implements Module {
    next(_inp: Inputs, _s: GlobalState): Outputs {
        return out;
    }
}
