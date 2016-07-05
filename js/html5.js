(function(a, b)
{
    function l(a, b)
    {
        var c = a.createElement("p"),
            d = a.getElementsByTagName("head")[0] || a.documentElement;
        return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
    }

    function m()
    {
        var a = s.elements;
        return "string" == typeof a ? a.split(" ") : a
    }

    function n(a)
    {
        var b = j[a[h]];
        return b || (b = {}, i++, a[h] = i, j[i] = b), b
    }

    function o(a, c, d)
    {
        if (c || (c = b), k) return c.createElement(a);
        d || (d = n(c));
        var g;
        return g = d.cache[a] ? d.cache[a].cloneNode() : f.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), g.canHaveChildren && !e.test(a) ? d.frag.appendChild(g) : g
    }

    function p(a, c)
    {
        if (a || (a = b), k) return a.createDocumentFragment();
        c = c || n(a);
        for (var d = c.frag.cloneNode(), e = 0, f = m(), g = f.length; g > e; e++) d.createElement(f[e]);
        return d
    }

    function q(a, b)
    {
        b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c)
        {
            return s.shivMethods ? o(c, a, b) : b.createElem(c)
        }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/\w+/g, function(a)
        {
            return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
        }) + ");return n}")(s, b.frag)
    }

    function r(a)
    {
        a || (a = b);
        var c = n(a);
        return !s.shivCSS || g || c.hasCSS || (c.hasCSS = !!l(a, "article,aside,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a
    }

    function w(a)
    {
        for (var b, c = a.getElementsByTagName("*"), d = c.length, e = RegExp("^(?:" + m().join("|") + ")$", "i"), f = []; d--;) b = c[d], e.test(b.nodeName) && f.push(b.applyElement(x(b)));
        return f
    }

    function x(a)
    {
        for (var b, c = a.attributes, d = c.length, e = a.ownerDocument.createElement(u + ":" + a.nodeName); d--;) b = c[d], b.specified && e.setAttribute(b.nodeName, b.nodeValue);
        return e.style.cssText = a.style.cssText, e
    }

    function y(a)
    {
        for (var b, c = a.split("{"), d = c.length, e = RegExp("(^|[\\s,>+~])(" + m().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), f = "$1" + u + "\\:$2"; d--;) b = c[d] = c[d].split("}"), b[b.length - 1] = b[b.length - 1].replace(e, f), c[d] = b.join("}");
        return c.join("{")
    }

    function z(a)
    {
        for (var b = a.length; b--;) a[b].removeNode()
    }

    function A(a)
    {
        function g()
        {
            clearTimeout(d._removeSheetTimer), b && b.removeNode(!0), b = null
        }
        var b, c, d = n(a),
            e = a.namespaces,
            f = a.parentWindow;
        return !v || a.printShived ? a : (e[u] === void 0 && e.add(u), f.attachEvent("onbeforeprint", function()
        {
            g();
            for (var d, e, f, h = a.styleSheets, i = [], j = h.length, k = Array(j); j--;) k[j] = h[j];
            for (; f = k.pop();)
                if (!f.disabled && t.test(f.media))
                {
                    try
                    {
                        d = f.imports, e = d.length
                    }
                    catch (m)
                    {
                        e = 0
                    }
                    for (j = 0; e > j; j++) k.push(d[j]);
                    try
                    {
                        i.push(f.cssText)
                    }
                    catch (m)
                    {}
                }
            i = y(i.reverse().join("")), c = w(a), b = l(a, i)
        }), f.attachEvent("onafterprint", function()
        {
            z(c), clearTimeout(d._removeSheetTimer), d._removeSheetTimer = setTimeout(g, 500)
        }), a.printShived = !0, a)
    }
    var g, k, c = "3.6.2",
        d = a.html5 ||
        {},
        e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        h = "_html5shiv",
        i = 0,
        j = {};
    (function()
    {
        try
        {
            var a = b.createElement("a");
            a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = 1 == a.childNodes.length || function()
            {
                b.createElement("a");
                var a = b.createDocumentFragment();
                return a.cloneNode === void 0 || a.createDocumentFragment === void 0 || a.createElement === void 0
            }()
        }
        catch (c)
        {
            g = !0, k = !0
        }
    })();
    var s = {
        elements: d.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
        version: c,
        shivCSS: d.shivCSS !== !1,
        supportsUnknownElements: k,
        shivMethods: d.shivMethods !== !1,
        type: "default",
        shivDocument: r,
        createElement: o,
        createDocumentFragment: p
    };
    a.html5 = s, r(b);
    var t = /^$|\b(?:all|print)\b/,
        u = "html5shiv",
        v = !k && function()
        {
            var c = b.documentElement;
            return !(b.namespaces === void 0 || b.parentWindow === void 0 || c.applyElement === void 0 || c.removeNode === void 0 || a.attachEvent === void 0)
        }();
    s.type += " print", s.shivPrint = A, A(b)
})(this, document);