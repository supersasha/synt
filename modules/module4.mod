MODULE module4

INSTANCE cutoff OF Value(-1, 1, "Cutoff", 0.5, "freq") WITH
END

INSTANCE k OF Value(0, 1, "k", 1) WITH
END

INSTANCE b OF Value(0, 1, "b", 0) WITH
END

INSTANCE base OF Value(-1, 1, "base", 0, "freq") WITH
END

INSTANCE cutoff2 OF Value(-1, 1, "Cutoff 2", 0.5, "freq") WITH
END

INSTANCE noise OF Noise WITH END

INSTANCE flt OF SincFilter WITH
    cutoff = cutoff:out
    val = noise:out
END

INSTANCE kxb OF Kxb WITH
    k = k:out
    x = flt:out
    b = b:out
END

INSTANCE osc OF SawOsc WITH
    base = base:out
    fm = kxb:out    
END

INSTANCE flt2 OF SincFilter WITH
    cutoff = cutoff2:out
    val = osc:out
END
INSTANCE oscope OF Oscilloscope("Oscilloscope") WITH
    val = flt2:out
    winTime = 0.1
    threshold = 0.0
END

INSTANCE audio OF Audio WITH
    inp = flt2:out
END
