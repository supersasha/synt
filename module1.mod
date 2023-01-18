MODULE module1

INSTANCE seq OF Sequencer("
    e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16 |
    e/16 e/16 e/16 e/16  e/16 f/16 e/16 d+/16  e/8 a/8 5c/4 |
    5d/16 5d/16 5d/16 5d/16  5d/16 5c/16 b/16 5d/16  5c/16 5c/16 5c/16 5c/16  5c/16 b/16 a/16 5c/16 |
    b/16 b/16 b/16 b/16  f+/8 b/8 g+/2 |
    e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16 |
    e/16 f/16 e/16 d+/16  e/8 a/16 5c/16  5e/8 5a/8 6c/4 |
    6d/16 6c/16 5b/16 6d/16  6c/16 5b/16 5a/16 6c/16  5b/16 5a/16 5g+/16 5b/16  5a/16 5e/16 5c/16 a/16 |
    5f/16 5e/16 5d/16 5c/16  b/16 a/16 g+/16 b/16  a/2
") WITH
END

INSTANCE env OF Envelope WITH
    gate = seq:gate
    delay = 0.0
    attack = 0.01
    hold = 0.0
    decay = 0.1
    sustain = -10
    release = 0.6
END

INSTANCE osc OF SquareOsc WITH
    freq = seq:freq
END

INSTANCE amp OF Amplifier WITH
    signal = osc:out
    q = env:out
END

INSTANCE amp2 OF Amplifier WITH
    signal = amp:out
    q = 0.7
END

INSTANCE cutoff OF Value(200, 20000, "Cutoff", 5000) WITH
END

INSTANCE flt OF SincFilter WITH
    fc = cutoff:out
    val = amp2:out
END

INSTANCE oscope OF Oscilloscope WITH
    val = flt:out
    winTime = 0.1
    threshold = 0.0
END

INSTANCE audio OF Audio WITH
    inp = flt:out
END

