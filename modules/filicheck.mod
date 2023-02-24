MODULE filicheck

INSTANCE freq OF Value(-1, 1, "Freq", 0, "freq") WITH END
INSTANCE volume OF Value(0, 1, "Volume", 1) WITH END
INSTANCE cutoff OF Value(-1, 1, "Cutoff", 0.5, "freq") WITH END

INSTANCE osc OF SquareOsc WITH
    base = freq:out
END

INSTANCE flt OF VCF WITH
    cutoff = cutoff:out
    val = osc:out
END

INSTANCE amp OF Amplifier WITH
    signal = flt:out
    q = volume:out
END

INSTANCE oscope OF Oscilloscope("Oscilloscope") WITH
    val = amp:out
    winTime = 0.1
    threshold = 0.0
END

INSTANCE audio OF Audio WITH
    inp = amp:out
END

