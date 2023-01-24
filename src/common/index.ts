const BASE_FREQ_HZ = 440;

export function freqToVal(freqHz: number, baseFreqHz: number = BASE_FREQ_HZ): number {
    return Math.log2(freqHz/baseFreqHz) / 10;
}

export function valToFreq(val: number, baseFreqHz: number = BASE_FREQ_HZ): number {
    return baseFreqHz * Math.pow(2, 10 * val);
}
