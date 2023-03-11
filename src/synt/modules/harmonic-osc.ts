import { valToFreq } from '../../common';
import { Oscillator } from '../oscillator';
import { IORouter, GlobalState, Module, Topology } from '../rack';
import { Saw } from './saw-osc';

const oscillators: Record<string, Oscillator & { new(): Oscillator; }> = {
    Saw
};

export class HarmonicOsc implements Module {
    count: number;
    oscs: Oscillator[] = [];

    constructor(count: number, name: string) {
        this.count = count;
        for (let i = 0; i < count; i++) {
            this.oscs.push(new oscillators[name]);
        }
    }

    next(io: IORouter, state: GlobalState): void {
        const freq = io.getInput(0, 0);
        const dev = io.getInput(1, 0);
        const t = state.timeDelta * state.count;

        let out = 0;
        const fMin = valToFreq(freq - dev/2);
        //const fMax = valToFreq(freq + dev/2);
        //const maxF = freq + dev/2;
        //const fStep = valToFreq(dev/(this.count - 1));
        //const fStep = Math.exp(Math.log(fMax/fMin) / (this.count - 1));
        const fStep = Math.pow(2, 10 * dev / (this.count - 1));
        
        let f = fMin;
        for (let i = 0; i < this.count; i++) {
            out += this.oscs[i].out(t, state.timeDelta, f);
            f *= fStep;
            /*
            out += this.oscs[i].out(t, state.timeDelta,
                valToFreq(freq + minF + (maxF-minF) * i / (this.count - 1)));
            */
        }
        //console.log(out);

        io.putOutput(0, out);
    }

    topology(): Topology {
        return {
            inputs: ['freq', 'dev'],
            outputs: ['out']
        };
    }
}

