
google.load("visualization", "1", {packages:["corechart"]});

$(document).ready(function(){
  //  google.setOnLoadCallback(drawChartLab1(true, true, true));
  init();
  var prob1000 = CalculateProbability1000(true);
  drawFirstChart(prob1000);
  var ktTrue = CalculateKT(true);
  var ktFalse = CalculateKT(false);
  drawSecondChart(ktTrue, ktFalse);
});

//Lab 1
function drawFirstChart(prob1000) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', '');
    data.addColumn('number', '4otonah');
    data.addColumn('number', '4otona2h');
   
    for(var i = 0; i < prob1000.length; i++) {
        if(i*100 === 300 || i*100 === 800) {
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
        vAxis: {title: "tt"},
        hAxis: {title: "Pnp(t)"},
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
   
    for(var i = ktTrue.length-1; i >= 0 ; i--) {
        data.addRows([
            [ktTrue[i][1], ktTrue[i][0], ktFalse[i][0]] 
        ]);     
    }
    
    var options = {
        title: 'Показатели живучести',
        vAxis: {title: "Tcp.max"},
        hAxis: {title: "k", direction: -1},
        height: 600,
        width: 1200,
        seriesType: "line"
    };

    var chart = new google.visualization.ComboChart(document.getElementById('secondChart'));
    chart.draw(data, options);
}
