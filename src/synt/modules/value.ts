import { Module, Inputs, Outputs, GlobalState } from '../rack';

export class Value implements Module {
    value: number = 0;

    next(_inp: Inputs, _state: GlobalState): Outputs {
        return { out: this.value };
    }

    setValue(val: number) {
        this.value = val;
    }
}

