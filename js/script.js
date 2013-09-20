
google.load("visualization", "1", {packages:["corechart"]});

$(document).ready(function(){
    google.setOnLoadCallback(drawChartLab1(true, true, true));

    $('#lab1').click(function() {
        $('#lab1-div').css('display', 'block');
        $('#lab2-div').css('display', 'none');
        $(this).addClass('active');
        $('#lab2').removeClass('active');
    });
    $('#lab2').click(function() {
        $('#lab1-div').css('display', 'none');
        $('#lab2-div').css('display', 'block');
        $(this).addClass('active');
        $('#lab1').removeClass('active');
        redrawChart();
    });
});

//Lab 1
function drawChartLab1(acStatus, pcStatus, kcStatus) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'f');
    if(acStatus) {
        data.addColumn('number', 'Qac(t)');
        data.addColumn('number', 'Pac(t)');
    }
    if(pcStatus) {
        data.addColumn('number', 'Qpc(t)');
        data.addColumn('number', 'Ppc(t)');
    }
    if(kcStatus) {
        data.addColumn('number', 'Qkc(t)');
        data.addColumn('number', 'Pkc(t)');
    }

    for(var i = 0; i < ARR_SIZE; i++) {
        data.addRows([
            dataArray[i]
        ]);
    }

    var options = {
        title: 'Reliability. Lab 1',
        height: 400,
        width: 1200
    };

    var chart = new google.visualization.LineChart(document.getElementById('lab1-chartdiv'));
    chart.draw(data, options);
}

function drawChartLab2(task, radioStatus) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'f');
    switch(task) {
        case 1: {
            if(radioStatus) {
                data.addColumn('number', 'P(t), без резерв');
                data.addColumn('number', 'P(t), с общим');
                data.addColumn('number', 'P(t), с раздельным');
            } else {
                data.addColumn('number', 'P(t), без резерв');
                data.addColumn('number', 'dP(t), с общим');
                data.addColumn('number', 'dP(t), с раздельным');
            }
            break;
        }
        case 2: {
            if(radioStatus) {
                data.addColumn('number', 'P(t), без резерв');
                data.addColumn('number', 'P(t), с общим');
                data.addColumn('number', 'P(t), с раздельным');
                data.addColumn('number', 'P(t), с адаптивным МЭ');
            } else {
                data.addColumn('number', 'dP(t), с общим');
                data.addColumn('number', 'dP(t), с раздельным');
                data.addColumn('number', 'dP(t), c адаптивным МЭ');
            }
            break;
        }
        case 3: {
            if(radioStatus) {
                data.addColumn('number', 'P(t), без резерв');
                data.addColumn('number', 'Pсnr(t), при нагруженом');
                data.addColumn('number', 'Pcop(t), при облегченном');
                data.addColumn('number', 'Pcnnr(t), при ненагруженном');
            } else {
                data.addColumn('number', 'P(t), без резерв');
                data.addColumn('number', 'Pccp(t), при скользящем');
            }
            break;
        }
    }

    for(var i = 0; i < ARR_SIZE; i++) {
        data.addRows([
            dataArrayLab2[i]
        ]);
    }

    var options = {
        title: 'Reliability. Lab 2',
        height: 400,
        width: 1200
    };

    var chart = new google.visualization.LineChart(document.getElementById('lab2-chartdiv'));
    chart.draw(data, options);
}


// Lab 1
function changeResources(checkbox){
    var status = [false, false, false];
    if(checkbox !== undefined && $('input[name="resources"]:checked').size() === 0) {
        checkbox.checked = true;
        return;
    }
    $('input[name="resources"]:checked').each(function(){
        if(this.value == "hard")
            status[0] = true;
        else if(this.value == "soft")
            status[1] = true;
        else if(this.value == "soft-hard")
            status[2] = true;
    });

    reloadChart(status);
}

//Lab 1
function changeUsage() {
    switch ($('select').val()) {
        case "VBSR": {
            enableCkeckboxes();
            Calc_VBSR();
            changeResources();
            break;
        }
        case "VBOR": {
            enableCkeckboxes();
            Calc_VBOR();
            changeResources();
            break;
        }
        case "VBHR": {
            enableCkeckboxes();
            Calc_VBHR();
            changeResources();
            break;
        }
        case "VBOH": {
            disableCheckboxes();
            Calc_VBOX();
            changeResources();
            break;
        }
        case "real": {
            enableCkeckboxes();
            Calc_VBOR_real();
            changeResources();
            break;
        }
        case "cycle": {
            disableCheckboxes();
            Calc_VBOR_cycle();
            changeResources();
            break;
        }
    }
}

function disableCheckboxes() {
    if($('input#soft-hard').is(':checked') === false)
      $('input#soft-hard').click();
    $('input#soft').removeAttr('checked');
    $('input#hard').removeAttr('checked');
    $('input#soft').attr('disabled', 'true');
    $('input#hard').attr('disabled', 'true');
}
function enableCkeckboxes() {
    $('input#soft').removeAttr('disabled');
    $('input#hard').removeAttr('disabled');
}

function reloadChart(status) {
    createDataArray(status[0], status[1], status[2]);
    drawChartLab1(status[0], status[1], status[2]);
}

//Lab 2
function redrawChart() {
    var value = ($('input[name="optionsRadios"]:checked').val() == 'true');
    var m = parseInt($('select#mvalue').val());
    var task = parseInt($('select#task').val());
    uiFieldChanges(task);
    calcTaskByValue(task, m, value);
    createLab2DataArray(task, value);
    drawChartLab2(task, value);
}

function calcTaskByValue(task, m, value) {
    switch(task) {
        case 1:
            calcTask1(value, m);
            break;
        case 2:
            calcTask2(value, m);
            break;
        case 3:
            calcTask3(value, m);
            break;
    }
}

function uiFieldChanges(task) {
    switch(task) {
        case 1:
            $('label[for="radio1"]').text('P(t)');
            $('label[for="radio2"]').text('dP(t)');
            $('select#mvalue').removeAttr('disabled');
            break;
        case 2:
            $('label[for="radio1"]').text('P(t)');
            $('label[for="radio2"]').text('dP(t)');
            $('select#mvalue').val('1');
            $('select#mvalue').attr('disabled', 'disabled');
            break;
        case 3:
            $('label[for="radio1"]').text('СNR, COR, CNNR');
            $('label[for="radio2"]').text('CCP');
            $('select#mvalue').removeAttr('disabled');
            break;
    }    
} 