export function fmod(x: number, y: number): number {
    const d = x / y;
    return (d - Math.floor(d)) * y;
}

/*
    Based on Poly BLEP:
    https://github.com/martinfinke/PolyBLEP/blob/master/PolyBLEP.cpp
*/

export function blep(t: number, dt: number) {
    if (t < dt) {
        const x = t / dt - 1;
        return -(x*x);
    } else if (t > 1 - dt) {
        const x = (t - 1) / dt + 1;
        return x*x;
    } else {
        return 0;
    }
}
