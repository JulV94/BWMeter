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

            $('#ping-info').html('Min : '+result['ping_extr'][0]+'<span class="vDivider"></span>Avg : '+result['ping_extr'][1]+'<span class="vDivider"></span>Max : '+result['ping_extr'][2]+'<span class="vDivider"></span>ms');
            $('#down-info').html('Min : '+result['down_extr'][0]+'<span class="vDivider"></span>Avg : '+result['down_extr'][1]+'<span class="vDivider"></span>Max : '+result['down_extr'][2]+'<span class="vDivider"></span>Mbits/s');
            $('#up-info').html('Min : '+result['up_extr'][0]+'<span class="vDivider"></span>Avg : '+result['up_extr'][1]+'<span class="vDivider"></span>Max : '+result['up_extr'][2]+'<span class="vDivider"></span>Mbits/s');

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
