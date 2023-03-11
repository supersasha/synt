MODULE module2

INSTANCE lowFreq OF Value(-1, 1, "LFO freq", 0, "freq") WITH
END

INSTANCE freq OF Value(-1, 1, "Frequency", 0, "freq") WITH
END

INSTANCE pw OF Value(0.1, 0.9, "Pulse width", 0.5) WITH
END

INSTANCE cutoff OF Value(-1, 1, "Cutoff freq", 0, "freq") WITH
END

INSTANCE amp1 OF Value(-1, 1, "LFO Amplifier", 1) WITH
END

INSTANCE amp2 OF Value(-1, 1, "FLT Amplifier", 1) WITH
END

INSTANCE lfo OF SineOsc WITH
    fm = lowFreq:out
END

INSTANCE ampLFO OF Amplifier WITH
    q = amp1:out
    signal = lfo:out
END

INSTANCE osc OF SawOsc WITH
    base = freq:out
    fm = ampLFO:out
    pw = pw:out
END

INSTANCE flt OF SincFilter WITH
    cutoff = cutoff:out
    val = osc:out
END

INSTANCE ampFLT OF Amplifier WITH
    q = amp2:out
    signal = flt:out
END

INSTANCE oscope OF Oscilloscope("Oscilloscope") WITH
    val = ampFLT:out
    winTime = 0.1
    threshold = 0.0
END

INSTANCE audio OF Audio WITH
    inp = ampFLT:out
END
