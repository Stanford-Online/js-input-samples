// The "JSPState" JSON dictionary below is passed to the platform for grading and saving.
// It gets logged.
var JSPState = {
	'lowerguess': 'unset',
	'upperguess': 'unset',
	'lowerclosed': true,
	'upperclosed': true,
	'timeproblem': false
};


// Returns a number rounded to a given number of significant figures.
function sigFigs(number, digits){
	if(number == 0) {
		return(number);
	}
	var d = Math.ceil( Math.log(number < 0 ? -number: number) / Math.LN10 );
	var power = digits - d;

	var magnitude = Math.pow(10, power);
	var shifted = Math.round(number * magnitude)
	return shifted/magnitude;
}


// Sets up the visual field after reloading.
function putBackGuesses(){

	// Set the values of the sliders and textboxes.
	if(JSPState.timeproblem){
		$( '#leftbound' ).val( timeToHMS(JSPState.lowerguess) );
		$('#rangeselector').slider('values', 0, JSPState.lowerguess);

		$( '#rightbound' ).val( timeToHMS(JSPState.upperguess) );
		$('#rangeselector').slider('values', 1, JSPState.upperguess);
	}else{
		$( '#leftbound' ).val( sigFigs(JSPState.lowerguess, 3) );
		$('#rangeselector').slider('values', 0, JSPState.lowerguess);

		$( '#rightbound' ).val( sigFigs(JSPState.upperguess, 3) );
		$('#rangeselector').slider('values', 1, JSPState.upperguess);
	}

	// Put the checkboxes into their proper state.
	if(!JSPState.lowerclosed){
		$('.leftopenclose').text('Open');
		$('#lefttypebox').prop('checked', false);
	}
	if(!JSPState.upperclosed){
		$('.rightopenclose').text('Open');
		$('#righttypebox').prop('checked', false);
	}
	console.log('guesses put back');
	console.log(JSPState);

}


// Converts seconds to hh:mm:ss format for time-based problems
function timeToHMS(time){
	var hours;
	var minutes;
	var seconds;
	var timestring = '';

	time = Math.floor(time);
	hours = Math.floor(time / 3600);
	minutes = Math.floor((time/60) % 60);
	seconds = Math.floor(time % 60);

	if(minutes < 10){
		minutes = '0' + minutes;
	}
	if(seconds < 10){
		seconds = '0' + seconds;
	}

	timestring = '0:' + seconds;
	if(minutes > 0){
		timestring = minutes + ':' + seconds;
	}
	if(hours > 0){
		timestring = hours + ':' + minutes + ':' + seconds;
	}

	return timestring;
}

// Converts hh:mm:ss to a number of seconds for time-based problems
function hmsToTime(hms){


	hms = hms.toString();

	var hmsArray = hms.split(':');
	var time = 0;

	if(hmsArray.length == 3){
		time = 3600*parseInt(hmsArray[0]) + 60*parseInt(hmsArray[1]) + parseInt(hmsArray[2]);
	}
	else if(hmsArray.length == 2){
		time = 60*parseInt(hmsArray[0]) + parseInt(hmsArray[1]);
	}

	else if(hmsArray.length == 1){
		time = parseInt(hmsArray[0]);
	}

	return time;
}


