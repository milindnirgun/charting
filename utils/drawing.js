//The data for our line
var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                  { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                  { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
var lineFunction = d3.line()
											.x(function(d) {return d.x; })
											.y(function(d) {return d.y; });
											
/**
 * Use an inner g element as the SVG canvas in order to set and forget margins.
 * See http://bl.ocks.org/mbostock/3019563
 */
var margin = {
			top: 10,
			right: 30,
			bottom: 50,
			left: 40
};

function draw() {
		//var container = d3.select('.chart-container');
		console.log(chartContainer.node().clientWidth + " x " + chartContainer.node().clientHeight);
		// Following code maintains a fixed 4:3 aspect ratio 
		var drawWidth = Math.round(0.80 * chartContainer.node().clientWidth);
		var drawHeight = Math.round(chartContainer.node().clientHeight);
		//var drawHeight = Math.round(drawWidth * (3 / 4)); // Fixing a 4/3 aspect ratio

		var width = drawWidth - margin.left - margin.right;
		var height = drawHeight - margin.top - margin.bottom;
	
		// clear old svg before redrawing
		d3.select('svg').remove();
			
		var svgContainer = d3.select(".svg-container").append("svg")
									.attr("width", drawWidth)
									.attr("height", drawHeight)

		var lineGraph = svgContainer.append("path")
																	.attr("d", lineFunction(lineData))
																	.attr("class", "line");
																	
}
