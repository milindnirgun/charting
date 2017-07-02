var margin = {top: 60, right: 60, bottom: 180, left: 100};


function draw() {
				
			console.log(chartContainer.node().clientWidth + " x " + chartContainer.node().clientHeight);
			// set the dimensions and margins of the graph
			var drawWidth = chartContainer.node().clientWidth - margin.left - margin.right;
			var drawHeight = chartContainer.node().clientHeight - margin.top - margin.bottom;
		
			// parse the date / time
			var parseTime = d3.timeParse("%d-%b-%y");
		
			// set the ranges
			var x = d3.scaleTime().range([0, drawWidth]);
			var y = d3.scaleLinear().range([drawHeight, 0]);
			var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d"));

			// define the first line
			var valueline1 = d3.line()
					.curve(d3.curveCardinalOpen)
					.x(function(d) { return x(d.date); })
					.y(function(d) { return y(d.close); });

			// define the second line
			var valueline2 = d3.line()
					.curve(d3.curveCardinalOpen)
					.x(function(d) { return x(d.date); })
					.y(function(d) { return y(d.open); });
			
			// Define function for making X gridlines
			function drawXGridlines() {
				return d3.axisBottom(x).ticks(10)
			}
			
			// Define function for making Y gridlines
			function drawYGridlines() {
				return d3.axisLeft(y).ticks(10)
			}
			
			
			// Clear the old svg if resizing
			d3.select('svg').remove();
		
			// append the svg obgect to the body of the page
			// appends a 'group' element to 'svg'
			// moves the 'group' element to the top left margin
			var svgContainer = d3.select(".svg-container").append("svg")
														.attr("width", drawWidth + margin.left + margin.right)
														.attr("height", drawHeight + margin.top + margin.bottom)
														.append("g")
															.attr("transform",
																		"translate(" + margin.left + "," + margin.top + ")");
			
			// Get the data
			d3.csv("../data/data2.csv", function(error, data) {
				if (error) throw error;
				// format the data
					data.forEach(function(d) {
						d.date = parseTime(d.date);
						d.close = +d.close;   // this ensures the d.close var is treated as a number
						d.open = +d.open;
					});
					// Scale the range of the data
					x.domain(d3.extent(data, function(d) { return d.date; }));
					y.domain([0, d3.max(data, function(d) { return Math.max(d.open, d.close); })]);
					
					
					// Add the valueline1 path
					svgContainer.append("path")
							.data([data])
							.attr("class", "line")
							.attr("d", valueline1);
					
					// Add the valueline2 path
					svgContainer.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", "red")
							.attr("d", valueline2);

					// Add the X gridlines
					svgContainer.append("g")
							.attr("class", "grid")
							.attr("transform", "translate(0," + drawHeight + ")")
							.call(drawXGridlines()
										.tickSize(-drawHeight)
										.tickFormat("")
								)
								
					// Add the Y gridlines
					svgContainer.append("g")
							.attr("class", "grid")
							.call(drawYGridlines().tickSize(-drawWidth).tickFormat(""));
							
					// Add label for valueline1
					svgContainer.append("text")
							.attr("transform", "translate(" + (drawWidth)+","+y(data[0].close)+")")  //since data is ordered in reverse
							//.attr("transform", "translate(" + (drawWidth)+","+y(data[data.length-1].close)+")")
							.attr("dY", ".35em")
							.attr("text-anchor", "start")
							.style("fill", "steelblue")
							.text("Close");
							
					// Add label for valueline2
					svgContainer.append("text")
							.attr("transform", "translate(" + (drawWidth)+","+y(data[0].open)+")")
							.attr("dY", ".35em")
							.attr("text-anchor", "start")
							.style("fill", "red")
							.text("Open");

					// Add the X Axis
					svgContainer.append("g")
							.attr("class", "axis")
							.attr("transform", "translate(0," + drawHeight + ")")
							.call(xAxis)
							.selectAll("text")
								.style("text-anchor", "end")
								.attr("dx", "-.8em")
								.attr("dy", ".15em")
								.attr("transform", "rotate(-45)");
								
					// Add the X Axis label
					svgContainer.append("text")
							.attr("transform", "translate(" + (drawWidth/2) + " ," + (drawHeight + margin.top + 80) + ")")
							//.attr("x", drawWidth/2)
							//.attr("Y", drawHeight + margin.top + 20)
							.attr("class", "label")
							//.style("text-anchor", "middle")
							.text("Date");
							
					// Add the Y Axis
					svgContainer.append("g")
							.call(d3.axisLeft(y));
					
					// Add the Y Axis label
					svgContainer.append("text")
							.attr("transform", "rotate(-90)")
							.attr("x", 0 - (drawHeight/2))
							.attr("y", 0 - margin.left)
							.attr("dy", "2em")
							.attr("class", "label")
							.text("Value");
							
					// Add a chart title
					svgContainer.append("text")
							.attr("x", (drawWidth / 2))
							.attr("y", 0 - (margin.top / 2))
							.attr("class", "title")
							.text("Value vs Date Line Graph");

			});
}
