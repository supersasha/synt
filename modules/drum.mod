MODULE drum

INSTANCE delay OF Value(-1, 1, "Delay", -1, "time") WITH END
INSTANCE attack OF Value(-1, 1, "Attack", -0.3, "time") WITH END
INSTANCE hold OF Value(-1, 1, "Hold", -1, "time") WITH END
INSTANCE decay OF Value(-1, 1, "Decay", -0.2, "time") WITH END
INSTANCE sustain OF Value(-50, 0, "Sustain", -10) WITH END
INSTANCE release OF Value(-1, 1, "Release", 0, "time") WITH END

INSTANCE freq OF Value(-1, 1, "Freq", 0, "freq") WITH END
INSTANCE volume OF Value(0, 1, "Volume", 1) WITH END
INSTANCE cutoff OF Value(-1, 1, "Cutoff", 0.5, "freq") WITH END

INSTANCE osc OF SineOsc WITH
    base = freq:out
END

INSTANCE flt OF SincFilter WITH
    cutoff = cutoff:out
    val = osc:out
END

INSTANCE seq OF Sequencer("
    a/16 '/16 '/16 '/16 a/16 '/16 '/16 '/16
") WITH
END

INSTANCE env OF Envelope WITH
    gate = seq:gate
    delay = delay:out
    attack = attack:out 
    hold = hold:out
    decay = decay:out
    sustain = sustain:out
    release = release:out
END

INSTANCE amp OF Amplifier WITH
    signal = flt:out
    q = env:out
END

INSTANCE amp2 OF Amplifier WITH
    signal = amp:out
    q = volume:out
END

INSTANCE oscope OF Oscilloscope("Oscilloscope") WITH
    val = amp2:out
    winTime = 0.1
    threshold = 0.0
END

INSTANCE audio OF Audio WITH
    inp = amp2:out
END
