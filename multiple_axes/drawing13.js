var margin = {top: 60, right: 60, bottom: 180, left: 100};


function draw() {

			// Initialize the environment and set all global variables
			setGlobal(chartContainer);	
			//console.log(_width + " x " + _height);
			
			var valueline1 = getLine("date", "close");
			var valueline2 = getLine("date", "open");

			var svgContainer = createSvgContainer(".svg-container");
			// Get the data
			d3.csv("../data/data2.csv", function(error, data) {
				if (error) throw error;
				// format the data
					data.forEach(function(d) {
						d.date = parseTime(d.date, "%d-%b-%y");
						d.close = +d.close;   // this ensures the d.close var is treated as a number
						d.open = +d.open;
					});

					// Scale the range of the data
					setXDomain(data, "date", "extent");
					//var f = function(d) { return Math.max(d.open, d.close); }
					//setYDomain(data, f, "max");
						/*
					// Scale the range of the data
					_xRange.domain(d3.extent(data, function(d) { return d.date; }));
					*/
					_yRange.domain([0, d3.max(data, function(d) { return Math.max(d.open, d.close); })]);
					
					
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
							.attr("transform", "translate(0," + _height + ")")
							.call(drawXGridlines(10)
										.tickSize(-_height)
										.tickFormat("")
								)
								
					// Add the Y gridlines
					svgContainer.append("g")
							.attr("class", "grid")
							.call(drawYGridlines(10).tickSize(-_width).tickFormat(""));
							
					// Add label for valueline1
					svgContainer.append("text")
							.attr("transform", "translate(" + (_width)+","+ _yRange(data[0].close)+")")  //since data is ordered in reverse
							//.attr("transform", "translate(" + (_width)+","+y(data[data.length-1].close)+")")
							.attr("dY", ".35em")
							.attr("text-anchor", "start")
							.style("fill", "steelblue")
							.text("Close");
							
					// Add label for valueline2
					svgContainer.append("text")
							.attr("transform", "translate(" + (_width)+","+ _yRange(data[0].open)+")")
							.attr("dY", ".35em")
							.attr("text-anchor", "start")
							.style("fill", "red")
							.text("Open");

					// Add the X Axis
					svgContainer.append("g")
							.attr("class", "axis")
							.attr("transform", "translate(0," + _height + ")")
							.call(formatXaxis("%Y-%m-%d"))
							.selectAll("text")
								.style("text-anchor", "end")
								.attr("dx", "-.8em")
								.attr("dy", ".15em")
								.attr("transform", "rotate(-45)");
								
					// Add the X Axis label
					svgContainer.append("text")
							.attr("transform", "translate(" + (_width/2) + " ," + (_height + margin.top + 80) + ")")
							//.attr("x", _width/2)
							//.attr("Y", _height + margin.top + 20)
							.attr("class", "label")
							//.style("text-anchor", "middle")
							.text("Date");
							
					// Add the Y Axis
					svgContainer.append("g")
							.call(d3.axisLeft(_yRange));
					
					// Add the Y Axis label
					svgContainer.append("text")
							.attr("transform", "rotate(-90)")
							.attr("x", 0 - (_height/2))
							.attr("y", 0 - margin.left)
							.attr("dy", "2em")
							.attr("class", "label")
							.text("Value");
							
					// Add a chart title
					svgContainer.append("text")
							.attr("x", (_width / 2))
							.attr("y", 0 - (margin.top / 2))
							.attr("class", "title")
							.text("Value vs Date Line Graph");

			});
}
