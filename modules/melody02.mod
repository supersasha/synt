MODULE melody02

INSTANCE slowVol OF Value(0, 1, "Slow Vol", 1) WITH END
INSTANCE midVol OF Value(0, 1, "Mid Vol", 1) WITH END
INSTANCE fastVol OF Value(0, 1, "Fast Vol", 1) WITH END
INSTANCE cutoff OF Value(-1, 1, "Cutoff", 0.5, "freq") WITH END

INSTANCE slowSeq OF Sequencer("
    2e/1 2g/1 2a/1 2c/1
") WITH END

INSTANCE slowOsc OF HarmonicOsc(5, "Saw") WITH
    freq = slowSeq:freq
    dev = 0.0014
END

INSTANCE slowAmp OF Amplifier WITH
    signal = slowOsc:out
    q = slowVol:out
END

INSTANCE midSeq OF Sequencer("
    e/4 g/4 a/4 c/4 3f/4
") WITH END

INSTANCE midOsc OF HarmonicOsc(5, "Saw") WITH
    freq = midSeq:freq
    dev = 0.0014
END

INSTANCE midEnv OF Envelope WITH
    gate = midSeq:gate
    attack = 0.01 OF "secs"
    decay = 0.1 OF "secs"
    release = 2 OF "secs"
END

INSTANCE midAmp0 OF Amplifier WITH
    signal = midOsc:out
    q = midEnv:out
END

INSTANCE midAmp OF Amplifier WITH
    signal = midAmp0:out
    q = midVol:out
END

INSTANCE fastSeq OF Sequencer("
    6e/16 6a/16 6c/16 6g/16 7a/16
") WITH END

INSTANCE fastOsc OF HarmonicOsc(5, "Saw") WITH
    freq = fastSeq:freq
    dev = 0.0014
END

INSTANCE fastEnv OF Envelope WITH
    gate = fastSeq:gate
    attack = 0.01 OF "secs"
    decay = 0.1 OF "secs"
    release = 0.5 OF "secs"
END

INSTANCE fastAmp0 OF Amplifier WITH
    signal = fastOsc:out
    q = fastEnv:out
END

INSTANCE fastAmp OF Amplifier WITH
    signal = fastAmp0:out
    q = fastVol:out
END

INSTANCE mix OF Mixer(3) WITH
    in1 = slowAmp:out
    in2 = midAmp:out
    in3 = fastAmp:out
END

INSTANCE flt OF VCF WITH
    cutoff = cutoff:out
    val = mix:out
END

INSTANCE audio OF Audio WITH
    inp = flt:out
END

INSTANCE oscope OF Oscilloscope("Oscilloscope") WITH
    val = flt:out
END

