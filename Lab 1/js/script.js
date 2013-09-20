
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
        drawChartLab2(1, $('input[name="optionsRadios"]:checked').val());
        $('#lab1-div').css('display', 'none');
        $('#lab2-div').css('display', 'block');
        $(this).addClass('active');
        $('#lab1').removeClass('active');
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
        width: 1400
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
    }

    for(var i = 0; i < ARR_SIZE; i++) {
        data.addRows([
            dataArrayLab2[i]
        ]);
    }

    var options = {
        title: 'Reliability. Lab 2',
        height: 400,
        width: 1400
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

//Lab 2
function changeTask() {

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

//lab2
function changel2Radio() {
    var value = ($('input[name="optionsRadios"]:checked').val() == 'true');
    calcTask1(value);
    createLab2DataArray(1);
    drawChartLab2(1, value)
}