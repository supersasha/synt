import { Inputs, Outputs, GlobalState, Module } from '../rack';

export class Kxb implements Module {
    next(inp: Inputs, _s: GlobalState): Outputs {
        const { k, b, x } = inp;
        return { out: k * x + b };
    }
}

