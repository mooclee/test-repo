 // http://bernii.github.io/gauge.js/
 /////////////////////////////////////////////////////////

var gauge_ops = {
	lines: 12, // The number of lines to draw
	angle: 0.15, // The length of each line
	lineWidth: 0.3, // The line thickness
	pointer: {
		length: 0.49, // The radius of the inner circle
		strokeWidth: 0.053, // The rotation offset
		color: '#000000' // Fill color
	},
	limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
	colorStart: '#6FADCF',   // Colors
	colorStop: '#8FC0DA',    // just experiment with them
	strokeColor: '#E0E0E0',   // to see which ones work best for you
	generateGradient: true,
	percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
};

//////////////////////////////////////////////////////////

function setGauge1(jgauge1, value){
	//console.debug('setGauge1', jgauge1, value);
	
	// show value in charts
	var data = jgauge1.data();
	if (!data){
		jgauge1.gauge(gauge_ops);
		data = jgauge1.data();
	}
	if (data){
		if (!data.gauge){
			data.gauge = new Gauge(jgauge1[0]).setOptions(gauge_ops);
		}
		if (data.gauge){
			data.gauge.set(value);
		}
	}
	// show value in numbers
	var value2 = parseInt(value * 10) / 10;
	jgauge1.parent().find('.div_gauge').html(value2);
}

//////////////////////////////////////////////////////////

function calcAvGauge(currentRating, $el){
	//console.log('index: ', currentIndex, 'currentRating: ', currentRating, ' DOM element ', $el);
	// save
	$el.attr('rating', currentRating);
	// find overall
	var jtbody = $el.parent().parent().parent();
	//console.debug(currentRating, jtbody);
	var number = 0, total = 0;
	jtbody.find('span[rating]').each(function(){
		var rating = parseFloat($(this).attr('rating'));
		if (typeof(rating) != 'undefined' &&  !isNaN(rating)){
			total += rating;
		}
		number++;
	});
	var av = Math.floor((total / number) * 10) / 10;
	//console.debug('total=', total, 'number=', number, 'av=', av);
	// FIND & SET GAUGE
	var jgauge1 = jtbody.parent().parent().parent().find('.status_gauge');
	setGauge1(jgauge1, av);
}
