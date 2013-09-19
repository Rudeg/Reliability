
google.load("visualization", "1", {packages:["corechart"]});

$(document).ready(function(){
    google.setOnLoadCallback(drawChart(true, true, true));
});

function drawChart(acStatus, pcStatus, kcStatus) {
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

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function changeResources(checkbox){
    var status = [false, false, false];
    if(checkbox !== undefined && $('input[name="resources"]:checked').size() === 0) {
        checkbox.checked = true;
        this.preventDefault();
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
    drawChart(status[0], status[1], status[2]);
}