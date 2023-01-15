import PulseAudio from 'pulseaudio2';
import { Module, Inputs, Outputs, GlobalState } from '../rack';

const DATA_SIZE = 1024;

export class Audio implements Module {
    private context = new PulseAudio();
    private player: PulseAudio.PlaybackStream;
    private data = new Float32Array(DATA_SIZE);
    private pos = 0;
    private needDrain = false;
    private bufs: Buffer[] = [];

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
            //console.log('drain');
            this.feed();
        });
    }

    next(inp: Inputs, s: GlobalState): Outputs {
        this.data[this.pos] = inp.inp;
        this.pos++;
        if (this.bufs.length > 2) {
            s.requestPause();
        }
        if (this.pos >= DATA_SIZE) {
            this.pos = 0;
            const buf = Buffer.from(Buffer.from(this.data.buffer));
            this.bufs.push(buf);
            //console.log(`Bufs+: ${this.bufs.length} `);
            if (!this.needDrain) {
                this.feed();
            }
        }
        return {};
    }

    feed() {
        if (this.bufs.length === 0) {
            console.error('******** wasted!');
        } else {
            while(true) {
                this.needDrain = !this.player.write(this.bufs.shift());
                //console.log(`Bufs-: ${this.bufs.length} `);
                if (this.needDrain || this.bufs.length < 2) {
                    break;
                }
            }
        }
    }
}

