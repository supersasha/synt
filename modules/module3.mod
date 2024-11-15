MODULE module3

INSTANCE cutoff OF Value(-1, 1, "Cutoff", 0.5, "freq") WITH
END

INSTANCE attack OF Value(-1, 1, "Attack", -0.5, "time") WITH
END

INSTANCE decay OF Value(-1, 1, "Decay", -0.5, "time") WITH
END

INSTANCE release OF Value(-1, 1, "Release", 0, "time") WITH
END

INSTANCE seq OF Sequencer("
    a/1 b/1 5e/1 5d/1
") WITH
END

INSTANCE env OF Envelope WITH
    gate = seq:gate
    delay = 0.0 OF "secs"
    attack = attack:out
    hold = 0.0 OF "secs"
    decay = decay:out
    sustain = -10
    release = release:out
END

INSTANCE osc OF SawOsc WITH
    base = seq:freq
END

INSTANCE amp OF Amplifier WITH
    signal = flt:out
    q = env:out
END

INSTANCE amp2 OF Amplifier WITH
    signal = amp:out
    q = 0.7
END

INSTANCE flt OF SincFilter WITH
    cutoff = cutoff:out
    val = osc:out
END

INSTANCE oscope OF Oscilloscope("Oscillo") WITH
    val = amp2:out
    winTime = 0.1
    threshold = 0.0
END

INSTANCE audio OF Audio WITH
    inp = amp2:out
END


