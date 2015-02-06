

$(document).ready(function($) {

	/*
	 * Utilisation de d3pie a partir d'un tableau HTML 
	 * Créer un tableau dans SPIP avec les données.
	 * Mettre en entête label, value, color
	 * Entourer le tableau par <div class="d3pie"></div>
	 *
	 * Exemple de tableau
	 *
	 * <div class="d3pie">
	 * ||Bar chart language|Bar chart language||
	 * |{{language}}|{{user}}|{{color}}|
	 * |JavaScript|264131|green|
	 * |Ruby|218812|orange|
	 * |PHP|18812|red|
	 * </div>
	 */

	if($('.d3pie').size() > 0){

		$(".d3pie").each(function(i) {

			var caption = $(this).find("table caption").html();
		 	var json = [];
		    $(this).find("table tr").each(function(i) {
		    	if (i === 0) return;
		        var label = $(this).find('td').eq(0).html();
		        var value = $(this).find('td').eq(1).html();
		        var color = $(this).find('td').eq(2).html();

		        item = {}
		        item["label"] = label;
		        item["value"] = $.isNumeric(value) ? parseFloat(value) : value;
		        item["color"] = color;

		        json.push(item);
		    });

		    $(this).append('<div id="d3pie' + i + '"></div>');

		  	var pie = new d3pie("d3pie" + i, {
				size: {
					canvasHeight: 660,
					canvasWidth: 660
				},
			    header: {
			      title: {
			        text: caption,
			        fontSize: 20
			      }
			    },
			    data: {
			      content: json 
			    }
		  	});
		  	$(".d3pie table").hide();

		});

	}

    /*
     * Créer des bar chart a partir d'un tableau HTML 
     * Créer un tableau dans SPIP avec les données.
     * Mettre en entête label, value, color
     * Entourer le tableau par <div class="d3bar"></div>
     *
     * Exemple de tableau
     *
     * <div class="d3bar">
     * ||Bar chart language|Bar chart language||
     * |{{language}}|{{user}}|{{color}}|
     * |JavaScript|264131|green|
     * |Ruby|218812|orange|
     * |PHP|18812|red|
     * </div>
     */

    if($('.d3bar').size() > 0) {

        $(".d3bar").each(function(i) {

            var caption = $(this).find("table caption").html();
            var title_label = $(this).find('table th').eq(0).html();
            var title_value = $(this).find('table th').eq(1).html();
            var title_color = $(this).find('table th').eq(2).html();

            var title_json = [];
            var json = [];
            $(this).find("table tr").each(function(i) {
                if (i === 0) return;

                var label = $(this).find('td').eq(0).html();
                var value = $(this).find('td').eq(1).html();
                var color = $(this).find('td').eq(2).html();

                item = {}
                item["label"] = label;
                item["value"] = $.isNumeric(value) ? parseFloat(value) : value;
                item["color"] = color;

                json.push(item);
            });

            $(this).append('<div id="d3bar' + i + '"></div>');

            var margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 660 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(20);

			var div = d3.select("body")
				.append("div")
				.attr("class", "tooltip_bar")
				.style("opacity", 0);

            var svg = d3.select("#d3bar" + i).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                x.domain(json.map(function(d) {return d.label; }));
                y.domain([0, d3.max(json, function(d) { return d.value; })]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text(title_value);

                svg.selectAll(".d3bar")
                    .data(json)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .style("fill", function(d) { return d.color; })
                    .attr("x", function(d) { return x(d.label); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return y(d.value); })
                    .attr("height", function(d) { return height - y(d.value); })
				    .on("mouseover", function(d) {
				        div.transition()
				            .duration(500)
				            .style("opacity", 0);
				        div.transition()
				            .duration(200)
				            .style("opacity", .9);    
				        div.html(d.label + "<br/>"  + d.value + " " + title_value)
				            .style("left", (d3.event.pageX - 10) + "px")
				            .style("top", (d3.event.pageY - 10) + "px")
				            .style("background-color", "#000000")
				            .style("border", "1px solid " + d.color)
				            .style("color", "#FFFFFF")
				            .style("z-index", 5000); 
				    });

                svg.append("text")
                    .attr("x", (width / 2))             
                    .attr("y", 4 - (margin.top / 2))
                    .attr("text-anchor", "middle")  
                    .style("font-size", "20px") 
                    .text(caption);

            $(".d3bar table").hide();

       });
    }

    /*
     * Créer des line chart a partir d'un tableau HTML 
     * Créer un tableau dans SPIP avec les données.
     * Mettre en entête label, value, color (facultatif)
     * Le label doit être une date
     * Entourer le tableau par <div class="d3ligne"></div>
     *
     * Exemple de tableau
     *
	 * <div class="d3ligne">
	 * ||Line chart alcohol|Line chart alcohol||
	 * |{{date}}|{{user}}|
	 * |1-May-12|64131|
	 * |30-Apr-12|18812|
	 * |27-Apr-12|38812|
	 * </div>
     */

    if($('.d3ligne').size() > 0) {

        $(".d3ligne").each(function(i) {

            var caption = $(this).find("table caption").html();
            var title_label = $(this).find('table th').eq(0).html();
            var title_value = $(this).find('table th').eq(1).html();
            var title_color = $(this).find('table th').eq(2).html();

            var title_json = [];
            var json = [];
            $(this).find("table tr").each(function(i) {
                if (i === 0) return;

                var label = $(this).find('td').eq(0).html();
                var value = $(this).find('td').eq(1).html();
                var color = $(this).find('td').eq(2).html();

                item = {}
                item["label"] = label;
                item["value"] = $.isNumeric(value) ? parseFloat(value) : value;
                item["color"] = color;

                json.push(item);
            });

            $(this).append('<div id="d3ligne' + i + '"></div>');

			var margin = {top: 20, right: 20, bottom: 30, left: 50},
			    width = 660 - margin.left - margin.right,
			    height = 500 - margin.top - margin.bottom;

			var parseDate = d3.time.format("%d-%b-%y").parse;
			var tooltipDate = d3.time.format("%e %b");

			var x = d3.time.scale()
			    .range([0, width]);

			var y = d3.scale.linear()
			    .range([height, 0]);

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left");

			var line = d3.svg.line()
			    .x(function(d) { return x(d.label); })
			    .y(function(d) { return y(d.value); });

			var div = d3.select("body")
			    .append("div")
			    .attr("class", "tooltip")
			    .style("opacity", 0);

			var svg = d3.select("#d3ligne" + i).append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  	.append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			json.forEach(function(d) {
				d.label = parseDate(d.label);
			    d.value = +d.value;
			});

            x.domain(d3.extent(json, function(d) { return d.label; }));
  			y.domain(d3.extent(json, function(d) { return d.value; }));

			svg.append("g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(0," + height + ")")
			    .call(xAxis);

			svg.append("g")
			    .attr("class", "y axis")
			    .call(yAxis)
			    .append("text")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 6)
			    .attr("dy", ".71em")
			    .style("text-anchor", "end")
			    .text(title_value);

			svg.append("path")
			    .datum(json)
			    .attr("class", "line")
			    .attr("d", line);

            svg.append("text")
                .attr("x", (width / 2))             
                .attr("y", 4 - (margin.top / 2))
                .attr("text-anchor", "middle")  
                .style("font-size", "20px") 
                .text(caption);

			svg.selectAll("dot")                                    
			   	.data(json)                                            
			    .enter().append("circle")                                
			    .attr("fill", "steelblue")
			    .attr("r", 2)    
			    .attr("cx", function(d) { return x(d.label); })         
			    .attr("cy", function(d) { return y(d.value); })
			    .on("mouseover", function(d) {
			        div.transition()
			            .duration(500)
			            .style("opacity", 0);
			        div.transition()
			            .duration(200)
			            .style("opacity", .9);    
			        div.html(tooltipDate(d.label) + "<br/>"  + d.value)
			            .style("left", (d3.event.pageX) + "px")
			            .style("top", (d3.event.pageY - 28) + "px")
			            .style("z-index", 5000); 
				});

			$(".d3ligne table").hide();
		});
	}

});