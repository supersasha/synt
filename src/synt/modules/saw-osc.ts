import { IORouter, GlobalState, Module } from '../rack';
import { fmod, blep } from '../util';
import { valToFreq } from '../../common';
import { Oscillator } from '../oscillator';

/*
export interface SawState {
    freq: number;
    phase: number;
}

export function saw(state: SawState, t: number, dt: number, freq: number): number {
    const phase0 = (state.freq - freq) * t + state.phase;
    const phase = phase0 - Math.floor(phase0);
    state.freq = freq;
    state.phase = phase;

    const p = t * freq + phase;
    const p1 = fmod(p, 1);

    return 2 * p1 - 1 - blep(p1, dt * freq);
}
*/

export class Saw implements Oscillator {
    freq: number = 0;
    phase: number = 0;

    out(t: number, dt: number, freq: number): number {
        const phase0 = (this.freq - freq) * t + this.phase;
        const phase = phase0 - Math.floor(phase0);
        this.freq = freq;
        this.phase = phase;

        const p = t * freq + phase;
        const p1 = fmod(p, 1);

        return 2 * p1 - 1 - blep(p1, dt * freq);
    }
}

export class SawOsc implements Module {
    /*
    prevFreq = 0;
    prevPhase = 0;
    */
    saw = new Saw();

    next(io: IORouter, s: GlobalState) {
        const base = io.getInput(0, 0);
        const fm = io.getInput(1, 0);
        const freq = valToFreq(base + fm);

        const t = s.timeDelta * s.count;

        /*
        const phase0 = (this.prevFreq - freq) * t + this.prevPhase;
        const phase = phase0 - Math.floor(phase0);
        this.prevFreq = freq;
        this.prevPhase = phase;

        const p = t * freq + phase;
        const p1 = fmod(p, 1);
        
        let out = 2 * p1 - 1;
        out -= blep(p1, s.timeDelta * freq);
        */

        const out = this.saw.out(t, s.timeDelta, freq);
        io.putOutput(0, out);
    }

    topology() {
        return {
            inputs: ['base', 'fm'],
            outputs: ['out']
        };
    }
}
