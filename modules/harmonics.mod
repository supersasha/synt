MODULE harmonics

INSTANCE freq OF Value(-0.3, 0.15, "Freq", 0, "freq") WITH END
INSTANCE diff OF Value(0, 0.1, "Diff", 0) WITH END
INSTANCE vol OF Value(0, 1, "Volume", 1) WITH END
INSTANCE cutoff OF Value(-1, 1, "Cutoff", 0.3, "freq") WITH END
INSTANCE res OF Value(0.5, 4, "Resonance", 1) WITH END

INSTANCE harm OF Harmonics(5) WITH
    base = freq:out
    diff = diff:out
END

INSTANCE osc1 OF SawOsc WITH
    base = harm:f1
END
INSTANCE osc2 OF SawOsc WITH
    base = harm:f2
END
INSTANCE osc3 OF SawOsc WITH
    base = harm:f3
END
INSTANCE osc4 OF SawOsc WITH
    base = harm:f4
END
INSTANCE osc5 OF SawOsc WITH
    base = harm:f5
END

INSTANCE mix OF Mixer(5) WITH
    in1 = osc1:out
    in2 = osc2:out
    in3 = osc3:out
    in4 = osc4:out
    in5 = osc5:out
END

INSTANCE flt OF VCF WITH
    val = mix:out
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

