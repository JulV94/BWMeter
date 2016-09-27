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

// generate the graphs
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        var result = JSON.parse(xmlhttp.responseText);
        var pingData = [
        {
          x: result['time'],
          y: result['ping'],
          type: 'scatter'
        }];
        var downData = [
        {
          x: result['time'],
          y: result['down'],
          type: 'scatter'
        }];
        var upData = [
        {
          x: result['time'],
          y: result['up'],
          type: 'scatter'
        }];

        Plotly.newPlot('pingGraph', pingData);
        Plotly.newPlot('downGraph', downData);
        Plotly.newPlot('upGraph', upData);
    }
}
xmlhttp.open("GET","query.php",true);
xmlhttp.send();