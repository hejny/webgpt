var r,
    e,
    t,
    a = (r) => (e) => {
        var t = Y(K(e));
        for (let a = 0; a < K(e); a++) t[a] = r(e[a]);
        return t;
    },
    l = a((r) => Q(r)),
    o = a((r) => 1 / (1 + N(-r))),
    n = a((r) => Q(1 + N(r))),
    v = a((r) => {
        var e = N(2 * r);
        return (e - 1) / (e + 1);
    }),
    i = (r) => (e, t) => {
        var a = 'number' == typeof t,
            l = Y(K(e));
        for (let o = 0; o < K(e); o++) l[o] = r(e[o], a ? t : t[o]);
        return l;
    },
    u = i((r, e) => r + e),
    f = i((r, e) => r - e),
    s = i((r, e) => r * e),
    h = i((r, e) => r / e),
    d = (r) => {
        var e = Y(K(r)),
            t = 0;
        for (let a = 0; a < K(r); a++) (e[a] = N(r[a])), (t += e[a]);
        for (let r = 0; r < K(e); r++) e[r] = e[r] / t;
        return e;
    },
    p = (r, e) => {
        for (let t = 0; t < K(r) / G; t++) for (let a = 0; a < K(e); a++) r[t * G + a] = r[t * G + a] + e[a];
        return r;
    },
    w = (r, e, t) => {
        var a = K(r) + K(e),
            l = Y(a);
        for (let e = 0; e < K(r); e++) l[e] = r[e];
        for (let t = 0; t < K(e); t++) l[t + K(r)] = e[t];
        return l;
    },
    m = (r, e) => {
        var t = K(e) / K(r),
            a = Y(t);
        for (let o = 0; o < t; o++) {
            var l = 0;
            for (let a = 0; a < K(r); a++) l += r[a] * e[a * t + o];
            a[o] = l;
        }
        return a;
    },
    g = (r, e) => {
        var [t, a, l, o] = e,
            n = t[0],
            v = Y(n);
        for (let e = 0; e < n; e++) {
            var i = o[e],
                u = o[e + 1],
                f = 0;
            for (let e = i; e < u; e++) f += a[e] * r[l[e]];
            v[e] = f;
        }
        return v;
    },
    b = (r, e) => {
        var t = K(r) / e,
            a = [];
        for (let o = 0; o < e; o++) {
            var l = O(r, o * t, (o + 1) * t);
            a.push(l);
        }
        return a;
    },
    M = (r, e) => {
        var t = [K(r), e],
            a = Y(t[0] * t[1]);
        for (let e = 0; e < t[0]; e++) for (let l = 0; l < t[1]; l++) a[e * t[1] + l] = r[e];
        return a;
    },
    y = (r, e) => {
        var t = [e[1]],
            a = Y(t[0]);
        for (let t = 0; t < e[0]; t++) for (let l = 0; l < e[1]; l++) a[l] += r[t * e[1] + l];
        return a;
    },
    x = (r, e, t) => {
        var a = [K(e), t],
            l = Y(a[0] * a[1]);
        for (let a = 0; a < K(e); a++) {
            var o = e[a],
                n = O(r, o * t, (o + 1) * t);
            l.set(n, a * t);
        }
        return l;
    },
    C = (r, e, t) => {
        if (1 == t)
            var a = e.a,
                l = e.d,
                n = $.y,
                i = $.p;
        else if (2 == t) (n = $.w), (i = $.q), (a = e.b), (l = e.e);
        else (n = $.r), (i = $.f), (a = e.c), (l = e.f);
        r = w(r, l);
        var f = u(g(r, n), i),
            [h, d, c, p] = b(f, 4),
            m = u(s(o(c), a), s(o(h), v(d))),
            M = s(o(p), v(m));
        return 1 == t ? ((e.a = m), (e.d = M)) : 2 == t ? ((e.b = m), (e.e = M)) : ((e.c = m), (e.f = M)), M;
    },
    A = (r) => {
        (r = [0, ...r, 0]), (r = Y(r));
        var e,
            t = ((r, e) => {
                var t = [K(r) / G - 2, G],
                    a = Y(t[0] * t[1]);
                for (let n = 0; n < t[0]; n++) {
                    var l = O(r, n * G, (n + 3) * G);
                    for (let r = 0; r < t[1]; r++) {
                        var o = 0;
                        for (let t = 0; t < K(l); t++) o += l[t] * e[r + G * t];
                        a[n * t[1] + r] = o;
                    }
                }
                return a;
            })(
                (e = ((r, e) => {
                    var t = [K(e), G],
                        a = Y(t[0] * t[1]);
                    for (let t = 0; t < K(e); t++) {
                        var l = e[t],
                            o = O(r, l * G, (l + 1) * G);
                        a.set(o, t * G);
                    }
                    return a;
                })($.s, r)),
                $.b,
            ),
            a =
                ((t = p(t, $.t)),
                (t = v(t)),
                ((r, e, t) => {
                    var a = [K(r) / G, J],
                        l = Y(a[0] * a[1]);
                    for (let e = 0; e < a[0]; e++) for (let t = 0; t < G; t++) l[e * a[1] + t] = r[e * G + t];
                    for (let r = 0; r < a[0]; r++) for (let t = 0; t < G; t++) l[r * a[1] + t + G] = e[r * G + t];
                    return l;
                })((e = O(e, G, K(e) - G)), t)),
            l = $.j,
            o = $.E;
        return (t = p(
            ((r, e) => {
                var t = [K(r) / J, J],
                    a = [J, K(e) / J],
                    l = K(e) / G,
                    o = [K(r) / J, K(e) / J],
                    n = Y(o[0] * o[1]);
                for (let i = 0; i < o[0]; i++)
                    for (let u = 0; u < o[1]; u++) {
                        var v = 0;
                        for (let o = 0; o < l; o++) v += r[i * t[1] + o] * e[o * a[1] + u];
                        n[i * o[1] + u] = v;
                    }
                return n;
            })(a, l),
            o,
        ));
    },
    k = (r, e) => {
        var t = m(r, $.h),
            [a, l, v] = ((t = u(t, $.n)), b(t, 3));
        (l = n(l)), (v = n(v)), (a = d(a)), (v = u(e.k, h(v, 15))), (e.k = v);
        var i = e.u;
        (a = M(a, K(i) / 10 - 1)), (l = M(l, K(i) / 10)), (v = M(v, K(i) / 10));
        var c = o(h(f(i, v), l)),
            p = s(
                a,
                ((r) => {
                    var e = [10, K(r) / 10],
                        t = [e[0], e[1] - 1],
                        a = Y(t[0] * t[1]);
                    for (let o = 0; o < t[0]; o++) {
                        var l = o * e[1];
                        for (let e = 0; e < t[1]; e++) a[o * t[1] + e] = r[l + e + 1] - r[l + e];
                    }
                    return a;
                })(c),
            ),
            w = y(p, [10, K(p) / 10]);
        t = er;
        w = M(w, G);
        var g = y(s(w, t), [K(w) / G, G]);
        return (e.w = g), g;
    },
    F = (r, e) => {
        var t = m(r, $.i),
            a = ((t = u(t, $.W)), (t = s(u(t, e.z), X)), C(t, e, 1)),
            l = ((t = s(u(t, a), X)), w(t, e.w)),
            n = C(l, e, 2),
            i = k(n, e),
            f = w(n, i),
            h =
                ((f = g(f, $.l)),
                (f = u(f, $.Q)),
                (f = v(f)),
                (t = s(u(t, f), X)),
                ((r) => {
                    var e = $.c,
                        t = $.u;
                    return o(u(m(r, e), t));
                })(i)),
            d = C(t, e, 3),
            c = ((t = s(u(t, d), X)), m(t, $.z));
        return [(c = u(c, $.v)), h];
    },
    U = (r) => {
        var [e, t] = ((r, e) => {
                var t = [],
                    a = 0;
                for (let v = 0; v < K(e); v++) {
                    var l = a,
                        o = a + e[v],
                        n = O(r, l, o);
                    (a = o), t.push(n);
                }
                return t;
            })(r, [120, 1]),
            a = o(t)[0],
            i = R() < a ? 1 : 0,
            [f, c, p, w] = ((r, e) => {
                var t = [],
                    a = 0;
                for (let v = 0; v < K(e); v++) {
                    var l = a;
                    a += e[v];
                    var o = [20, e[v]],
                        n = Y(20 * e[v]);
                    for (let t = 0; t < 20; t++) for (let a = 0; a < e[v]; a++) n[t * o[1] + a] = r[6 * t + (l + a)];
                    t.push(n);
                }
                return t;
            })(e, [1, 2, 1, 2]);
        p = v(p);
        var g = parseFloat(nr.value),
            c = h(n(c), N(g)),
            f = ((f = l(d(f))), s(f, 1 + g));
        for (let r = 0; r < K(f); r++) f[r] < Q(0.02) && (f[r] = f[r] - 100);
        var b = ((r) => {
                var e = -1e6,
                    t = 0;
                for (let o = 0; o < K(r); o++) {
                    var a = -Q(-Q(R())),
                        l = r[o] + a;
                    l > e && ((t = o), (e = l));
                }
                return Y([t]);
            })(f),
            M = x(w, b, 2),
            y = x(c, b, 2),
            C = x(p, b, 1),
            A = y[0],
            k = y[1],
            F = [A, (C = C[0]) * k, 0, k * P(1 - C * C)];
        F = Y(F);
        var U = ((r) => {
                var e = Y(r);
                for (let n = 0; n < r; n++) {
                    var t = 1 - R(),
                        a = 1 - R(),
                        l = P(-2 * Q(t)),
                        o = Math.cos(2 * Math.PI * a);
                    e[n] = l * o;
                }
                return e;
            })(2),
            L = u(M, m(U, F)),
            E = [L[0], L[1], i];
        return (E = Y(E));
    },
    L = (r, e) => {
        var [t, a] = F(r, e);
        return [U(t), a, e];
    },
    E = () => {
        for (null != rr && window.cancelAnimationFrame(rr); lr.lastChild; ) lr.removeChild(lr.lastChild);
        if (((r = 0), (e = !1), '-' == or.value))
            var a = K($.g) / 64,
                l = W(a * R());
        else l = parseInt(or.value);
        var o = ar('text-input').value;
        (ar('save-button').style.display = 'block'), (Z = o), (c = Z.trim().replace(/\s+/g, ' '));
        var n = K(c),
            v = Math.min(105 / n, 11);
        v *= lr.width.baseVal.value / 1240;
        var i = 8.2 * n * v,
            f = Math.max((lr.width.baseVal.value - i) / 2, 10),
            s = lr.height.baseVal.value / 2 + 20;
        (t = v),
            (c = ((r) => {
                var e = r.split('').map((r) => (r in H ? H[r] : 1));
                return (e = [2, ...e, 3]), Y(e);
            })(c)),
            (er = A(c));
        var h = ((r, e) => {
                var t = [10, r],
                    a = Y(t[0] * t[1]);
                for (let r = 0; r < t[0]; r++) for (let e = 0; e < t[1]; e++) a[r * t[1] + e] = e - 0.5;
                var l = $.g,
                    o = O(l, 64 * e, 64 * (e + 1)),
                    n = $.k,
                    v = $.R,
                    i = ((o = u(m(o, n), v)), Y(10));
                return { a: $.d, b: $.o, c: $.e, d: $.m, e: $.x, f: $.a, w: $.T, k: i, u: a, z: o };
            })(K(c) + 1, l),
            d = 0,
            p = [Y([0, 0, 1])],
            w = [Y([f, s, 1])],
            g = (r, e) => {
                var t = Math.round(parseFloat(vr.value));
                for (let i = 0; i < t; i++) {
                    var a = e[K(e) - 1],
                        [l, o, r] = L(a, r);
                    if ((d += 1) > 40 * n || o > 0.5) return void S(w);
                    e.push(l),
                        (xi_c = [w[K(w) - 1][0] + v * l[0], w[K(w) - 1][1] - v * l[1], l[2]]),
                        (xi_c = Y(xi_c)),
                        w.push(xi_c);
                }
                e,
                    (tr = w),
                    S(w),
                    (rr = window.requestAnimationFrame(() => {
                        g(r, e);
                    }));
            };
        g(h, p);
    },
    q = (r, e, t) => {
        var a = [],
            l = [],
            o = B(r);
        for (let d = 0; d < K(r); d++) {
            if (0 == d)
                var n = r[d + 1][0] - r[d][0],
                    v = r[d + 1][1] - r[d][1];
            else if (d == K(r) - 1) (n = r[d][0] - r[d - 1][0]), (v = r[d][1] - r[d - 1][1]);
            else (n = r[d + 1][0] - r[d - 1][0]), (v = r[d + 1][1] - r[d - 1][1]);
            var i = Math.sqrt(Math.pow(n, 2) + Math.pow(v, 2)),
                u = ((i = Math.max(i, 14)), o[d] / e),
                f = [(f = [t * (f = [-v / i, n / i])[0], t * f[1]])[0] / u, f[1] / u],
                s = r[d][0] + 2 * f[0],
                h = r[d][1] + 2 * f[1];
            a.push([s, h]);
            (s = r[d][0] - 2 * f[0]), (h = r[d][1] - 2 * f[1]);
            l.push([s, h]);
        }
        var d = a.concat(l.reverse()),
            c = [['M ', sr(d[0][0]), ',', sr(d[0][1])].join('')],
            p = K(d);
        for (let r = 0; r < p; r++) {
            var w = d[(r - 1 + p) % p],
                m = d[r],
                g = d[(r + 1) % p],
                b = d[(r + 2) % p],
                M = I(g, w),
                y = I(b, m),
                x = j(m, T(M, 0.2)),
                C = I(g, T(y, 0.2)),
                A =
                    'C ' +
                    sr(x[0]) +
                    ' ' +
                    sr(x[1]) +
                    ', ' +
                    sr(C[0]) +
                    ' ' +
                    sr(C[1]) +
                    ', ' +
                    sr(g[0]) +
                    ' ' +
                    sr(g[1]);
            c.push(A);
        }
        var k = c.join(' '),
            F = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        F.setAttribute('d', k), (F.style.stroke = 'black'), (F.style.fill = 'black'), lr.appendChild(F);
    },
    B = (r) => {
        var e = [];
        for (let o = 0; o < K(r); o++) {
            if (0 == o)
                var t = r[o + 1][0] - r[o][0],
                    a = r[o + 1][1] - r[o][1];
            else (t = r[o][0] - r[o - 1][0]), (a = r[o][1] - r[o - 1][1]);
            var l = Math.sqrt(Math.pow(t, 2) + Math.pow(a, 2));
            e.push(l);
        }
        var o = [];
        for (let r = 0; r < K(e); r++) {
            var n = Math.max(r - 2, 0),
                v = Math.min(r + 2 + 1, K(e)),
                i = 0;
            for (let r = n; r < v; r++) i += e[r];
            var u = i / (v - n);
            o.push(u);
        }
        return o;
    },
    z = (r) => {
        for (var e = [], t = 0, a = K(r); t < a; ) {
            for (var l = []; t < a && 1 != r[t][2]; ) l.push(r[t]), (t += 1);
            t < a && l.push(r[t]), (t += 1), e.push(l);
        }
        return e;
    },
    S = (a) => {
        if (0 != K(a)) {
            var l = parseFloat(ir.value),
                o = z(a);
            for (let n = r; n < K(o); n++) {
                a = o[n];
                K(a) < 2
                    ? (0 != K(a) && 1 != a[0][2]) || (r += 1)
                    : (e && lr.removeChild(lr.lastChild),
                      q(a, t, l),
                      1 == a[K(a) - 1][2] ? ((e = !1), (r += 1)) : (e = !0));
            }
        }
    },
    j = (r, e) => [e[0] + r[0], e[1] + r[1]],
    I = (r, e) => [r[0] - e[0], r[1] - e[1]],
    T = (r, e) => [e * r[0], e * r[1]],
    V = (r, e, t) => {
        var a = 0,
            l = [],
            o = [],
            n = [];
        for (let f = 0; f < K(r); f++) {
            var v = r[f];
            a += e[f];
            var i = Math.floor(a / t[1]),
                u = a % t[1];
            0 != v && (l.push(v), o.push(u), n.push(i));
        }
        var f = [0],
            s = 0;
        for (let r = 0; r < t[0]; r++) {
            for (; n[s] == r; ) s += 1;
            f.push(s);
        }
        return [t, l, o, f];
    },
    _ = (r, e, t) => {
        var a = t.reduce((r, e) => r * e, 1),
            l = Y(a),
            o = K(r),
            n = 0;
        for (let t = 0; t < o; t++) {
            var v = r[t];
            l[(n += e[t])] = v;
        }
        return l;
    },
    D = (r) => {
        for (var e = '', t = 0; t < K(r); t++) e += String.fromCharCode(r[t]);
        return e;
    },
    H = {
        '': 0,
        '': 2,
        ' ': 8,
        '"': 4,
        '&': 84,
        '(': 66,
        '*': 80,
        ',': 37,
        '.': 7,
        0: 62,
        2: 63,
        4: 68,
        6: 71,
        8: 76,
        ':': 74,
        B: 47,
        D: 52,
        F: 53,
        H: 41,
        J: 64,
        L: 48,
        N: 38,
        P: 46,
        R: 55,
        T: 31,
        V: 39,
        X: 79,
        Z: 78,
        b: 32,
        d: 27,
        f: 35,
        h: 30,
        j: 43,
        l: 26,
        n: 15,
        p: 29,
        r: 6,
        t: 21,
        v: 34,
        x: 44,
        z: 10,
        '': 1,
        '': 3,
        '!': 72,
        '#': 56,
        "'": 16,
        ')': 67,
        '+': 82,
        '-': 40,
        '/': 77,
        1: 59,
        3: 69,
        5: 61,
        7: 70,
        9: 60,
        ';': 73,
        '?': 51,
        A: 9,
        C: 57,
        E: 42,
        G: 45,
        I: 23,
        K: 58,
        M: 5,
        O: 36,
        Q: 75,
        S: 18,
        U: 65,
        W: 54,
        Y: 50,
        '[': 81,
        ']': 83,
        a: 14,
        c: 20,
        e: 19,
        g: 33,
        i: 13,
        k: 28,
        m: 12,
        o: 25,
        q: 49,
        s: 17,
        u: 11,
        w: 24,
        y: 22,
    },
    N = Math.exp,
    P = Math.sqrt,
    Q = Math.log,
    R = Math.random,
    W = (Math.abs, Math.max, Math.min, Math.floor),
    X = P(0.5),
    G = 256,
    J = 512,
    K = (r) => r.length,
    O = (r, e, t) => r.slice(e, t),
    Y = function () {
        return new Float32Array(...arguments);
    },
    Z = null,
    $ = $,
    rr = null,
    er = null,
    tr = [],
    ar = document.getElementById.bind(document),
    lr = ar('canvas'),
    or = ar('select-style'),
    nr = ar('bias-slider'),
    vr = ar('speed-slider'),
    ir = ar('width-slider');
