MODULE module5

(*
INSTANCE osc OF SquareOsc WITH
    base = -0.1
    fm = 0.1
END
*)

INSTANCE osc0 OF SquareOsc WITH
    base = 0
    fm = 0
END

INSTANCE osc1 OF SquareOsc WITH
    base = 0
    fm = osc0:out
END

INSTANCE osc2 OF SquareOsc WITH
    base = 0
    fm = osc1:out
END

INSTANCE osc3 OF SquareOsc WITH
    base = 0
    fm = osc2:out
END

INSTANCE osc4 OF SquareOsc WITH
    base = 0
    fm = osc3:out
END

INSTANCE osc5 OF SquareOsc WITH
    base = 0
    fm = osc4:out
END

INSTANCE audio OF Audio WITH
    inp = osc5:out
END
