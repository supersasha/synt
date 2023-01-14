import PulseAudio from 'pulseaudio2';
import { Module, Inputs, Outputs, GlobalState } from '../rack';

const DATA_SIZE = 4096;

export class Audio implements Module {
    private context = new PulseAudio();
    private player: PulseAudio.PlaybackStream;
    private data = new Float32Array(DATA_SIZE);
    private pos = 0;
    private needDrain = false;
    //private t0 = Date.now();
    private outOfOnce = true;

    constructor(rate = 44100) {
        this.player = this.context.createPlaybackStream({
            channels: 1,
            format: 'F32LE',
            rate,
            latency: 20000, // can be a number > 0, microseconds
        });
        this.context.on('error', err => {
            console.log('Context error:', err);
        });
        this.player.on('error', err => {
            console.log('Player error:', err);
        });
        this.player.on('drain', () => {
            //console.log('DRAIN out of once');
            this.needDrain = false;
        });
    }

    next(inp: Inputs, s: GlobalState): Outputs {
        this.data[this.pos] = inp.inp;
        this.pos++;
        if (this.needDrain) {
            s.requestPause();
        }
        if (this.pos >= DATA_SIZE) {
            this.pos = 0;
            const buf = Buffer.from(Buffer.from(this.data.buffer));
            this.needDrain = !this.player.write(buf);
        }
        return {};
    }
}

