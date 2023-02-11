import { Inputs, Outputs, GlobalState, Module } from '../rack';
import { fmod, blep } from '../util';
import { valToFreq } from '../../common';

export class SquareOsc implements Module {
    prevFreq = 0;
    prevPhase = 0;

    next(inp: Inputs, s: GlobalState): Outputs {
        const { base = 0.0, fm = 0.0, pw = 0.5 } = inp;
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
        return { out };
    }
}
