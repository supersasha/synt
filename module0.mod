MODULE module0

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

(*
INSTANCE void0 OF Void WITH
    in1 = 0
    in2 = 0
END
INSTANCE void1 OF Void WITH
    in1 = void0:out1
    in2 = void0:out2
END
INSTANCE void2 OF Void WITH
    in1 = void1:out1
    in2 = void1:out2
END
INSTANCE void3 OF Void WITH
    in1 = void2:out1
    in2 = void2:out2
END
INSTANCE void4 OF Void WITH
    in1 = void3:out1
    in2 = void3:out2
END
INSTANCE void5 OF Void WITH
    in1 = void4:out1
    in2 = void4:out2
END
INSTANCE void6 OF Void WITH
    in1 = void5:out1
    in2 = void5:out2
END
INSTANCE void7 OF Void WITH
    in1 = void6:out1
    in2 = void6:out2
END
INSTANCE void8 OF Void WITH
    in1 = void7:out1
    in2 = void7:out2
END
INSTANCE void9 OF Void WITH
    in1 = void8:out1
    in2 = void8:out2
END
*)
