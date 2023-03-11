import { Module, IORouter, GlobalState } from '../rack';
import { valToFreq } from '../../common';

function clip(x: number): number {
    const xx = x*x;
	return x * (27 + xx) / (27 + 9 * xx);
}

function crossfade(a: number, b: number, p: number): number {
	return a + (b - a) * p;
}

const STATE_LEN = 4;

export class VCF implements Module {
    omega0: number = 0;
    state: number[] = new Array(STATE_LEN);
    input: number = 0;
    resonance: number = 1;
    val: number = 0;
    dt: number = 0;

    k1: number[] = new Array(STATE_LEN);
    k2: number[] = new Array(STATE_LEN);
    k3: number[] = new Array(STATE_LEN);
    k4: number[] = new Array(STATE_LEN);
    yi: number[] = new Array(STATE_LEN);

    constructor() {
        this.state.fill(0);
        this.k1.fill(0);
        this.k2.fill(0);
        this.k3.fill(0);
        this.k4.fill(0);
        this.yi.fill(0);
    }

    next(io: IORouter, s: GlobalState) {
        const cutoff = io.getInput(0, 0);
        const val = io.getInput(1, 0);
        this.resonance = io.getInput(2, 1);
        const fc = Math.min(valToFreq(cutoff), 8000);
        this.omega0 = 2 * Math.PI * fc;
        this.dt = s.timeDelta;
        this.val = val;
        this.stepRK4(0, s.timeDelta, this.state);
        this.input = val;
        io.putOutput(0, this.state[3]);
    }

    topology() {
        return {
            inputs: ['cutoff', 'val', 'res'],
            outputs: ['out']
        };
    }

    odeFunc(t: number, x: number[], dxdt: number[]): void {
        const inputt = crossfade(this.input, this.val, t / this.dt);
        const inputc = clip(inputt - this.resonance * x[3]);
        const yc0 = clip(x[0]);
        const yc1 = clip(x[1]);
        const yc2 = clip(x[2]);
        const yc3 = clip(x[3]);

        dxdt[0] = this.omega0 * (inputc - yc0);
        dxdt[1] = this.omega0 * (yc0 - yc1);
        dxdt[2] = this.omega0 * (yc1 - yc2);
        dxdt[3] = this.omega0 * (yc2 - yc3);
    }

    stepRK4(t: number, dt: number, x: number[]): void {
        this.odeFunc(t, x, this.k1);

        for (let i = 0; i < STATE_LEN; i++) {
            this.yi[i] = x[i] + this.k1[i] * dt / 2;
        }
        this.odeFunc(t + dt / 2, this.yi, this.k2);

        for (let i = 0; i < STATE_LEN; i++) {
            this.yi[i] = x[i] + this.k2[i] * dt / 2;
        }
        this.odeFunc(t + dt / 2, this.yi, this.k3);

        for (let i = 0; i < STATE_LEN; i++) {
            this.yi[i] = x[i] + this.k3[i] * dt;
        }
        this.odeFunc(t + dt, this.yi, this.k4);

        for (let i = 0; i < STATE_LEN; i++) {
            x[i] += dt * (this.k1[i] + 2 * this.k2[i] + 2 * this.k3[i] + this.k4[i]) / 6;
        }
    }
}

