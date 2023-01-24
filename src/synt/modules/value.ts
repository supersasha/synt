import { Module, Inputs, Outputs, GlobalState } from '../rack';

export class Value implements Module {
    value: number;
    min: number;
    max: number;
    init: number;
    title: string;
    intent: string;

    constructor(min = -1, max = 1, title = '', init = 0, intent='linear') {
        this.min = min;
        this.max = max;
        this.title = title;
        this.init = init;
        this.value = init;
        this.intent = intent;
    }

    next(_inp: Inputs, _state: GlobalState): Outputs {
        return { out: this.value };
    }

    setValue(val: number) {
        //console.log(`New value for ${this.title}: ${val}`);
        this.value = val;
    }

    getViewConfig() {
        const { min, max, title, init, intent } = this;
        return {
            type: 'knob',
            min,
            max,
            title,
            init,
            intent,
        };
    }
}

