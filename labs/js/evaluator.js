// source data
var L_mn_ao;
var L_pr_ao;
var L_pm_ao;
var L_bp_ao;
var alpha;
var beta;
var t;
var k_tem;
var k_vib;
var k_per;
var tx;
var G;
var r;
var gamma;
var delta_t;

// calculated values
var L_mn_ac;
var L_pr_ac;
var L_pm_ac;
var L_bp_ac;

var L_ao;
var L_ac;
var L_a;
var L_po;
var L_pc;
var L_p;
var L_ko;
var L_kc;
var L_k;

function init() {
    L_mn_ao = 2.5e-8;
    L_pr_ao = 1.9e-8;
    L_pm_ao = 2.2e-8;
    L_bp_ao = 2.0e-8;
    alpha = 2.6;
    beta = 7e2;
    t = 1.9e4;
    k_tem = 1.6;
    k_vib = 1.5;
    k_per = 1.7;
    tx = 1.8e4;
    G = 0.7e2;
    r = 0.3;
    gamma = 75;
    delta_t = 2e3;

    calculateLambda();
}

function calculateLambda() {
    L_mn_ac = beta * L_mn_ao;
    L_pr_ac = beta * L_pr_ao;
    L_pm_ac = beta * L_pm_ao;
    L_bp_ac = beta * L_bp_ao;

    L_ao = L_mn_ao + L_pr_ao + L_pm_ao + L_bp_ao;
    L_ac = L_mn_ac + L_pr_ac + L_pm_ac + L_bp_ac;
    L_a = L_ao + L_ac;

    L_po = alpha * L_ao;
    L_pc = beta * L_po;
    L_p = L_po + L_pc;

    L_ko = L_ao + L_po;
    L_kc = L_ac + L_pc;
    L_k = L_a + L_p;
}

// ВБОР АС, вероятность безотказной работы аппаратных средств
function P_ao(t) {
    return Math.exp(-L_ao * t);
}
// ВБОР ПС, вероятность безотказной работы программных средств
function P_po(t) {
    return Math.exp(-L_po * t);
}
// ВБОР КС, вероятность безотказной работы целой системы
function P_ko(t) {
    return Math.exp(-L_ko * t);
}

// ВБСР АС, вероятность бессбойной работы аппаратных средств
function P_ac(t) {
    return Math.exp(-L_ac * t);
}
// ВБСР ПС, вероятность бессбойной работы программных средств
function P_pc(t) {
    return Math.exp(-L_pc * t);
}
// ВБСР КС, вероятность бессбойной работы целой системы
function P_kc(t) {
    return Math.exp(-L_kc * t);
}

// ВБШР АС, вероятность безошибочной работы аппаратных средств
function P_a(t)
{
    return Math.exp(-L_a * t);
}
// ВБШР ПС, вероятность безошибочной работы программных средств
function P_p(t)
{
    return Math.exp(-L_p * t);
}
// ВБШР КС, вероятность безошибочной работы целой системы
function P_k(t)
{
    return Math.exp(-L_k * t);
}

// ВБОХ ПК, вероятность безотказного хранения
function P_kox(t)
{
    return Math.exp(-L_ko * t / G);
}
// ВОХ ПК, вероятность отказа при хранении
function Q_kox(t)
{
    return 1 - P_kox(t);
}

// ВБОР АС при реальных условиях эксплуатации
function P_ao_real(t)
{
    return Math.exp(-k_tem * k_vib * k_per * L_ao * t);
}
// ВБОР ПС при реальных условиях эксплуатации
function P_po_real(t)
{
    return P_po(t);
}
// ВБОР ПК при реальных условиях эксплуатации
function P_ko_real(t)
{
    return P_ao_real(t) * P_po_real(t);
}

// ВБОР ПК при циклическом функционировании
function P_ko_cycle(t)
{
    return P_ko(r * t) * P_kox((1 - r) * t);
}