// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $(this).closest('.collapse').collapse('toggle');
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

function queryGraphData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var result = JSON.parse(xmlhttp.responseText);

            $('#ping-info').html('<div class="col-md-4" >Minimum : '+result['ping_stats'][0]+' ms<br>Average : '+result['ping_stats'][1]+' ms</div><div class="col-md-4" >Maximum : '+result['ping_stats'][2]+' ms<br>Standard deviation : '+result['ping_stats'][3]+' ms</div><div class="col-md-4" >Relative standard deviation : '+result['ping_stats'][4]+' %</div>');
            $('#down-info').html('<div class="col-md-4" >Minimum : '+result['down_stats'][0]+' Mbits/s<br>Average : '+result['down_stats'][1]+' Mbits/s</div><div class="col-md-4" >Maximum : '+result['down_stats'][2]+' Mbits/s<br>Standard deviation : '+result['down_stats'][3]+' Mbits/s</div><div class="col-md-4" >Relative standard deviation : '+result['down_stats'][4]+' %</div>');
            $('#up-info').html('<div class="col-md-4" >Minimum : '+result['up_stats'][0]+' Mbits/s<br>Average : '+result['up_stats'][1]+' Mbits/s</div><div class="col-md-4" >Maximum : '+result['up_stats'][2]+' Mbits/s<br>Standard deviation : '+result['up_stats'][3]+' Mbits/s</div><div class="col-md-4" >Relative standard deviation : '+result['up_stats'][4]+' %</div>');

            var d3_ping = Plotly.d3;
            var d3_down = Plotly.d3;
            var d3_up = Plotly.d3;

            var gd3_ping = d3_ping.select('#ping-graph');

            var gd3_down = d3_down.select('#down-graph');

            var gd3_up = d3_up.select('#up-graph');

            var gd_ping = gd3_ping.node();
            var gd_down = gd3_down.node();
            var gd_up = gd3_up.node();

            Plotly.newPlot(gd_ping, [{
                    x: result['time'],
                    y: result['ping'],
                    type: 'scatter'
                }], {
            });

            Plotly.newPlot(gd_down, [{
                    x: result['time'],
                    y: result['down'],
                    type: 'scatter'
                }], {
            });

            Plotly.newPlot(gd_up, [{
                    x: result['time'],
                    y: result['up'],
                    type: 'scatter'
                }], {
            });

            window.onresize = function() {
                Plotly.Plots.resize(gd_ping);
                Plotly.Plots.resize(gd_down);
                Plotly.Plots.resize(gd_up);
            };
        }
    }
    xmlhttp.open("GET","query.php",true);
    xmlhttp.send();
}

// Query data
queryGraphData();

// date picker
$(function () {
    $('#datetimepickerStart').datetimepicker({

    });
    $('#datetimepickerEnd').datetimepicker({
        useCurrent: false //Important! See issue #1075
    });
    $("#datetimepickerStart").on("dp.change", function (e) {
        $('#datetimepickerEnd').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepickerEnd").on("dp.change", function (e) {
        $('#datetimepickerStart').data("DateTimePicker").maxDate(e.date);
    });
});