var n;
var nr;
var m;
var L;
var L_or;
var L_pu;
var L_me;
var t_zad;

initLab2Data();

function initLab2Data() {
    n = 11;
    nr = 4;
    m = 4;
    L = 0.0012;
    L_or = 0.0006;
    L_pu = 0.0001;
    L_me = 0.0001;
    t_zad = 1000;
}

/*** Постоянное резервирование ***/

function P_nerez(t) {
    return Math.exp(-L * n * t);
}

function P_rez_obsh(t, m) {
    return 1.0 - Math.pow(1.0 - Math.exp(-L * n * t), m + 1);
}

function P_rez_razd(t, m) {
    return Math.pow(1.0 - Math.pow(1.0 - Math.exp(-L * t), m + 1), n);
}

function dP_obsh(t, m) {
    return P_rez_obsh(t, m) - P_nerez(t);
}

function dP_razd(t, m) {
    return P_rez_razd(t, m) - P_nerez(t);
}


/*** Мажорирование ***/

function P_mazhor_obsh(t) {
    var p = P_nerez(t);
    var pp = p * p;
    return Math.exp(-L_me * t) * (3 * pp - 2 * pp * p);
}

function P_mazhor_razd(t) {
    return Math.exp(-L_me * n * t) * Math.pow(P_mazhor_obsh(t), n);
}

function P_mazhor_adap(t) {
    var p = P_nerez(t);
    var pp = p * p;
    var ppp = pp * p;
    return Math.exp(-L_me * t) * (3 * pp - 2 * ppp + 3 * p * Math.pow(1.0 - p, 2));
}

function dP_mazhor_obsh(t) {
    return P_mazhor_obsh(t) - P_nerez(t);
}

function dP_mazhor_razd(t) {
    return P_mazhor_razd(t) - P_nerez(t);
}

function dP_mazhor_adap(t) {
    return P_mazhor_adap(t) - P_nerez(t);
}


/*** Динамическое резервирование ***/

function P_snr(t, m) {
    return (1 - Math.pow(1 - Math.exp(-L * n * t), m + 1)) * P_pu(t);
}

function P_sor(t, m) {
    var sum = 1;
    for (var i = 1; i <= m; i++) {
        sum += (A(i) / f(i)) * Math.pow(1 - Math.exp(-L_or * t), i);
    }
    return Math.exp(-L * t) * sum * P_pu(t);
}

function P_snnr(t, m) {
    var sum = 0;
    for (var i = 0; i <= m; ++i) {
        sum += (Math.pow(L * t, i) / f(i));
    }
    return Math.exp(-L * t) * sum * P_pu(t);
}

function P_ssr(t, m) {
    nr = parseInt(m);
    var sum = 0;
    var n0 = n - nr;
    for (var i = n0; i <= n0 + nr; ++i) {
        sum += C(n0 + nr, i) * Math.pow(P(t), i) * Math.pow(1 - P(t), n0 + nr - i);
    }
    return sum * P_pu(t);
}

function P(t) {
    return Math.exp(-L * t);
}

function P_pu(t) {
    return Math.exp(-L_pu * t);
}

/*** Help funcs ***/

function f(n) {
    if (n < 2) 
        return 1;
    return n * f(n - 1);
}

function A(i) {
    var p = 1;
    for (var j = 0; j < i; ++j) {
        p *= (j + L / L_or);
    }
    return p;
}

function C(n, k) {
    var c = f(n); c /= (f(k) * f(n-k));
    return c;
}