ir.oninput = () =>
    ((r) => {
        for (; lr.lastChild; ) lr.removeChild(lr.lastChild);
        if (0 != K(r)) {
            var e = parseFloat(ir.value),
                a = z(r);
            for (let l = 0; l < K(a); l++) (r = a[l]), K(r) < 2 || q(r, t, e);
        }
    })(tr);
var ur,
    fr,
    sr = (r) => r.toFixed(2),
    hr = (r) => r.toFixed(3);
(ur = '/src/components/HandwrittenText/caligrapher.ai/d.bin'),
    // (ur = 'https://d33au9p5d8tjhf.cloudfront.net/d.bin'),
    (fr = (() => {
        var r = 0,
            e = [' ', '.', '..', '..', '...'],
            t = ar('loading-indicator');
        return setInterval(() => {
            (t.innerHTML = 'Loading ' + e[r % K(e)]), (r += 1);
        }, 200);
    })()),
    fetch(ur)
        .then((r) => r.arrayBuffer())
        .then((r) => {
            ($ = ((r) => {
                var e = 0,
                    t = {},
                    a = new DataView(r),
                    l = (r) => {
                        do {
                            var o = a.getUint8(e);
                            e += 1;
                            var n = new Uint8Array(o);
                            for (let r = 0; r < o; r++) (n[r] = a.getUint8(e)), (e += 1);
                            n = D(n);
                            var v = a.getUint8(e);
                            e += 1;
                            var i = a.getUint32(e, !0);
                            e += 4;
                            var u = new Float32Array(i);
                            for (let r = 0; r < i; r++) (u[r] = a.getFloat32(e, !0)), (e += 4);
                            if (v) {
                                var f = new Uint8Array(i);
                                for (let r = 0; r < i; r++) (f[r] = a.getUint16(e, !0)), (e += 1);
                            }
                            var s = a.getUint8(e);
                            e += 1;
                            var h = new Uint16Array(s);
                            for (let r = 0; r < s; r++) (h[r] = a.getUint16(e, !0)), (e += 2);
                            ['y', 'w', 'r', 'l'].includes(n) ? (u = V(u, f, h)) : v && (u = _(u, f, h)), (t[n] = u);
                        } while (performance.now() - r < 16 && e < a.byteLength);
                        e < a.byteLength
                            ? window.requestAnimationFrame(l)
                            : (ar('draw-button').addEventListener('mousedown', E),
                              ar('text-input').addEventListener('keydown', (r) => (13 === r.keyCode ? E() : 1)),
                              ar('loading-indicator').remove());
                    };
                return l(), t;
            })(r)),
                clearTimeout(fr);
        }),
    ar('save-button').addEventListener('click', () => {
        var r = ar('canvas').getBBox(),
            e = [hr(r.x - 3), hr(r.y - 3), hr(r.width + 6), hr(r.height + 6)].join(' '),
            t = ar('canvas');
        t.setAttribute('viewBox', e);
        var a = new XMLSerializer().serializeToString(t);
        t.removeAttribute('viewBox');
        var l = document.createElement('a');
        l.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(a)),
            l.setAttribute(
                'download',
                Z.toString()
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .trim() + '.svg',
            ),
            l.click();
    });
