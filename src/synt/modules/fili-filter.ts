import { Module, IORouter, GlobalState } from '../rack';
import fili from 'fili';
import { valToFreq } from '../../common';

export class FiliFilter implements Module {
    fc = -1;
    iirCalculator: any;
    iirFilterCoeffs: any;
    iirFilter: any;

    history: number[];
    historyPos: number;
    historySize: number = 10;

    constructor() {
        this.iirCalculator = new fili.CalcCascades();
        this.history = new Array(this.historySize);
        this.history.fill(0);
        this.historyPos = 0;
        console.log('history:', this.history);
    }

    next(io: IORouter, s: GlobalState) {
        const cutoff = io.getInput(0, 0);
        const val = io.getInput(1, 0);
        const fc = valToFreq(cutoff);
        if (this.fc !== fc) {
            this.recalc(fc, s.timeDelta);
        }
        this.history[this.historyPos] = val;
        this.historyPos++;
        if (this.historyPos >= this.historySize) {
            this.historyPos = 0;
        }
        const out = this.iirFilter.singleStep(val);
        io.putOutput(0, out);
    }

    topology() {
        return {
            inputs: ['cutoff', 'val'],
            outputs: ['out']
        };
    }

    recalc(fc: number, timeDelta: number): void {
        this.fc = fc;
        const samplingRate = Math.round(1 / timeDelta);
        this.iirFilterCoeffs = this.iirCalculator.lowpass({
            order: 4,
            characteristic: 'butterworth',
            //transform: 'matchedZ',
            Fs: samplingRate,
            Fc: fc,
            gain: 0,
            preGain: false,
        });
        this.iirFilter = new fili.IirFilter(this.iirFilterCoeffs);
        console.log('Fili recalc:', this.historyPos);
        for (let i = 0; i < this.historySize; i++) {
            let j = this.historyPos - this.historySize + i;
            if (j < 0) {
                j += this.historySize;
            }
            //console.log(j, this.history[j]);
            this.iirFilter.singleStep(this.history[j]);
        }
    }
}
