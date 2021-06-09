package nl.rickverkuijlen.hardhub.model;

import lombok.Data;

@Data
public class Pair<A, B> {
    public final A a;
    public final B b;

    public Pair(A a, B b) {
        this.a = a;
        this.b = b;
    }
}
