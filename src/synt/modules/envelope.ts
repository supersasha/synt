import { Module, Inputs, Outputs, GlobalState } from '../rack';
import { EdgeDetector, Edge, EdgeState } from '../edge-detector';

enum Phase {
    WAIT,
    DELAY,
    ATTACK,
    HOLD,
    DECAY,
    SUSTAIN,
    RELEASE
}

const DB_MIN = -100;

function dBToAmpl(dB: number): number {
    return Math.pow(10, dB/20 /* db/10 ??? */);
}

function amplToDb(ampl: number): number {
    return 20 * Math.log10(ampl);
}

export class Envelope implements Module {
    private phase = Phase.WAIT;
    private phaseStart = 0;
    private edgeDet = new EdgeDetector();
    private edge = Edge.None;
    private preKeyOffdB = 0;
    private preKeyOndB = DB_MIN;
    private releaseStart: undefined | number;

    next(ins: Inputs, gs: GlobalState) : Outputs {
        const { gate } = ins;
        this.edge = this.edgeDet.detect(gate);
        if (this.phase === Phase.WAIT) {
            return this.wait(ins, gs);
        } else if (this.phase === Phase.DELAY) {
            return this.delay(ins, gs);
        } else if (this.phase === Phase.ATTACK) {
            return this.attack(ins, gs);
        } else if (this.phase === Phase.HOLD) {
            return this.hold(ins, gs);
        } else if (this.phase === Phase.DECAY) {
            return this.decay(ins, gs);
        } else if (this.phase === Phase.SUSTAIN) {
            return this.sustain(ins, gs);
        } else if (this.phase === Phase.RELEASE) {
            return this.release(ins, gs);
        }
        //return { out: 0 }; // never
    }

    wait(ins: Inputs, gs: GlobalState): Outputs {
        const t = gs.timeDelta * gs.count;
        if (this.edge === Edge.Rising) {
            this.setPhase(Phase.DELAY, t);
        }
        const dt = t - (this.releaseStart || this.phaseStart);
        const dB = Math.max(DB_MIN, this.releasedB(ins, dt));
        return { out: dBToAmpl(dB) };
    }

    delay(ins: Inputs, gs: GlobalState): Outputs {
        const { delay } = ins;
        const t = gs.timeDelta * gs.count;
        const dt = t - this.phaseStart;
        if (this.edge === Edge.Falling) {
            this.setPhase(Phase.RELEASE, t);
        }
        if (dt >= delay) {
            this.setPhase(Phase.ATTACK, t);
        }
        const dt2 = t - (this.releaseStart || this.phaseStart);
        const dB = Math.max(DB_MIN, this.releasedB(ins, dt2));
        return { out: dBToAmpl(dB) };
    }

    attack(ins: Inputs, gs: GlobalState): Outputs {
        const { attack } = ins;
        const t = gs.timeDelta * gs.count;
        const dt = t - this.phaseStart;
        if (this.edge === Edge.Falling) {
            this.setPhase(Phase.RELEASE, t);
        }
        if (dt >= attack) {
            this.setPhase(Phase.HOLD, t);
        }
        const dB = this.preKeyOndB + dt * (0 - this.preKeyOndB) / attack;
        this.preKeyOffdB = dB;
        const ampl = dBToAmpl(dB);
        return { out: (ampl > 1 ? 1 : ampl) };
    }

    hold(ins: Inputs, gs: GlobalState): Outputs {
        const { hold } = ins;
        const t = gs.timeDelta * gs.count;
        const dt = t - this.phaseStart;
        if (this.edge === Edge.Falling) {
            this.setPhase(Phase.RELEASE, t);
        }
        if (dt >= hold) {
            this.setPhase(Phase.DECAY, t);
        }
        return { out: 1 };
    }

    decay(ins: Inputs, gs: GlobalState): Outputs {
        const { decay, sustain } = ins;
        const t = gs.timeDelta * gs.count;
        const dt = t - this.phaseStart;
        if (this.edge === Edge.Falling) {
            this.setPhase(Phase.RELEASE, t);
        }
        if (dt >= decay) {
            this.setPhase(Phase.SUSTAIN, t);
        }
        const dB = dt / decay * sustain;
        this.preKeyOffdB = dB;
        const ampl = dBToAmpl(dB);
        if (dB == 0) {
            console.log('--');
        }
        return { out: ampl };
    }

    sustain(ins: Inputs, gs: GlobalState): Outputs {
        const { sustain } = ins;
        const t = gs.timeDelta * gs.count;
        if (this.edge === Edge.Falling) {
            this.setPhase(Phase.RELEASE, t);
        }
        return { out: dBToAmpl(sustain) };
    }

    release(ins: Inputs, gs: GlobalState): Outputs {
        const { sustain, release } = ins;
        const t = gs.timeDelta * gs.count;
        const dt = t - this.phaseStart;
        if (this.edge === Edge.Rising) {
            this.setPhase(Phase.DELAY, t);
        } else if (dt >= release) {
            this.setPhase(Phase.WAIT, t);
        }
        const dB = this.releasedB(ins, dt);
        this.preKeyOndB = dB;
        const ampl = dBToAmpl(dB);
        return { out: ampl };
    }

    releasedB(ins: Inputs, dt: number) {
        const { sustain, release } = ins;
        const dB = this.preKeyOffdB + dt * (DB_MIN - sustain) / release;
        return dB;
    }

    setPhase(phase: Phase, time: number): void {
        this.phase = phase;
        this.phaseStart = time;
        if (phase === Phase.RELEASE) {
            this.releaseStart = time;
        }
        //console.log(Phase[phase]);
    }
}
