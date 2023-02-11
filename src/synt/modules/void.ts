import { Inputs, Outputs, GlobalState, Module } from '../rack';

const out = { out: 1 };

export class Void implements Module {
    prevFreq = 0;
    prevPhase = 0;

    next(_inp: Inputs, _s: GlobalState): Outputs {
        return out;
    }
}
