/**
 * Implementation of standard Array methods (introduced in ECMAScript 5th
 * edition) and shorthand generics (JavaScript 1.8.5)
 *
 * Copyright (c) 2013 Alex K @plusdude
 * http://opensource.org/licenses/MIT
 */
(function(h, r, m)
{
    function q(a)
    {
        a = u(a);
        return a !== a ? 0 : 0 === a || r === a || -r === a ? a : (0 < a || -1) * l.floor(l.abs(a))
    }

    function v(a, c)
    {
        var b, e, d, f, h;
        e = k(this);
        d = e.length >>> 0;
        m !== a ? (a = q(a), f = 0 > a ? l.max(d + a, 0) : l.min(a, d)) : f = 0;
        m !== c && (c = q(c), d = 0 > c ? l.max(d + c, 0) : l.min(c, d));
        b = new g(d - f);
        for (h = 0; f < d; ++f, ++h) f in e && (b[h] = e[f]);
        return b
    }

    function w(a)
    {
        return "[object Array]" === k.prototype.toString.call(a)
    }

    function n(a)
    {
        if ("[object Function]" !== k.prototype.toString.call(a)) throw Error(a + " is not a function");
    }

    function s(a)
    {
        if (!a) throw Error("reduce of empty array with no initial value");
    }

    function x(a)
    {
        var c = !0;
        if (g.prototype[a]) try
        {
            g.prototype[a].call(m, /test/, null), c = !1
        }
        catch (b)
        {}
        else c = !1;
        return c
    }

    function t(a)
    {
        var c = !0;
        if (g[a]) try
        {
            g[a](m, /test/, null), c = !1
        }
        catch (b)
        {}
        else c = !1;
        c || (g[a] = y(a))
    }

    function y(a)
    {
        return function(c)
        {
            var b;
            if (m === c || null === c) throw Error("Array.prototype." + a + " called on " + c);
            b = g.prototype.slice.call(arguments, 1);
            return g.prototype[a].apply(c, b)
        }
    }
    var g = h.Array,
        k = h.Object,
        l = h.Math,
        u = h.Number;
    h = {
        indexOf: function(a, c)
        {
            var b, e, d;
            b = k(this);
            e = b.length >>> 0;
            m !== c ? (c = q(c), d = 0 > c ? l.max(e + c, 0) : l.min(c, e)) : d = 0;
            for (; d < e; ++d)
                if (d in b && a === b[d]) return d;
            return -1
        },
        lastIndexOf: function(a, c)
        {
            var b, e;
            b = k(this);
            e = b.length >>> 0;
            m !== c ? (c = q(c), e = 0 > c ? e - l.abs(c) : l.min(c, e - 1)) : e -= 1;
            for (; - 1 < e; --e)
                if (e in b && a === b[e]) return e;
            return -1
        },
        forEach: function(a, c)
        {
            var b, e, d;
            b = k(this);
            n(a);
            e = b.length >>> 0;
            for (d = 0; d < e; ++d) d in b && a.call(c, b[d], d, b)
        },
        every: function(a, c)
        {
            var b, e, d;
            b = k(this);
            n(a);
            e = b.length >>> 0;
            for (d = 0; d < e; ++d)
                if (d in b && !a.call(c, b[d], d, b)) return !1;
            return !0
        },
        some: function(a, c)
        {
            var b, e, d;
            b = k(this);
            n(a);
            e = b.length >>> 0;
            for (d = 0; d < e; ++d)
                if (d in b && a.call(c, b[d], d, b)) return !0;
            return !1
        },
        filter: function(a, c)
        {
            var b = [],
                e, d, f, g;
            e = k(this);
            n(a);
            d = e.length >>> 0;
            for (f = g = 0; f < d; ++f) f in e && a.call(c, e[f], f, e) && (b[g++] = e[f]);
            return b
        },
        map: function(a, c)
        {
            var b = [],
                e, d, f;
            e = k(this);
            n(a);
            d = e.length >>> 0;
            for (f = 0; f < d; ++f) f in e && (b[f] = a.call(c, e[f], f, e));
            return b
        },
        reduce: function(a, c)
        {
            var b, e, d, f;
            b = k(this);
            n(a);
            e = m !== c;
            d = b.length >>> 0;
            for (f = 0; f < d; ++f) f in b && (e ? c = a(c, b[f], f, b) : (c = b[f], e = !0));
            s(e);
            return c
        },
        reduceRight: function(a, c)
        {
            var b, e, d;
            b = k(this);
            n(a);
            e = m !== c;
            for (d = (b.length >>> 0) - 1; - 1 < d; --d) d in b && (e ? c = a(c, b[d], d, b) : (c = b[d], e = !0));
            s(e);
            return c
        }
    };
    for (var p in h) h.hasOwnProperty(p) && (x(p) || (g.prototype[p] = h[p]), t(p));
    g.isArray = g.isArray || w;
    "concat join slice pop push reverse shift sort splice unshift".split(" ").forEach(t);
    if (document) try
    {
        g.slice(document.childNodes)
    }
    catch (z)
    {
        g.prototype.slice = v
    }
})(this, 1 / 0);