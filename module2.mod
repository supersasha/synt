MODULE module2

INSTANCE freq OF Value(10, 5000, "freq", 440) WITH
END

INSTANCE lowFreq OF Value(0.01, 100, "Low freq", 2) WITH
END

INSTANCE winTime OF Value(0.01, 5, "Window Time", 0.1) WITH
END

INSTANCE lfo OF SinOsc WITH
    freq = lowFreq:out
END

INSTANCE amp OF Amplifier WITH
    signal = lfo:out
    q = 1000
END

INSTANCE osc OF SquareOsc WITH
    freq = amp:out
END

INSTANCE oscope OF Oscilloscope("Oscilloscope") WITH
    val = osc:out
    winTime = winTime:out
    threshold = 0.0
END

INSTANCE audio OF Audio WITH
    inp = osc:out
END
