var margin = {top: 60, right: 60, bottom: 180, left: 100};


					
function draw() {
		
		setGlobal(chartContainer);

		var svgContainer = createSvgContainer();
		
		// define the line
		var valueline = getLine("date", "close");

		// Define the area under the smoothened curve
		var areaUnder = area("date", "close");
		var areaAbove = area("date", "close", false);

		// Get the data
		d3.csv("../data/data.csv", function(error, data) {
			if (error) throw error;
			// format the data
				data.forEach(function(d) {
					d.date = parseTime(d.date, "%d-%b-%y");
					d.close = +d.close;
				});
				// Scale the range of the data
				setXDomain(data, "date", "extent");
				setYDomain(data, "close", "max");
				
				// Add the area above path.
				path = svgContainer.append("path")
						.data([data])
						.attr("class", "area_above")
						.attr("d", areaAbove);
						
				// Add the area under path.
				path = svgContainer.append("path")
						.data([data])
						.attr("class", "area_under")
						.attr("d", areaUnder);
				
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
						.attr("class", "label")
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
