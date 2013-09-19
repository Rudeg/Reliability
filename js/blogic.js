var ARR_SIZE = 1001;

var ac = [ARR_SIZE];
var pc = [ARR_SIZE];
var kc = [ARR_SIZE];
var tar = [ARR_SIZE];

var time_step;

var dataArray = [];

init();
Calc_VBSR();
createDataArray(true, true, true);

function Calc_VBSR() {
    time_step = 100;
    for(var i = 0; i < ARR_SIZE; i++) {
        var t = parseFloat(i * time_step);
        ac[i] = P_ac(t);
        pc[i] = P_pc(t);
        kc[i] = P_kc(t);
        tar[i] = t;
    }
}

function Calc_VBOR() {
    time_step = 100000;
    for(var i = 0; i < ARR_SIZE; i++) {
        var t = parseFloat(i * time_step);
        ac[i] = P_ao(t);
        pc[i] = P_po(t);
        kc[i] = P_ko(t);
        tar[i] = t;
    }
}

function Calc_VBHR() {
    time_step = 100;
    for(var i = 0; i < ARR_SIZE; i++) {
        var t = parseFloat(i * time_step);
        ac[i] = P_a(t);
        pc[i] = P_p(t);
        kc[i] = P_k(t);
        tar[i] = t;
    }
}

function Calc_VBOX() {
    time_step = 100000;
    for(var i = 0; i < ARR_SIZE; i++) {
        var t = parseFloat(i * time_step);
        kc[i] = P_kox(t);
        tar[i] = t;
    }
}

function Calc_VBOR_real() {
    time_step = 100000;
    for(var i = 0; i < ARR_SIZE; i++) {
        var t = parseFloat(i * time_step);
        ac[i] = P_ao_real(t);
        pc[i] = P_po_real(t);
        kc[i] = P_ko_real(t);
        tar[i] = t;
    }
}

function Calc_VBOR_cycle() {
    time_step = 100000;
    for(var i = 0; i < ARR_SIZE; i++) {
        var t = parseFloat(i * time_step);
        kc[i] = P_ko_cycle(t);
        tar[i] = t;
    }
}


function createDataArray(acStatus, pcStatus, kcStatus) {
    dataArray = [];
    for(var i = 0; i < ARR_SIZE; i++) {
        var item = [];
        item.push(tar[i]);
        if(acStatus){
            item.push(1-ac[i], ac[i]);
        }
        if(pcStatus){
            item.push(1-pc[i], pc[i]);
        }
        if(kcStatus) {
            item.push(1-kc[i], kc[i]);
        }
        dataArray.push(item);
    }
}
