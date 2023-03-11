MODULE melody01

INSTANCE cutoff OF Value(-1, 1, "Cutoff", 0.3, "freq") WITH
END

INSTANCE res OF Value(0.5, 4, "Resonance", 1) WITH
END

INSTANCE seq OF Sequencer("
    2a/4 3c/4 3e/4 3d/4 3f/4 2b/4
") WITH
END

INSTANCE env OF Envelope WITH
   gate = seq:gate
   attack = 0.01 OF "secs"
   decay = 0.5 OF "secs"
   release = 0.9 OF "secs"
END

INSTANCE osc OF SquareOsc WITH
    base = seq:freq
END

INSTANCE kxb OF Kxb WITH
    k = 2
    x = env:out
    b = -1
END

INSTANCE flt OF VCF WITH
    val = osc:out
    cutoff = kxb:out (*cutoff:out*)
    res = res:out
END

INSTANCE amp OF Amplifier WITH
    signal = flt:out
    q = env:out
END

INSTANCE oscope OF Oscilloscope WITH
    val = amp:out
END

INSTANCE audio OF Audio WITH
    inp = amp:out
END
