import { Module, IORouter, GlobalState, Topology } from '../rack';

export class Harmonics implements Module {
    N: number;

    constructor(N: number = 5) {
        this.N = N;
    }

    next(io: IORouter, _state: GlobalState): void {
        const base = io.getInput(0, 0);
        const diff = io.getInput(1, 0);
        const minF = base - diff/2;
        const maxF = base + diff/2;
        for (let i = 0; i < this.N; i++) {
            io.putOutput(i, base + minF + (maxF-minF) * i / (this.N - 1));
        }
    }

    topology(): Topology {
        const outputs: string[] = [];
        for (let i = 0; i < this.N; i++) {
            outputs.push(`f${i+1}`);
        }
        return {
            inputs: ['base', 'diff'],
            outputs
        }; 
    }
}
