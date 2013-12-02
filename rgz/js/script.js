google.load("visualization", "1", {packages:["corechart"]});

$(document).ready(function(){
    initWithValues();
    var prob1000 = CalculateProbability1000(getAlgo());
    drawFirstChart(prob1000);
});

function drawFirstChart(prob1000) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', '');
    data.addColumn('number', 'Pnp');
    data.addColumn('number', 'NV');
   
    for(var i = 0; i < prob1000.length; i++) {
        if(i*100 === $name('Tn').value * 100 || i*100 === $name('Tn').value * 100 + $name('dT').value * 100) {
            data.addRows([
                [i*100-1, prob1000[i], 0]
            ]);
            data.addRows([
                [i*100, prob1000[i], 1]
            ]);
            data.addRows([
                [i*100+99, prob1000[i+1], 1]
            ]);
            data.addRows([
                [i*100+100, prob1000[i+1], 0]
            ]);
        }
        else 
            data.addRows([
                [i*100, prob1000[i], 0]
            ]);
    }

    var options = {
        title: 'Моделирование АММРС',
        vAxis: {title: "Pnp(t)"},
        hAxis: {title: "t"},
        height: 600,
        width: 1200,
        seriesType: "line",
        series: {1: {type: "area"}}
    };

    var chart = new google.visualization.ComboChart(document.getElementById('firstChart'));
    chart.draw(data, options);
}

function drawSecondChart(ktTrue, ktFalse) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', '');
    data.addColumn('number', 'MK_OK');
    data.addColumn('number', 'OK_MK');
   
    for(var i = 0; i < ktTrue.length; i++) {
        data.addRows([
            [ktTrue.length + 1 - ktTrue[i][1], ktTrue[i][0], ktFalse[i][0]] 
        ]);     
    }
    
    var options = {
        title: 'Показатели живучести',
        vAxis: {title: "Tcp.max"},
        hAxis: {title: "k"},
        height: 600,
        width: 1200,
        seriesType: "line"
    };

    var chart = new google.visualization.ComboChart(document.getElementById('secondChart'));
    chart.draw(data, options);
}

function survivability() {
    var resultsTextbox = $name('results');

    resultsTextbox.value = '';
    var ktTrue = CalculateKT(true);
    resultsTextbox.value += 'MK_OK\n';
    for(var i = ktTrue.length -1; i >= 0; i--) {
        resultsTextbox.value += 'k = ' + ktTrue[i][1].toString() + ' t = ' + ktTrue[i][0].toString() + '\n';
    }
    var ktFalse = CalculateKT(false);

    resultsTextbox.value += '\nOK_MK\n';
    for(var i = ktFalse.length -1; i >= 0; i--) {
        resultsTextbox.value += 'k = ' + ktFalse[i][1].toString() + ' t = ' + ktFalse[i][0].toString() + '\n';
    }
    drawSecondChart(ktTrue, ktFalse);
}

function $name(name) {
    return document.getElementsByName(name)[0];
}

function $id(id) {
    return document.getElementById(id);
}

function getAlgo() {
    var models = document.getElementsByName('model-radio');
    var model_value;
    for(var i = 0; i < models.length; i++){
        if(models[i].checked){
            model_value = models[i].value;
        }
    }
    if(model_value == 'MK_OK')
        return true;
    return false;
}

function one() {
    initWithValues();
    var prob = CalculateProbability(getAlgo());
    drawFirstChart(prob);
}

function oneThousand() {
    initWithValues();
    var prob1000 = CalculateProbability1000(getAlgo());
    drawFirstChart(prob1000);
}

function initWithValues() {
    var k = parseFloat($name('k').value);
    var Lel = parseFloat($name('Lel').value)/100000;
    var Lm = parseFloat($name('Lm').value)/100000;
    var Ndop = parseFloat($name('Ndop').value * 10000);
    var R = parseFloat($name('R').value);
    var dT = $name('dT').value * 100;
    var dTexp = parseFloat($name('dTexp').value);
    var Tn = $name('Tn').value * 100;
    var Interval = parseFloat($name('Interval').value);
    init(k, Lel, Lm, Ndop, R, dT, dTexp, Tn, Interval);
}