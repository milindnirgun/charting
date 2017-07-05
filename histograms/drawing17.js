var margin = {top: 60, right: 60, bottom: 180, left: 100};


function draw() {

			// Initialize the environment and set all global variables
			setGlobal(chartContainer);	
			//console.log(_width + " x " + _height);
			
			var svgContainer = createSvgContainer("body");
			
			// Parse the date/time
			
			// Set the ranges: convert to vizz
			var x = d3.scaleTime()
								.domain([new Date(2010, 6, 3), new Date(2012, 0, 1)])
								.rangeRound([0, _width]);
								
			var y = d3.scaleLinear()
								.range([_height, 0]);

			// set the parameters for the histogram
			var histogram = d3.histogram()
												.value(function(d) { return d.date; })
												.domain(x.domain())
												.thresholds(x.ticks(d3.timeMonth));
												
			// Get the data
			d3.csv("../data/earthquakes.csv", function(error, data) {
				if (error) throw error;
				
				// format the data, convert sales to numeric
				data.forEach(function(d) { d.sales = parseTime(d.dtg, "%d-%m-%Y"); });
				
				// bin the data
				var bins = histogram(data);
				//console.log(_.values(bins));
				// scale the range of the data in the y domain
				y.domain([0, d3.max(bins, function(d) { return d.length; })]);
				
				// append the bar rectangles to the svg
				svgContainer.selectAll("rect")
										.data(bins)
										.enter().append("rect")
											.attr("class", "bar")
											.attr("x", 1)
											.attr("transform", function(d) {
														return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
											.attr("width", function(d) { return x(d.x1) - x(d.x0) -1; })   // bug - last bin has same dates
											.attr("height", function(d) { return _height - y(d.length); });
											
				// Add the X Axis
				svgContainer.append("g")
										.attr("transform", "translate (0, " + _height + ")")
										.call(d3.axisBottom(x));
												
				// Add the Y axis
				svgContainer.append("g")
										.call(d3.axisLeft(y));
										
											
			});
}

