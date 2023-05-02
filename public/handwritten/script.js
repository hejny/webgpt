// ⚠ Warning: This is just a javascript copy of /src/components/HandwrittenText/utils/handwriteText.ts

function handwriteText(options) {
    function getElement(elementId) {
        if (elementId === 'canvas') {
            return options.svgElement;
        } else {
            return document.createElement('div');
        }
        // return document.getElementById(elementId);
    }

    let r;
    let e;
    let t;
    const a = (r) => (e) => {
        const t = Y(K(e));
        for (let a = 0; a < K(e); a++) t[a] = r(e[a]);
        return t;
    };
    const l = a((r) => Q(r));
    const o = a((r) => 1 / (1 + N(-r)));
    const n = a((r) => Q(1 + N(r)));
    const v = a((r) => {
        const e = N(2 * r);
        return (e - 1) / (e + 1);
    });
    const i = (r) => (e, t) => {
        const a = typeof t === 'number';
        const l = Y(K(e));
        for (let o = 0; o < K(e); o++) l[o] = r(e[o], a ? t : t[o]);
        return l;
    };
    const u = i((r, e) => r + e);
    const f = i((r, e) => r - e);
    const s = i((r, e) => r * e);
    const h = i((r, e) => r / e);
    const d = (r) => {
        const e = Y(K(r));
        let t = 0;
        for (let a = 0; a < K(r); a++) (e[a] = N(r[a])), (t += e[a]);
        for (let r = 0; r < K(e); r++) e[r] = e[r] / t;
        return e;
    };
    const p = (r, e) => {
        for (let t = 0; t < K(r) / G; t++) for (let a = 0; a < K(e); a++) r[t * G + a] = r[t * G + a] + e[a];
        return r;
    };
    const w = (r, e, t) => {
        const a = K(r) + K(e);
        const l = Y(a);
        for (let e = 0; e < K(r); e++) l[e] = r[e];
        for (let t = 0; t < K(e); t++) l[t + K(r)] = e[t];
        return l;
    };
    const m = (r, e) => {
        const t = K(e) / K(r);
        const a = Y(t);
        for (let o = 0; o < t; o++) {
            let l = 0;
            for (let a = 0; a < K(r); a++) l += r[a] * e[a * t + o];
            a[o] = l;
        }
        return a;
    };
    const g = (r, e) => {
        const [t, a, l, o] = e;
        const n = t[0];
        const v = Y(n);
        for (let e = 0; e < n; e++) {
            const i = o[e];
            const u = o[e + 1];
            let f = 0;
            for (let e = i; e < u; e++) f += a[e] * r[l[e]];
            v[e] = f;
        }
        return v;
    };
    const b = (r, e) => {
        const t = K(r) / e;
        const a = [];
        for (let o = 0; o < e; o++) {
            const l = O(r, o * t, (o + 1) * t);
            a.push(l);
        }
        return a;
    };
    const M = (r, e) => {
        const t = [K(r), e];
        const a = Y(t[0] * t[1]);
        for (let e = 0; e < t[0]; e++) for (let l = 0; l < t[1]; l++) a[e * t[1] + l] = r[e];
        return a;
    };
    const y = (r, e) => {
        const t = [e[1]];
        const a = Y(t[0]);
        for (let t = 0; t < e[0]; t++) for (let l = 0; l < e[1]; l++) a[l] += r[t * e[1] + l];
        return a;
    };
    const x = (r, e, t) => {
        const a = [K(e), t];
        const l = Y(a[0] * a[1]);
        for (let a = 0; a < K(e); a++) {
            const o = e[a];
            const n = O(r, o * t, (o + 1) * t);
            l.set(n, a * t);
        }
        return l;
    };
    const C = (r, e, t) => {
        if (t == 1) {
            var { a } = e;
            var l = e.d;
            var n = $.y;
            var i = $.p;
        } else if (t == 2) (n = $.w), (i = $.q), (a = e.b), (l = e.e);
        else (n = $.r), (i = $.f), (a = e.c), (l = e.f);
        r = w(r, l);
        const f = u(g(r, n), i);
        const [h, d, c, p] = b(f, 4);
        const m = u(s(o(c), a), s(o(h), v(d)));
        const M = s(o(p), v(m));
        return t == 1 ? ((e.a = m), (e.d = M)) : t == 2 ? ((e.b = m), (e.e = M)) : ((e.c = m), (e.f = M)), M;
    };
    const A = (r) => {
        (r = [0, ...r, 0]), (r = Y(r));
        let e;
        let t = ((r, e) => {
            const t = [K(r) / G - 2, G];
            const a = Y(t[0] * t[1]);
            for (let n = 0; n < t[0]; n++) {
                const l = O(r, n * G, (n + 3) * G);
                for (let r = 0; r < t[1]; r++) {
                    let o = 0;
                    for (let t = 0; t < K(l); t++) o += l[t] * e[r + G * t];
                    a[n * t[1] + r] = o;
                }
            }
            return a;
        })(
            (e = ((r, e) => {
                const t = [K(e), G];
                const a = Y(t[0] * t[1]);
                for (let t = 0; t < K(e); t++) {
                    const l = e[t];
                    const o = O(r, l * G, (l + 1) * G);
                    a.set(o, t * G);
                }
                return a;
            })($.s, r)),
            $.b,
        );
        const a =
            ((t = p(t, $.t)),
            (t = v(t)),
            ((r, e, t) => {
                const a = [K(r) / G, J];
                const l = Y(a[0] * a[1]);
                for (let e = 0; e < a[0]; e++) for (let t = 0; t < G; t++) l[e * a[1] + t] = r[e * G + t];
                for (let r = 0; r < a[0]; r++) for (let t = 0; t < G; t++) l[r * a[1] + t + G] = e[r * G + t];
                return l;
            })((e = O(e, G, K(e) - G)), t));
        const l = $.j;
        const o = $.E;
        return (t = p(
            ((r, e) => {
                const t = [K(r) / J, J];
                const a = [J, K(e) / J];
                const l = K(e) / G;
                const o = [K(r) / J, K(e) / J];
                const n = Y(o[0] * o[1]);
                for (let i = 0; i < o[0]; i++) {
                    for (let u = 0; u < o[1]; u++) {
                        let v = 0;
                        for (let o = 0; o < l; o++) v += r[i * t[1] + o] * e[o * a[1] + u];
                        n[i * o[1] + u] = v;
                    }
                }
                return n;
            })(a, l),
            o,
        ));
    };
    const k = (r, e) => {
        let t = m(r, $.h);
        let [a, l, v] = ((t = u(t, $.n)), b(t, 3));
        (l = n(l)), (v = n(v)), (a = d(a)), (v = u(e.k, h(v, 15))), (e.k = v);
        const i = e.u;
        (a = M(a, K(i) / 10 - 1)), (l = M(l, K(i) / 10)), (v = M(v, K(i) / 10));
        const c = o(h(f(i, v), l));
        const p = s(
            a,
            ((r) => {
                const e = [10, K(r) / 10];
                const t = [e[0], e[1] - 1];
                const a = Y(t[0] * t[1]);
                for (let o = 0; o < t[0]; o++) {
                    const l = o * e[1];
                    for (let e = 0; e < t[1]; e++) a[o * t[1] + e] = r[l + e + 1] - r[l + e];
                }
                return a;
            })(c),
        );
        let w = y(p, [10, K(p) / 10]);
        t = er;
        w = M(w, G);
        const g = y(s(w, t), [K(w) / G, G]);
        return (e.w = g), g;
    };
    const F = (r, e) => {
        let t = m(r, $.i);
        const a = ((t = u(t, $.W)), (t = s(u(t, e.z), X)), C(t, e, 1));
        const l = ((t = s(u(t, a), X)), w(t, e.w));
        const n = C(l, e, 2);
        const i = k(n, e);
        let f = w(n, i);
        const h =
            ((f = g(f, $.l)),
            (f = u(f, $.Q)),
            (f = v(f)),
            (t = s(u(t, f), X)),
            ((r) => {
                const e = $.c;
                const t = $.u;
                return o(u(m(r, e), t));
            })(i));
        const d = C(t, e, 3);
        let c = ((t = s(u(t, d), X)), m(t, $.z));
        return [(c = u(c, $.v)), h];
    };
    const U = (r) => {
        const [e, t] = ((r, e) => {
            const t = [];
            let a = 0;
            for (let v = 0; v < K(e); v++) {
                const l = a;
                const o = a + e[v];
                const n = O(r, l, o);
                (a = o), t.push(n);
            }
            return t;
        })(r, [120, 1]);
        const a = o(t)[0];
        const i = Random() < a ? 1 : 0;
        var [f, c, p, w] = ((r, e) => {
            const t = [];
            let a = 0;
            for (let v = 0; v < K(e); v++) {
                const l = a;
                a += e[v];
                const o = [20, e[v]];
                const n = Y(20 * e[v]);
                for (let t = 0; t < 20; t++) for (let a = 0; a < e[v]; a++) n[t * o[1] + a] = r[6 * t + (l + a)];
                t.push(n);
            }
            return t;
        })(e, [1, 2, 1, 2]);
        p = v(p);
        const g = options.bias; /*parseFloat(biasSliderElement.value)*/
        var c = h(n(c), N(g));
        var f = ((f = l(d(f))), s(f, 1 + g));
        for (let r = 0; r < K(f); r++) f[r] < Q(0.02) && (f[r] = f[r] - 100);
        const b = ((r) => {
            let e = -1e6;
            let t = 0;
            for (let o = 0; o < K(r); o++) {
                const a = -Q(-Q(Random()));
                const l = r[o] + a;
                l > e && ((t = o), (e = l));
            }
            return Y([t]);
        })(f);
        const M = x(w, b, 2);
        const y = x(c, b, 2);
        let C = x(p, b, 1);
        const A = y[0];
        const k = y[1];
        let F = [A, (C = C[0]) * k, 0, k * P(1 - C * C)];
        F = Y(F);
        const U = ((r) => {
            const e = Y(r);
            for (let n = 0; n < r; n++) {
                const t = 1 - Random();
                const a = 1 - Random();
                const l = P(-2 * Q(t));
                const o = Math.cos(2 * Math.PI * a);
                e[n] = l * o;
            }
            return e;
        })(2);
        const L = u(M, m(U, F));
        let E = [L[0], L[1], i];
        return (E = Y(E));
    };
    const L = (r, e) => {
        const [t, a] = F(r, e);
        return [U(t), a, e];
    };
    const handleWriteClick = () => {
        for (rr != null && window.cancelAnimationFrame(rr); canvasElement.lastChild; )
            canvasElement.removeChild(canvasElement.lastChild);
        if (((r = 0), (e = !1), options.style /* styleSelectElement.value */ == '-')) {
            const a = K($.g) / 64;
            var l = W(a * Random());
        } else l = options.style /*parseInt( styleSelectElement.value )*/;
        const o = options.text;

        //console.log('!!!', c);
        (getElement('save-button').style.display = 'block'), (Z = o), (c = Z.trim().replace(/\s+/g, ' '));
        const n = K(c);
        let v = Math.min(105 / n, 11);
        v *= canvasElement.width.baseVal.value / 1240;
        const i = 8.2 * n * v;
        const f = Math.max((canvasElement.width.baseVal.value - i) / 2, 10);
        const s = canvasElement.height.baseVal.value / 2 + 20;
        (t = v),
            (c = ((r) => {
                let e = r.split('').map((r) => (r in H ? H[r] : 1));
                return (e = [2, ...e, 3]), Y(e);
            })(c)),
            (er = A(c));
        const h = ((r, e) => {
            const t = [10, r];
            const a = Y(t[0] * t[1]);
            for (let r = 0; r < t[0]; r++) for (let e = 0; e < t[1]; e++) a[r * t[1] + e] = e - 0.5;
            const l = $.g;
            let o = O(l, 64 * e, 64 * (e + 1));
            const n = $.k;
            const v = $.R;
            const i = ((o = u(m(o, n), v)), Y(10));
            return {
                a: $.d,
                b: $.o,
                c: $.e,
                d: $.m,
                e: $.x,
                f: $.a,
                w: $.T,
                k: i,
                u: a,
                z: o,
            };
        })(K(c) + 1, l);
        let d = 0;
        const p = [Y([0, 0, 1])];
        const w = [Y([f, s, 1])];
        var g = (r, e) => {
            const t = Math.round(options.speed /* parseFloat(speedSliderElement.value) */);
            for (let i = 0; i < t; i++) {
                const a = e[K(e) - 1];
                var [l, o, r] = L(a, r);
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
    };
    const q = (r, e, t) => {
        const a = [];
        const l = [];
        const o = B(r);
        for (let d = 0; d < K(r); d++) {
            if (d == 0) {
                var n = r[d + 1][0] - r[d][0];
                var v = r[d + 1][1] - r[d][1];
            } else if (d == K(r) - 1) (n = r[d][0] - r[d - 1][0]), (v = r[d][1] - r[d - 1][1]);
            else (n = r[d + 1][0] - r[d - 1][0]), (v = r[d + 1][1] - r[d - 1][1]);
            let i = Math.sqrt(Math.pow(n, 2) + Math.pow(v, 2));
            const u = ((i = Math.max(i, 14)), o[d] / e);
            var f = [(f = [t * (f = [-v / i, n / i])[0], t * f[1]])[0] / u, f[1] / u];
            let s = r[d][0] + 2 * f[0];
            let h = r[d][1] + 2 * f[1];
            a.push([s, h]);
            (s = r[d][0] - 2 * f[0]), (h = r[d][1] - 2 * f[1]);
            l.push([s, h]);
        }
        const d = a.concat(l.reverse());
        const c = [['M ', sr(d[0][0]), ',', sr(d[0][1])].join('')];
        const p = K(d);
        for (let r = 0; r < p; r++) {
            const w = d[(r - 1 + p) % p];
            const m = d[r];
            const g = d[(r + 1) % p];
            const b = d[(r + 2) % p];
            const M = I(g, w);
            const y = I(b, m);
            const x = j(m, T(M, 0.2));
            const C = I(g, T(y, 0.2));
            const A = `C ${sr(x[0])} ${sr(x[1])}, ${sr(C[0])} ${sr(C[1])}, ${sr(g[0])} ${sr(g[1])}`;
            c.push(A);
        }
        const k = c.join(' ');
        const F = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        F.setAttribute('d', k),
            (F.style.stroke = options.color || 'black'),
            (F.style.fill = options.color || 'black'),
            canvasElement.appendChild(F);
    };
    var B = (r) => {
        const e = [];
        for (let o = 0; o < K(r); o++) {
            if (o == 0) {
                var t = r[o + 1][0] - r[o][0];
                var a = r[o + 1][1] - r[o][1];
            } else (t = r[o][0] - r[o - 1][0]), (a = r[o][1] - r[o - 1][1]);
            const l = Math.sqrt(Math.pow(t, 2) + Math.pow(a, 2));
            e.push(l);
        }
        const o = [];
        for (let r = 0; r < K(e); r++) {
            const n = Math.max(r - 2, 0);
            const v = Math.min(r + 2 + 1, K(e));
            let i = 0;
            for (let r = n; r < v; r++) i += e[r];
            const u = i / (v - n);
            o.push(u);
        }
        return o;
    };
    const z = (r) => {
        for (var e = [], t = 0, a = K(r); t < a; ) {
            for (var l = []; t < a && r[t][2] != 1; ) l.push(r[t]), (t += 1);
            t < a && l.push(r[t]), (t += 1), e.push(l);
        }
        return e;
    };
    var S = (a) => {
        if (K(a) != 0) {
            const l = options.width; /* parseFloat(widthSliderElement.value) */
            const o = z(a);
            for (let n = r; n < K(o); n++) {
                a = o[n];
                K(a) < 2
                    ? (K(a) != 0 && a[0][2] != 1) || (r += 1)
                    : (e && canvasElement.removeChild(canvasElement.lastChild),
                      q(a, t, l),
                      a[K(a) - 1][2] == 1 ? ((e = !1), (r += 1)) : (e = !0));
            }
        }
    };
    var j = (r, e) => [e[0] + r[0], e[1] + r[1]];
    var I = (r, e) => [r[0] - e[0], r[1] - e[1]];
    var T = (r, e) => [e * r[0], e * r[1]];
    const V = (r, e, t) => {
        let a = 0;
        const l = [];
        const o = [];
        const n = [];
        for (let f = 0; f < K(r); f++) {
            const v = r[f];
            a += e[f];
            const i = Math.floor(a / t[1]);
            const u = a % t[1];
            v != 0 && (l.push(v), o.push(u), n.push(i));
        }
        const f = [0];
        let s = 0;
        for (let r = 0; r < t[0]; r++) {
            for (; n[s] == r; ) s += 1;
            f.push(s);
        }
        return [t, l, o, f];
    };
    const _ = (r, e, t) => {
        const a = t.reduce((r, e) => r * e, 1);
        const l = Y(a);
        const o = K(r);
        let n = 0;
        for (let t = 0; t < o; t++) {
            const v = r[t];
            l[(n += e[t])] = v;
        }
        return l;
    };
    const D = (r) => {
        for (var e = '', t = 0; t < K(r); t++) e += String.fromCharCode(r[t]);
        return e;
    };
    var H = {
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
    };
    var N = Math.exp;
    var P = Math.sqrt;
    var Q = Math.log;
    var Random = /* Math.random */ () => 0.2; /* <- !!! Seed random */
    var W = (Math.abs, Math.max, Math.min, Math.floor);
    var X = P(0.5);
    var G = 256;
    var J = 512;
    var K = (r) => r.length;
    var O = (r, e, t) => r.slice(e, t);
    var Y = function () {
        return new Float32Array(...arguments);
    };
    var Z = null;
    var $ = $;
    var rr = null;
    var er = null;
    // var tr = [];

    var canvasElement = getElement('canvas');

    /*
    var styleSelectElement = getElement('select-style');
    var biasSliderElement = getElement('bias-slider');
    var speedSliderElement = getElement('speed-slider');
    var widthSliderElement = getElement('width-slider');

    widthSliderElement.oninput = () =>
        ((r) => {
            for (; canvasElement.lastChild; ) canvasElement.removeChild(canvasElement.lastChild);
            if (K(r) != 0) {
                const e = options.width; /*parseFloat(widthSliderElement.value)* /
                const a = z(r);
                for (let l = 0; l < K(a); l++) (r = a[l]), K(r) < 2 || q(r, t, e);
            }
        })(tr);
    */

    let ur;
    let fr;
    var sr = (r) => r.toFixed(2);
    const hr = (r) => r.toFixed(3);
    ur = options.modelSrc;

    fr = (() => {
        let r = 0;
        const e = [' ', '.', '..', '..', '...'];
        const t = getElement('loading-indicator');
        return setInterval(() => {
            (t.innerHTML = `Loading ${e[r % K(e)]}`), (r += 1);
        }, 200);
    })();

    // --------------------------------------- Press [Write!] button ---------------------------------------

    fetch(ur)
        .then((res) => {
            return res.arrayBuffer();
        })
        .then((data) => {
            $ = ((data) => {
                let index = 0;
                const at = {};
                const reader = new DataView(data);
                /**
                 * @param {number} flightPhase
                 * @return {undefined}
                 */
                var init = (flightPhase) => {
                    do {
                        const randomBytesLength = reader.getUint8(index);
                        index = index + 1;
                        let n = new Uint8Array(randomBytesLength);
                        for (let i = 0; i < randomBytesLength; i++) {
                            n[i] = reader.getUint8(index);
                            index = index + 1;
                        }
                        n = D(n);
                        const v = reader.getUint8(index);
                        index = index + 1;
                        const length = reader.getUint32(index, true);
                        index = index + 4;
                        let content = new Float32Array(length);
                        for (let i = 0; i < length; i++) {
                            content[i] = reader.getFloat32(index, true);
                            index = index + 4;
                        }
                        if (v) {
                            /** @type {!Uint8Array} */
                            var value = new Uint8Array(length);
                            for (let i = 0; i < length; i++) {
                                value[i] = reader.getUint16(index, true);
                                index = index + 1;
                            }
                        }
                        const indexCount = reader.getUint8(index);
                        index = index + 1;
                        const url = new Uint16Array(indexCount);
                        for (let i = 0; i < indexCount; i++) {
                            url[i] = reader.getUint16(index, true);
                            index = index + 2;
                        }
                        if (['y', 'w', 'r', 'l'].includes(n)) {
                            content = V(content, value, url);
                        } else {
                            if (v) {
                                content = _(content, value, url);
                            }
                        }
                        at[n] = content;
                    } while (performance.now() - flightPhase < 16 && index < reader.byteLength);
                    if (index < reader.byteLength) {
                        window.requestAnimationFrame(init);
                    } else {
                        // Note: HERE is the model loaded
                        handleWriteClick();

                        /*
                        getElement('draw-button').addEventListener('mousedown', handleWriteClick);
                        getElement('text-input').addEventListener('keydown', (event) => {
                            return event.keyCode === 13 ? handleWriteClick() : 1;
                        });
                        getElement('loading-indicator').remove();
                        */
                    }
                };
                return init(), at;
            })(data);
            clearTimeout(fr);
        });

    /*
    // --------------------------------------- Saving ---------------------------------------

    getElement('save-button').addEventListener('click', () => {
        const r = getElement('canvas').getBBox();
        const width = [hr(r.x - 3), hr(r.y - 3), hr(r.width + 6), hr(r.height + 6)].join(' ');
        const svgElement = getElement('canvas');
        svgElement.setAttribute('viewBox', width);
        const extremeSvg = new XMLSerializer().serializeToString(svgElement);
        svgElement.removeAttribute('viewBox');
        const popOutActionElement = document.createElement('a');
        popOutActionElement.setAttribute('href', `data:image/svg+xml;base64,${window.btoa(extremeSvg)}`);
        popOutActionElement.setAttribute(
            'download',
            `${Z.toString()
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .trim()}.svg`,
        );
        popOutActionElement.click();
    });
    */
}
