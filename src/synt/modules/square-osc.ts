import { IORouter, GlobalState, Module } from '../rack';
import { fmod, blep } from '../util';
import { valToFreq } from '../../common';

export class SquareOsc implements Module {
    prevFreq = 0;
    prevPhase = 0;

    next(io: IORouter, s: GlobalState) {
        const base = io.getInput(0, 0);
        const fm = io.getInput(1, 0);
        const pw = io.getInput(2, 0.5);
        const freq = valToFreq(base + fm);

        const t = s.timeDelta * s.count;
        const phase0 = (this.prevFreq - freq) * t + this.prevPhase;
        const phase = phase0 - Math.floor(phase0);
        this.prevFreq = freq;
        this.prevPhase = phase;

        const p = t * freq + phase;
        const p1 = fmod(p, 1);
        const p2 = fmod(p1 + 1 - pw, 1);
        
        let out = (p1 < pw) ? 1 : -1;
        out += blep(p1, s.timeDelta * freq ) - blep(p2, s.timeDelta * freq);
        io.putOutput(0, out);
    }

    topology() {
        return {
            inputs: ['base', 'fm', 'pw'],
            outputs: ['out']
        };
    }
}
