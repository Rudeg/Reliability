var TaskNumb = 1;

var maxN = ARR_SIZE;

var pn = [maxN];
var pro = [maxN];
var prr = [maxN];
var pmo = [maxN];
var pmr = [maxN];
var pma = [maxN];
var t = [maxN];
var m;

var dataArrayLab2 = [];

calcTask1(true);
createLab2DataArray(1);

function calcTask1(status, m) {
    if(m == undefined)
        m = 1;
    for (var i = 0; i < maxN; ++i) {
        t[i] = i;
        if(status) {
            pn[i] = parseFloat(P_nerez(t[i]));
            pro[i] = parseFloat(P_rez_obsh(t[i], m));
            prr[i] = parseFloat(P_rez_razd(t[i], m));
        } else {
            pn[i] = 0;
            pro[i] = parseFloat(dP_obsh(t[i], m));
            prr[i] = parseFloat(dP_razd(t[i], m));
        }
    }
}

function calcTask2(status) {
    for (var i = 0; i < maxN; ++i) {
        t[i] = i;
        if(status) {
            pn[i] = parseFloat(P_nerez(t[i]));
            pmo[i] = parseFloat(P_mazhor_obsh(t[i]));
            pmr[i] = parseFloat(P_mazhor_razd(t[i]));
            pma[i] = parseFloat(P_mazhor_adap(t[i]));
        } else {
            pn[i] = 0;
            pmo[i] = parseFloat(dP_mazhor_obsh(t[i]));
            pmr[i] = parseFloat(dP_mazhor_razd(t[i]));
            pma[i] = parseFloat(dP_mazhor_adap(t[i]));
        }
    }
}

function calcTask3(status, m) {
    if(m == undefined)
        m = 1;
    for(var i = 0; i < maxN; ++i) {
        t[i] = i;
        if(status) {
 	    pn[i] = parseFloat(P_nerez(t[i]));
            pmo[i] = parseFloat(P_snr(t[i], m));
            pmr[i] = parseFloat(P_sor(t[i], m));
            pma[i] = parseFloat(P_snnr(t[i], m));
        } else {
            pn[i] = parseFloat(P_nerez(t[i]));
            pmo[i] = parseFloat(P_ssr(t[i], m));
            pmr[i] = pma[i] = 0;
           
        }
    }
}

function createLab2DataArray(taskNumb, value) {
    dataArrayLab2 = [];
    for(var i = 0; i < ARR_SIZE; i++) {
        var item = [];
        item.push(i);
        switch(taskNumb) {
            case 1: 
                item.push(pn[i], pro[i], prr[i]);
                break;
            case 2: { 
                if(value)
                    item.push(pn[i], pmo[i], pmr[i], pma[i]);
                else 
                    item.push(pn[i], pmo[i], pmr[i]);
                break;
            }
            case 3: {
                if(value)
                    item.push(pn[i], pmo[i], pmr[i], pma[i]);
                else 
                    item.push(pn[i], pmo[i]);
                break;
            }
        }
        dataArrayLab2.push(item);
    }
}
