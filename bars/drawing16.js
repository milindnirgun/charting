var margin = {top: 60, right: 60, bottom: 180, left: 100};


function draw() {

			// Initialize the environment and set all global variables
			setGlobal(chartContainer);	
			//console.log(_width + " x " + _height);
			
			var svgContainer = createSvgContainer("body");
			
			// Set the ranges: convert to vizz
			var x = d3.scaleBand()
								.range([0, _width])
								.padding(0.1);
								
			var y = d3.scaleLinear()
								.range([_height, 0]);
			
			// Get the data
			d3.csv("../data/bardata1.csv", function(error, data) {
				if (error) throw error;
				
				// format the data, convert sales to numeric
				data.forEach(function(d) { d.sales = +d.sales; });
				
				// Scale the range of the data in the domains
				x.domain(data.map(function(d) { return d.salesperson; }));
				y.domain([0, d3.max(data, function(d) { return d.sales; })]);
				
				// append the rectangles for the bar chart
				svgContainer.selectAll(".bar")
										.data(data)
										.enter().append("rect")
											.attr("class", "bar")
											.attr("x", function(d) { return x(d.salesperson); })
											.attr("width", x.bandwidth())
											.attr("y", function(d) { return y(d.sales); })
											.attr("height", function(d) { return _height - y(d.sales); });
											
				// Add the X Axis
				svgContainer.append("g")
										.attr("transform", "translate (0, " + _height + ")")
										.call(d3.axisBottom(x));
												
				// Add the Y axis
				svgContainer.append("g")
										.call(d3.axisLeft(y));
										
											
			});
}

