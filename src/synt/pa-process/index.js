const PulseAudio = require('pulseaudio2');

const rate = parseInt(process.argv[2]);
const data_size = parseInt(process.argv[3]);

console.log('PA rate:', rate);
console.log('PA data size:', data_size);

let needDrain = false;
const bufs = [];

const context = new PulseAudio();
const player = context.createPlaybackStream({
    channels: 1,
    format: 'F32LE',
    rate,
    latency: Math.floor(data_size * 1000000 / rate) , // can be a number > 0, microseconds
});

context.on('error', err => {
    console.log('PA context error:', err);
});

player.on('error', err => {
    console.log('PA player error:', err);
});

player.on('drain', () => {
    console.log('drain');
    feed();
});

process.on('message', (buf) => {
    //console.log('incoming buf:', buf);
    bufs.push(Buffer.from(buf.data));
    if (needDrain) {
        if (bufs.length > 5) {
            process.send('wait');
        }
    } else {
        feed();
    }
});

function feed() {
    while(true) {
        if (bufs.length === 0) {
            console.log('******* Wasted! Nothing to write!');
            needDrain = false;
            break;
        }
        needDrain = !player.write(bufs.shift());
        console.log(`Bufs-: ${bufs.length} `);
        if (needDrain) {
            console.log('Need drain');
            break;
        }
    }
    if (bufs.length < 3) {
        process.send('more');
    }
}

