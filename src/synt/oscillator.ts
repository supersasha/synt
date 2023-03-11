export interface Oscillator {
    out(t: number, dt: number, freq: number): number;
}
