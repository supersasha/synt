import { Module, Inputs, Outputs, GlobalState } from '../rack';

export class Value implements Module {
    value: number;
    min: number;
    max: number;
    init: number;
    title: string;

    constructor(min = -1, max = 1, title = '', init = 0) {
        this.min = min;
        this.max = max;
        this.title = title;
        this.init = init;
        this.value = init;
    }

    next(_inp: Inputs, _state: GlobalState): Outputs {
        return { out: this.value };
    }

    setValue(val: number) {
        this.value = val;
    }

    getViewConfig() {
        const { min, max, title, init } = this;
        return {
            type: 'knob',
            min,
            max,
            title,
            init,
        };
    }
}

