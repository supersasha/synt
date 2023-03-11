MODULE harmonicosc

INSTANCE freq OF Value(-0.5, 0.15, "Freq", 0, "freq") WITH END
INSTANCE dev OF Value(0, 0.1, "Dev", 0) WITH END
INSTANCE vol OF Value(0, 1, "Volume", 1) WITH END
INSTANCE cutoff OF Value(-1, 1, "Cutoff", 0.3, "freq") WITH END
INSTANCE res OF Value(0.5, 4, "Resonance", 1) WITH END

INSTANCE harm OF HarmonicOsc(5, "Saw") WITH
    freq = freq:out
    dev = dev:out
END

INSTANCE flt OF VCF WITH
    val = harm:out
    cutoff = cutoff:out
    res = res:out
END

INSTANCE amp OF Amplifier WITH
    signal = flt:out
    q = vol:out
END

INSTANCE oscope OF Oscilloscope WITH
    val = amp:out
END

INSTANCE audio OF Audio WITH
    inp = amp:out
END


