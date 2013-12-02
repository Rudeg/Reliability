
//Random r = new Random();
var k = 2, Lel, Lm, Ndop, R, dT, dTexp, Tn, Interval;
var Elements = [];
var rec1000 = [];
var PractProb = [];
var TeorProb = [];

//function init(k, Lel, Lm, Ndop, R, dT, dTexp, Tn, Interval) {
function init() {
    /*k = k;
    Lel = Lel;
    Lm = Lm;
    Ndop = Ndop;
    R = R;
    dT = dT;
    dTexp = dTexp;
    Tn = Tn;
    Interval = Interval; 
*/
    k = 2;
    Lel = 0.000030000000000000004;
    Lm = 0.00001;
    Ndop = 85000;
    R = 3;
    dT = 500;
    dTexp = 100;
    Tn = 300;
    Interval = 100;
    console.log('ok');

}
//100
function CalculateProbability(algoritm) {

    PractProb = [];
    var time = 0;
    var proba = 1.0;
    var Tn2 = Tn + dT;
    var rekonfig1 = true;
    var rekonfig2 = true;
    Elements = [];
    var recN1 = 0;
    var recN2 = 0;
    for (var i = 0; i < k; i++) {
        Elements[i] = [];
        Elements[i][0] = true;
        Elements[i][1] = true;
        Elements[i][2] = true;
        Elements[i][3] = true;
    }
    while (proba != 0.0) {
        var probaEl = 1.0;

        var Pel = Math.exp((-1) * time * Lel);
        var Pm = Math.exp((-1) * time * Lm);
        if ((time > Tn && time <= (Tn + dTexp)) || (time > Tn2 && time <= (Tn2 + dTexp))) {
            Pel = Math.pow(Pel, R);
            Pm = Math.pow(Pm, R);
        }
        if (((Tn + dTexp) < time && rekonfig1)) {
            if (algoritm) {
                recN1 = MK_OK();
                if (recN1 > Ndop) {
                    proba = 0.0;
                }
            }
            else {
                recN1 = OK_MK();
                if (recN1 > Ndop) {
                    proba = 0.0;
                }
            }
            rekonfig1 = false;
        }
        else if (((Tn2 + dTexp) < time && rekonfig2)) {
            if (algoritm) {
                recN2 = MK_OK();
                if (recN2 > Ndop) {
                    proba = 0.0;
                }
            }
            else {
                recN2 = OK_MK();
                if (recN2 > Ndop)
                {
                    proba = 0.0;
                }
            }
            rekonfig2 = false;
        }

        for (var i = 0; i < k; i++)
        {
            /////////////////////////////////
            var rTmp = Math.random();
            if (rTmp > Pel)
            {
                Elements[i][0] = false;
            }
            rTmp = Math.random();
            if (rTmp > Pel)
            {
                Elements[i][1] = false;
            }
            rTmp = Math.random();
            if (rTmp > Pel)
            {
                Elements[i][2] = false;
            }
            rTmp = Math.random();
            if (rTmp > Pm)
            {
                Elements[i][3] = false;
            }
            //////////////////////////////////////
            if (Elements[i][0] && Elements[i][1] && Elements[i][2] && Elements[i][3])
            {
                probaEl = (3 * Pel * Pel - 2 * Pel * Pel * Pel) * Pm;
            }
            else if (((Elements[i][0] && Elements[i][1]) || (Elements[i][1] && Elements[i][2]) || (Elements[i][0] && Elements[i][2])) && Elements[i][3]) {
                probaEl = Pel * Pel * Pm;
            }
            else if ((Elements[i][0] || Elements[i][1] || Elements[i][2]) && Elements[i][3]) {
                probaEl = Pel;
            }
            else {
                probaEl = 0.0;
            }
            proba *= probaEl;
        }
        PractProb.push(proba);
        time += Interval;
    }
    rec1000.push((PractProb.length-1) * Interval);

    return PractProb;
}

function MK_OK() {
    var sost = 0;
    for(var i = k - 1; i >= 0; i--) {
        var C = 0;
        if (!Elements[i][3])
        {
            C = 1;
        }
        else if (Elements[i][0] && !Elements[i][1] && !Elements[i][2])//A
        {
            C = 2;
        }
        else if (!Elements[i][0] && Elements[i][1] && !Elements[i][2])//B
        {
            C = 3;
        }
        else if (!Elements[i][0] && !Elements[i][1] && Elements[i][2])//C
        {
            C = 4;
        }
        sost += C * Math.pow(4, i);
    }
    sost += 1.0;
    return sost;
}

function OK_MK() {
    var sost = 0;
    for (var i = k - 1; i >= 0; i--) {
        var C = 0;
        if (Elements[i][0])//A
        {
            C = 0;
        }
        else if (Elements[i][1])//B
        {
            C = 1;
        }
        else if (Elements[i][2])//C
        {
            C = 2;
        }
        sost += C * (Math.pow(3, i) + i);
    }
    sost += 1.0;
    return sost;
}

function CalculateProbability1000(algoritm) {
    rec1000 = [];
    var result2 = []; 
    var result = [];
    for (var i = 0; i < 1000; i++) {
        var tmpresult = CalculateProbability(algoritm);
        var l1 = tmpresult.length;
        var l2 = result2.length;
        
        for (var j = 0; j < l1; j++){
            if (j > l2 - 1) {
                result2.push(tmpresult[j]);
            }
            else {
                result2[j] = result2[j] + tmpresult[j];
            }
        }
    }
    for (var i = 0; i < result2.length; i++) {
        var tmp = result2[i] / 1000;
        if (tmp < 0.01) {
            result.push(0);
            break;
        }
        result.push(tmp);
    }
    return result;
}

function TeoreticProbability() {
    TeorProb = [];
    var time = 0;
    var proba = 1.0;
    while(proba >= 0.01) {
        var Pel = Math.exp((-1) * time * Lel);
        var Pm = Math.exp((-1) * time * Lm);
        proba *= Math.pow(((3*Pel*Pel - 2*Pel*Pel*Pel)*Pm),k);
        TeorProb.push(proba);
        time += Interval;
    }
    return TeorProb;
}
      
   
function CalculateKT(algoritm) {
    var result = [];
    var timeMAX = 0;
    for (k = 1; k <= 50; k++) {
        CalculateProbability1000(algoritm);
        var recCP = 0;
        for(var i = 0; i < rec1000.length; i++){
            recCP += rec1000[i];
        }
        recCP = recCP / 1000.0;

        var temp =  [recCP, k];
        result.push(temp);
    }
    return result;
}