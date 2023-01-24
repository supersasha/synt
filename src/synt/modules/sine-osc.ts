import { Inputs, Outputs, GlobalState, Module } from '../rack';
import { valToFreq } from '../../common';

export class SineOsc implements Module {
    prevFreq = 440;
    prevPhase = 0;

    next(inp: Inputs, s: GlobalState): Outputs {
        const { base = 0.0, fm = 0.0 } = inp;
        const freq = valToFreq(base + fm);
        const t = s.timeDelta * s.count;

        // 2*pi*(f1*t + phi1) = 2*pi*(f2*t + phi2);
        // f1*t + phi1 = f2*t + phi2
        // phi2 = (f1-f2)*t+phi1
        // phi2 = phi2 - [phi2]
        const phase0 = (this.prevFreq - freq) * t + this.prevPhase;
        const phase = phase0 - Math.floor(phase0);

        this.prevFreq = freq;
        this.prevPhase = phase;
        return {
            out: Math.sin(2 * Math.PI * (freq * t + phase))
        };
    }
}

