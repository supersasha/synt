MODULE strument01

INPUT fm DEFAULTS 0
OUTPUT out

INSTANCE noise OF Noise WITH END

INSTANCE flt OF SincFilter WITH
    cutoff = 7.7 OF "herz"
    val = noise:out
END

INSTANCE kxb OF Kxb WITH
    k = 0.344
    x = flt:out
    b = 0
END

INSTANCE osc OF SquareOsc WITH
    base = fm
    fm = kxb:out

    EXPOSE OUTPUT out AS out
END

