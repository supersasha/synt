import { Module, IORouter, GlobalState } from '../rack';
import { EdgeDetector, Edge } from '../edge-detector';
import { valToSecs, dBToAmpl, secsToVal } from '../../common';

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
const DEFAULT_ATTACK = secsToVal(0.01);
const DEFAULT_DECAY = -0.2;
const DEFAULT_SUSTAIN = -10;
const DEFAULT_RELEASE = -0.1;

export class Envelope implements Module {
    private phase = Phase.WAIT;
    private phaseStart = 0;
    private edgeDet = new EdgeDetector();
    private edge = Edge.None;
    private preKeyOffdB = 0;
    private preKeyOndB = DB_MIN;
    private releaseStart: undefined | number;

    next(io: IORouter, gs: GlobalState) {
        const gate = io.getInput(0, -1);
        this.edge = this.edgeDet.detect(gate);
        let out = 0;
        if (this.phase === Phase.WAIT) {
            out = this.wait(io, gs);
        } else if (this.phase === Phase.DELAY) {
            out = this.delay(io, gs);
        } else if (this.phase === Phase.ATTACK) {
            out = this.attack(io, gs);
        } else if (this.phase === Phase.HOLD) {
            out = this.hold(io, gs);
        } else if (this.phase === Phase.DECAY) {
            out = this.decay(io, gs);
        } else if (this.phase === Phase.SUSTAIN) {
            out = this.sustain(io, gs);
        } else if (this.phase === Phase.RELEASE) {
            out = this.release(io, gs);
        }
        io.putOutput(0, out);
    }

    topology() {
        return {
            //         0        1        2         3       4         5          6
            inputs: ['gate', 'delay', 'attack', 'hold', 'decay', 'sustain', 'release'],
            outputs: ['out']
        };
    }

    wait(io: IORouter, gs: GlobalState) {
        const t = gs.timeDelta * gs.count;
        if (this.edge === Edge.Rising) {
            this.setPhase(Phase.DELAY, t);
        }
        const dt = t - (this.releaseStart || this.phaseStart);
        const dB = Math.max(DB_MIN, this.releasedB(io, dt));
        return dBToAmpl(dB);
    }

    delay(io: IORouter, gs: GlobalState) {
        const delay = io.getInput(1, -1);
        const t = gs.timeDelta * gs.count;
        const dt = t - this.phaseStart;
        if (this.edge === Edge.Falling) {
            this.setPhase(Phase.RELEASE, t);
        }
        if (dt >= valToSecs(delay)) {
            this.setPhase(Phase.ATTACK, t);
        }
        const dt2 = t - (this.releaseStart || this.phaseStart);
        const dB = Math.max(DB_MIN, this.releasedB(io, dt2));
        return dBToAmpl(dB);
    }

    attack(io: IORouter, gs: GlobalState) {
        const attack = io.getInput(2, DEFAULT_ATTACK);
        const t = gs.timeDelta * gs.count;
        const dt = t - this.phaseStart;
        if (this.edge === Edge.Falling) {
            this.setPhase(Phase.RELEASE, t);
        }
        const attackSecs = valToSecs(attack);
        if (dt >= attackSecs) {
            this.setPhase(Phase.HOLD, t);
        }
        const dB = this.preKeyOndB + dt * (0 - this.preKeyOndB) / attackSecs;
        this.preKeyOffdB = dB;
        const ampl = dBToAmpl(dB);
        return ((ampl > 1) ? 1 : ampl);
    }

    hold(io: IORouter, gs: GlobalState) {
        const hold = io.getInput(3, -1);
        const t = gs.timeDelta * gs.count;
        const dt = t - this.phaseStart;
        if (this.edge === Edge.Falling) {
            this.setPhase(Phase.RELEASE, t);
        }
        if (dt >= valToSecs(hold)) {
            this.setPhase(Phase.DECAY, t);
        }
        return 1;
    }

    decay(io: IORouter, gs: GlobalState) {
        const decay = io.getInput(4, DEFAULT_DECAY);
        const sustain = io.getInput(5, -10);
        const t = gs.timeDelta * gs.count;
        const dt = t - this.phaseStart;
        if (this.edge === Edge.Falling) {
            this.setPhase(Phase.RELEASE, t);
        }
        const decaySecs = valToSecs(decay);
        if (dt >= decaySecs) {
            this.setPhase(Phase.SUSTAIN, t);
        }
        const dB = dt / decaySecs * sustain;
        this.preKeyOffdB = dB;
        const ampl = dBToAmpl(dB);
        if (dB == 0) {
            console.log('--');
        }
        return ampl;
    }

    sustain(io: IORouter, gs: GlobalState) {
        const sustain = io.getInput(5, DEFAULT_SUSTAIN);
        const t = gs.timeDelta * gs.count;
        if (this.edge === Edge.Falling) {
            this.setPhase(Phase.RELEASE, t);
        }
        return dBToAmpl(sustain);
    }

    release(io: IORouter, gs: GlobalState) {
        const release = io.getInput(6, DEFAULT_RELEASE);
        const t = gs.timeDelta * gs.count;
        const dt = t - this.phaseStart;
        if (this.edge === Edge.Rising) {
            this.setPhase(Phase.DELAY, t);
        } else if (dt >= valToSecs(release)) {
            this.setPhase(Phase.WAIT, t);
        }
        const dB = this.releasedB(io, dt);
        this.preKeyOndB = dB;
        const ampl = dBToAmpl(dB);
        return ampl;
    }

    releasedB(io: IORouter, dt: number) {
        const sustain = io.getInput(5, DEFAULT_SUSTAIN);
        const release = io.getInput(6, DEFAULT_RELEASE);
        const dB = this.preKeyOffdB + dt * (DB_MIN - sustain) / valToSecs(release);
        return dB;
    }

    setPhase(phase: Phase, time: number): void {
        this.phase = phase;
        this.phaseStart = time;
        if (phase === Phase.RELEASE) {
            this.releaseStart = time;
        }
    }
}
