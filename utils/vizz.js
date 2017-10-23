/**
 * Global variables defined here
 */
var _xRange, _yRange;  // d3 objects, Specify the X and Y axes ranges
var _width, _height;	// the width and height of the actual drawing area
											// calculated after subtracting margins from the 
											// chart container

/**
 * Returns a time scale with the given range. 
 * usage:  x = scaleTime([0, n]) where n could be the width or height
 */
function scaleTime(range)
{
	if (range == undefined || range == NaN) {
		console.log("range is not defined");
		throw new Error("range is not defined");
	}
	else
	return d3.scaleTime().range(range);
}

/**
 * Returns the X axis scale. This works for a line chart. Different scaling
 * may be required for other charts.
 * TODO - add user specified type of scale and range. Support other scales
 */
function scaleX() {
	return d3.scaleTime().range([0, _width]);
}

/**
 * Returns the Y axis scale. 
 * TODO - add user specified type of scale and range
 */
function scaleY() {
	return d3.scaleLinear().range([_height, 0]);
}

/**
 * Sets the X axis domain range based on parameters passed. The data is 
 * a JSON object containing the data to be graphed, x represents the X
 * variable to be plotted on X axis. stat is one of d3 statistical method to 
 * calculate the range eg. extent, max etc. Some of these return an array
 * type, others don't. So we handle it here to set the domain appropriately.
 * TODO - combine this with the setYDomain() to reduce redundancy.
 */
function setXDomain(data, x, stat, rangeStart=0) {
	var d3elem = d3[stat];
	var range = d3elem(data, function(d) { return d[x]; });
	if (_.isArray(range)) {
		console.log("Range is an Array");
		_xRange.domain(range);
	} else {
		console.log("Range is not an Array");
		_xRange.domain([rangeStart, range]);
	}
}
 
/**
 * Same description as setXDomian() but for Y axis.
 */
function setYDomain(data, y, stat, rangeStart=0) {
	var d3elem = d3[stat];
	//var range = [0, d3.max(data, function(d) { return d[y]; })];
	console.log(_.isFunction(y));
	result = y();
	console.log("Result = " + result);
	//var range = d3elem(data, function(d) { return _.isFunction(y) ? y : d[y]; });
	if (_.isArray(range)) {
		console.log("Range is an Array");
		_yRange.domain(range);
	} else {
		console.log("Range is not an Array");
		_yRange.domain([rangeStart, range]);
	}
}
 
/**
 * Format the X Axis. 
 * TODO - add other types of formatting
 */
function formatXaxis(format) {
	return d3.axisBottom(_xRange).tickFormat(d3.timeFormat(format));
}

/**
 * Wrapper Function to return d3 X axis with given no. of ticks.
 * TODO - add direction to request axis on any side and make smarter to
 * handle all formatting for the axis.
 */
function drawXGridlines(noOfTicks) {
	return d3.axisBottom(_xRange).ticks(noOfTicks);
}
			
/**
 * Wrapper Function to return d3 Y axis with given no. of ticks.
 * TODO - add direction to request axis on any side and make smarter to
 * handle all formatting for the axis.
 */
function drawYGridlines(noOfTicks) {
	return d3.axisLeft(_yRange).ticks(noOfTicks);
}

/**
 * Wrapper for d3 timeParse() function. 
 * TODO - make smarter
 */
function parseTime(datetime, format) {
	var parser = d3.timeParse(format);
	return parser(datetime);
}

/**
 * Returns a d3 line with curve.
 * TODO - make it configurable to use different types of curve or none
 */
function getLine(x, y, xaxis=_xRange, yaxis=_yRange) {
	return d3.line()
						.curve(d3.curveCardinalOpen)
						.x(function(d) { return xaxis(d[x]); })
						.y(function(d) { return yaxis(d[y]); })
}



/**
 * Returns a d3 area type with _xRange & _yRange set with the parameters
 * passed by caller. We do not need to know the variables in callers
 * data. The boolean under specifies whether an area under the curve is
 * requested or above; defaults to under the curve.
 * TODO - Make the curve optional or changeable
 */ 
function area(x, y, under = true) {
	return d3.area()
						.x(function(d) { return _xRange(d[x]); })
						.y1(function(d) { return _yRange(d[y]); })
						.y0(under ? _height : 0)
						.curve(d3.curveCardinalOpen.tension(0.5));
}

/**
 * Sets all the global values. Should be called from the draw()
 * function before anything else to make dynamic resizing works. This will
 * set the drawing width and height which change upon resize as also the 
 * X & Y ranges which depend on the drawing dimensions.
 */
function setGlobal(elem) {
	if(margin == NaN || margin == undefined) {
		console.log("undefined margin. Using default");
		var margin = {top: 10, right: 10, bottom: 10, left: 10};
	}
	_width = elem.clientWidth - margin.left - margin.right;
	_height = elem.clientHeight - margin.top - margin.bottom;
	_xRange = scaleX();
	_yRange = scaleY();

}

/**
 * Creates and returns a new SVG container. The dimensions are already 
 * initialized when this is called - call after the init method.
 * TODO - creates the SVG within a ".svg-container" classed element. This
 * is not necessary; can be done directly on the body. Maybe later.
 */
function createSvgContainer(c) {
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	return d3.select(c).append("svg")
						.attr("width", _width + margin.left + margin.right)
						.attr("height", _height + margin.top + margin.bottom)
						.append("g")
						.attr("transform",
									"translate(" + margin.left + "," + margin.top + ")");
}	

