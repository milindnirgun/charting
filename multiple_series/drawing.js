draw();

$(window).on("resize", function () {
    draw();
});

function draw() {
    var container = d3.select('.chart-container');
    var drawWidth = Math.round(0.80 * container.node().clientWidth);
    var drawHeight = Math.round(drawWidth * (3 / 4)); // Fixing a 4/3 aspect ratio

    /*
     * Use an inner g element as the SVG canvas in order to set and forget margins.
     * See http://bl.ocks.org/mbostock/3019563
     */
    var margin = {
        top: 10,
        right: 30,
        bottom: 50,
        left: 40
    };
    var width = drawWidth - margin.left - margin.right;
    var height = drawHeight - margin.top - margin.bottom;

    var svg = container.select(".svg-container").selectAll('svg').data([0]);
    
    svg.enter()
        .append("svg")
        .append("g")
            .attr("class", "canvas")
            // jsFiddle doesn't translate correctly, maybe because of frames???
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.attr("width", drawWidth)
       .attr("height", drawHeight)

    console.debug(svg.node()); // null on resize???
    
    // Add some random SVG element
    svg.selectAll('rect')
            .data([0]) // Single data element to create SVG if it doesn't exist
        .enter().append('rect')
            .attr({
                x: 0,
                y: 0,
                width: drawWidth - margin.right - margin.left,
                height: drawHeight - margin.bottom - margin.top
            });
}
