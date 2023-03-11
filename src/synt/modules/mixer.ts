import { Module, IORouter, GlobalState, Topology } from '../rack';

export class Mixer implements Module {
    N: number;

    constructor(N: number = 5) {
        this.N = N;
    }

    next(io: IORouter, _state: GlobalState): void {
        let out = 0;
        for (let i = 0; i < this.N; i++) {
            out += io.getInput(i, 0);
        }
        io.putOutput(0, out);
    }

    topology(): Topology {
        const inputs: string[] = [];
        for (let i = 0; i < this.N; i++) {
            inputs.push(`in${i+1}`);
        }
        return {
            inputs,
            outputs: ['out']
        }; 
    }
}