$(document).ready(function(){

	// Give the iframe a useful description for screen readers.
	parent.$('iframe[name=' + window.name + ']').attr('title', 'Estimation Problem Frame');

	// ToDo: Get the ID of the current problem so we can have more than one
	// range guessing problem on the same page. Right now the first one's values
	// are the only ones that can be used.

	// Read python-randomized items from the parent frame.
	// If this doesn't work, might need to delay it until the parent frame is done loading.
	var farleft = parseFloat(parent.$('#lowerlimit').text());
	var farright = parseFloat(parent.$('#upperlimit').text());
	var show_open_close = parent.$('#openclose').text();
	var is_time_problem = parent.$('#istimequestion').text();

	console.log('inner ready');


	// If we don't already have upper and lower guesses, make some up.
	if(JSPState.lowerguess == 'unset' || JSPState.lowerguess == 'unset'){
		JSPState.lowerguess = farleft + Math.random() * (farright - farleft) / 2
		JSPState.upperguess = farright - Math.random() * (farright - farleft) / 2
	}

	// What's the interval for our slider?
	var slidestep = sigFigs((farright - farleft) / 200, 3);

	// Is this a time-based problem?
	JSPState.timeproblem = (is_time_problem.toLowerCase() == 'true');


	// Take out the open/closed interval checkboxes if we don't need them.
	if(show_open_close.toLowerCase() != 'true'){
		$('.for-numerical').remove();
	}

	// If this is a time-based problem, set up the range differently.
	if(JSPState.timeproblem){
		farleft = 0.0;
		farright = parseFloat(parent.$('#maxtime').text());
	}


	// Set up the slider for selecting a range.
	$( '#rangeselector' ).slider({
		range: true,
		min: farleft,
		max: farright,
		step: slidestep,
		values: [ JSPState.lowerguess, JSPState.upperguess ],
		slide: function(event, ui) {
			updateDisplay();
			$('#errors').text('');
		},
		create: function(event, ui){
			updateLabels();
		}
	});


	// Below are all the listeners for the numerical entry boxes and checkboxes.
	// Watch for changes in the lower bound's textbox.
	$('#leftbound').on('change', function(ui){

		if(JSPState.timeproblem){
			JSPState.lowerguess = parseFloat(hmsToTime(ui.target.value));
			JSPState.upperguess = parseFloat(hmsToTime($('#rightbound').val()));
		}else{
			JSPState.lowerguess = parseFloat(ui.target.value);
			JSPState.upperguess = parseFloat($('#rightbound').val());
		}

		// Throw an error and fix if the lower bound is over the upper bound.
		if(JSPState.lowerguess <= JSPState.upperguess){
			$('#rangeselector').slider('values', 0, JSPState.lowerguess);
			$('#errors').text('');
		}else{
			var newupper = sigFigs(JSPState.upperguess - slidestep, 3);
			$('#rangeselector').slider('values', 0, newupper);
			$('#leftbound').val(newupper);
			$('#errors').text('Lower bound too high - reset to ' + newupper);
		}
	});

	// Watch for changes in the upper bound's textbox.
	$('#rightbound').on('change', function(ui){

		if(JSPState.timeproblem){
			JSPState.lowerguess = parseFloat(hmsToTime($('#leftbound').val()));
			JSPState.upperguess = parseFloat(hmsToTime(ui.target.value));
		}else{
			JSPState.lowerguess = parseFloat($('#leftbound').val());
			JSPState.upperguess = parseFloat(ui.target.value);
		}

		// Throw an error and fix if the upper bound is less than the lower bound.
		if(JSPState.upperguess >= JSPState.lowerguess){
			$('#rangeselector').slider('values', 1, JSPState.upperguess);
			$('#errors').text('');
		}else{
			var newlower = sigFigs(JSPState.lowerguess + slidestep, 3);
			$('#rangeselector').slider('values', 1, newlower);
			$('#rightbound').val(newlower);
			$('#errors').text('Upper bound too low - reset to ' + newlower);
		}
	});

	// Watch for the lower open/closed checkbox.
    $('#lefttypebox').on('change', function(ui){
    	JSPState.lowerclosed = !JSPState.lowerclosed
		if(JSPState.lowerclosed){
			$('.leftopenclose').text('Closed');
		}else{
			$('.leftopenclose').text('Open');
		}
	});

	// Watch for the upper open/closed checkbox.
    $('#righttypebox').on('change', function(ui){
    	JSPState.upperclosed = !JSPState.upperclosed
		if(JSPState.upperclosed){
			$('.rightopenclose').text('Closed');
		}else{
			$('.rightopenclose').text('Open');
		}
	});

	// Only called when the slider is created or moved.
	function updateDisplay(){

		var lowerchoice = $( '#rangeselector' ).slider( 'values', 0 );
		var upperchoice = $( '#rangeselector' ).slider( 'values', 1 );

		// The switch in order between these two branches is important.
		// Time problems need the guesses set *before* we turn the times
		// into human-readable formats.
		if(JSPState.timeproblem){
	    	JSPState.lowerguess = lowerchoice;
	    	JSPState.upperguess = upperchoice;

			lowerchoice = timeToHMS(lowerchoice);
			upperchoice = timeToHMS(upperchoice);

		    $( '#leftbound' ).val(lowerchoice);
	    	$( '#rightbound' ).val(upperchoice);

		}else{
			lowerchoice = sigFigs(lowerchoice, 3);
			upperchoice = sigFigs(upperchoice, 3);

		    $( '#leftbound' ).val(lowerchoice);
	    	$( '#rightbound' ).val(upperchoice);

	    	JSPState.lowerguess = lowerchoice;
	    	JSPState.upperguess = upperchoice;
	    }

    }

    // Only called when the slider is created.
	function updateLabels(){

		var label1 = farleft;
		var label2 = (3*farleft + farright) / 4;
		var label3 = (farleft + farright) / 2;
		var label4 = (farleft + 3*farright) / 4;
		var label5 = farright;

		if(JSPState.timeproblem){
			label1 = timeToHMS(label1);
			label2 = timeToHMS(label2);
			label3 = timeToHMS(label3);
			label4 = timeToHMS(label4);
			label5 = timeToHMS(label5);
		}else{
			label1 = sigFigs(label1, 2);
			label2 = sigFigs(label2, 2);
			label3 = sigFigs(label3, 2);
			label4 = sigFigs(label4, 2);
			label5 = sigFigs(label5, 2);
		}

		$('#location1').text(label1);
		$('#location2').text(label2);
		$('#location3').text(label3);
		$('#location4').text(label4);
		$('#location5').text(label5);
    }

	if($('#lefttypebox').is(':checked')){
		JSPState.lowerclosed = true;
	}else{
		JSPState.lowerclosed = false;
	}

	if($('#righttypebox').is(':checked')){
		JSPState.upperclosed = true;
	}else{
		JSPState.upperclosed = false;
	}

    updateDisplay();

});


// This wrapper function is necessary.
var guesser = (function() {

	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	var channel;

	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	if (window.parent !== window) {
		channel = Channel.build({
			window: window.parent,
			origin: "*",
			scope: "JSInput"
		});
		channel.bind("getGrade", getGrade);
		channel.bind("getState", getState);
		channel.bind("setState", setState);

	}

	// getState() and setState() are required by the problem type.
	function getState(){
		console.log('getting state');
		return JSON.stringify(JSPState);
	}

	function setState() {
		console.log('setting state');
		stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
		JSPState = JSON.parse(stateStr);

		putBackGuesses();
	}

	function getGrade() {
		console.log('getting grade');

		// Log the problem state.
		// This is called from the parent window's Javascript so that we can write to the official edX logs.
		parent.logThatThing(JSPState);

		// Return the whole problem state.
		return JSON.stringify(JSPState);
	}

	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	return {
		getState: getState,
		setState: setState,
		getGrade: getGrade
	};

}());
