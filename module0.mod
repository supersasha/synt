MODULE module0

INSTANCE freq OF Value(-1, 1, "Frequency", 0, "freq") WITH
END

INSTANCE cutoff OF Value(-1, 1, "Cutoff", 0, "freq") WITH
END

INSTANCE volume OF Value(0, 1, "Volume", 0.5) WITH
END

INSTANCE osc OF SquareOsc WITH
    base = 220 OF "herz"
    fm = freq:out
END

INSTANCE flt OF SincFilter WITH
    cutoff = cutoff:out
    val = osc:out
END

INSTANCE amp OF Amplifier WITH
    q = volume:out
    signal = flt:out
END

INSTANCE audio OF Audio WITH
    inp = amp:out
END

INSTANCE oscope OF Oscilloscope("Oscilloscope") WITH
    val = amp:out
    winTime = 0.1
    threshold = 0.0
END

