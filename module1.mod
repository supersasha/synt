MODULE module1

INSTANCE cutoff OF Value(-1, 1, "Cutoff", 0.5, "freq") WITH
END

INSTANCE attack OF Value(-1, 1, "Attack", -0.2, "time") WITH
END

INSTANCE decay OF Value(-1, 1, "Decay", -0.2, "time") WITH
END

INSTANCE release OF Value(-1, 1, "Release", 0, "time") WITH
END

INSTANCE seq OF Sequencer("
    e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16 |
    e/16 e/16 e/16 e/16  e/16 f/16 e/16 d+/16  e/8 a/8 5c/4 |
    5d/16 5d/16 5d/16 5d/16  5d/16 5c/16 b/16 5d/16  5c/16 5c/16 5c/16 5c/16  5c/16 b/16 a/16 5c/16 |
    b/16 b/16 b/16 b/16  f+/8 b/8 g+/8 '/8 '/4 |
    e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16  e/16 e/16 e/16 e/16 |
    e/16 f/16 e/16 d+/16  e/8 a/16 5c/16  5e/8 5a/8 6c/4 |
    6d/16 6c/16 5b/16 6d/16  6c/16 5b/16 5a/16 6c/16  5b/16 5a/16 5g+/16 5b/16  5a/16 5e/16 5c/16 a/16 |
    5f/16 5e/16 5d/16 5c/16  b/16 a/16 g+/16 b/16  a/8 '/8 '/4
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

INSTANCE osc OF strument01 WITH
    fm = seq:freq
END

INSTANCE flt OF SincFilter WITH
    cutoff = cutoff:out
    val = osc:out
END

INSTANCE amp OF Amplifier WITH
    signal = flt:out
    q = env:out
END

INSTANCE amp2 OF Amplifier WITH
    signal = amp:out
    q = 0.7
END

INSTANCE oscope OF Oscilloscope("Oscilloscope") WITH
    val = amp2:out
    winTime = 0.1
    threshold = 0.0
END

INSTANCE audio OF Audio WITH
    inp = amp2:out
END

