import { Module, Inputs, Outputs, GlobalState } from '../rack';
import child_process, { ChildProcess } from 'child_process';

const DATA_SIZE = 1024;

export class Audio implements Module {
    pulseAudioProcess: ChildProcess;
    private data = new Float32Array(DATA_SIZE);
    private pos = 0;
    private needWait = false;

    constructor(rate = 44100) {
        const modPath = new URL('../pa-process/index.ts', import.meta.url);
        console.log('PA process module path:', modPath);
        this.pulseAudioProcess = child_process.fork(
            modPath,
            [rate.toString(), DATA_SIZE.toString()]);
        console.log('PA process:', this.pulseAudioProcess.pid);
        this.pulseAudioProcess.on('message', (data) => {
            if (data === 'wait') {
                this.needWait = true;
            } else if (data === 'more') {
                this.needWait = false;
            }
        });
    }

    next(inp: Inputs, s: GlobalState): Outputs {
        this.data[this.pos] = inp.inp;
        this.pos++;
        if (this.pos >= DATA_SIZE) {
            this.pos = 0;
            const buf = Buffer.from(Buffer.from(this.data.buffer));
            if (this.pulseAudioProcess) {
                this.pulseAudioProcess.send(buf);
            }
        }
        return {};
    }

    shutdown() {
        console.log('Shutting down pulseaudio process...');
        this.pulseAudioProcess.send('exit');
    }
}
