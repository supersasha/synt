const BASE_FREQ_HZ = 440;

export function freqToVal(freqHz: number, baseFreqHz: number = BASE_FREQ_HZ): number {
    if (freqHz <= 0) {
        return -1;
    }
    return Math.log2(freqHz/baseFreqHz) / 10;
}

export function valToFreq(val: number, baseFreqHz: number = BASE_FREQ_HZ): number {
    return baseFreqHz * Math.pow(2, 10 * val);
}

export function secsToVal(secs: number): number {
    if (secs <= 0) {
        return -1;
    }
    return Math.log2(secs) / 10;
}

export function valToSecs(val: number): number {
    return Math.pow(2, 10 * val);
}

export function dBToAmpl(dB: number): number {
    return Math.pow(10, dB/20 /* db/10 ??? */);
}

export function amplToDb(ampl: number): number {
    return 20 * Math.log10(ampl);
}

