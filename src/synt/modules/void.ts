import { IORouter, GlobalState, Module, Topology } from '../rack';

export class Void implements Module {
    next(_io: IORouter, _s: GlobalState) {
    }

    topology(): Topology {
        return {
            inputs: [],
            outputs: []
        };
    }
}
