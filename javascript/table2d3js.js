

$(document).ready(function($) {

	/*
	 * Utilisation de d3pie a partir d'un tableau HTML 
	 * Créer un tableau dans SPIP avec les données.
	 * Mettre en entête label, value, color
	 * Entourer le tableau par <div class="pie"></div>
	 *
	 * Exemple de tableau
	 *
	 * <div class="pie">
	 * ||Bar chart language|Bar chart language||
	 * |{{language}}|{{user}}|{{color}}|
	 * |JavaScript|264131|green|
	 * |Ruby|218812|orange|
	 * |PHP|18812|red|
	 * </div>
	 */

	if($('.pie').size() > 0){

		$(".pie").each(function(i) {

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

		    $(this).append('<div id="pie' + i + '"></div>');

		  	var pie = new d3pie("pie" + i, {
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
		  	$(".pie table").hide();

		});

	}


    /*
     * Créer des bar chart a partir d'un tableau HTML 
     * Créer un tableau dans SPIP avec les données.
     * Mettre en entête label, value, color
     * Entourer le tableau par <div class="bar"></div>
     *
     * Exemple de tableau
     *
     * <div class="bar">
     * ||Bar chart language|Bar chart language||
     * |{{language}}|{{user}}|{{color}}|
     * |JavaScript|264131|green|
     * |Ruby|218812|orange|
     * |PHP|18812|red|
     * </div>
     */

    if($('.bar').size() > 0) {

        $(".bar").each(function(i) {

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

            $(this).append('<div id="bar' + i + '"></div>');

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

            var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>" + title_label + "</strong> <span style='color:red'>" + d.value + "</span>";
              })

            var svg = d3.select("#bar" + i).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                svg.call(tip);

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

                svg.selectAll(".bar")
                    .data(json)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .style("fill", function(d) { return d.color; })
                    .attr("x", function(d) { return x(d.label); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return y(d.value); })
                    .attr("height", function(d) { return height - y(d.value); })
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);

                svg.append("text")
                    .attr("x", (width / 2))             
                    .attr("y", 4 - (margin.top / 2))
                    .attr("text-anchor", "middle")  
                    .style("font-size", "20px") 
                    .text(caption);

            $(".bar table").hide();

       });
   }

    if($('.ligne').size() > 0) {

        $(".ligne").each(function(i) {

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

            $(this).append('<div id="ligne' + i + '"></div>');

			var margin = {top: 20, right: 20, bottom: 30, left: 50},
			    width = 660 - margin.left - margin.right,
			    height = 500 - margin.top - margin.bottom;

			var x = d3.scale.linear()
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

			var svg = d3.select("#ligne" + i).append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  	.append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

			$(".ligne table").hide();
		});
	}

});