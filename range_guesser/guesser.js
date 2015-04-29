// The "JSProblemState" JSON dictionary below is passed to the platform for grading and saving.
// Pass through whatever you wish. It will get logged.
var JSProblemState = {
	'upper': 1,
	'lower': -1,
	'upperclosed': true,
	'lowerclosed': true
};

$(document).ready(function(){

	// Read python-randomized items from the parent frame.
	// If this doesn't work, might need to delay it. :(
	var farleft = parseFloat(parent.$('#lowerlimit').text());
	var farright = parseFloat(parent.$('#upperlimit').text());
	var show_open_close = parent.$('#openclose').text();
	
	JSProblemState['lower'] = farleft;
	JSProblemState['upper'] = farright;
	console.log(JSProblemState);

	console.log('working');
	
	var leftstart = farleft + Math.random() * (farright - farleft) / 2
	var rightstart = farright - Math.random() * (farright - farleft) / 2
	var leftbound;
	var rightbound;
	var leftopen;
	var rightopen;
	
	if(show_open_close == 'true'){
		$('.for-numerical').remove();
	}
	
	$( '#rangeselector' ).slider({
		range: true,
		min: farleft,
		max: farright,
		step: (farright - farleft) / 1000,
		values: [ leftstart, rightstart ],
		slide: function(event, ui) {
			updateDisplay();
			$('#errors').text('');
		},
		create: function(event, ui){
			updateLabels();
		}
	});
	
	$('#leftbound').on('change', function(ui){
		rightbound = parseInt($('#rightbound').val());
		leftbound = parseInt(ui.target.value);
		if(leftbound <= rightbound){
			$('#rangeselector').slider('values', 0, ui.target.value);
			$('#errors').text('');
		}else{
			$('#rangeselector').slider('values', 0, rightbound - 1);
			$('#leftbound').val(rightbound - 1);
			$('#errors').text('Left bound too high - reset to ' + (rightbound - 1));
		}
	});
	
	$('#rightbound').on('change', function(ui){
		rightbound = parseInt(ui.target.value);
		leftbound = parseInt($('#leftbound').val());
		if(rightbound >= leftbound){
			$('#rangeselector').slider('values', 1, ui.target.value);
			$('#errors').text('');
		}else{
			$('#rangeselector').slider('values', 1, leftbound + 1);
			$('#rightbound').val(leftbound + 1);
			$('#errors').text('Right bound too low - reset to ' + (leftbound + 1));
		}
	});
	
    $('#lefttypebox').on('change', function(ui){
		leftopen = !leftopen;
		if(leftopen){
			$('.leftopenclose').text('Open');
		}else{
			$('.leftopenclose').text('Closed');
		}
	});
	
	$('#righttypebox').on('change', function(ui){
		rightopen = !rightopen;
		if(rightopen){
			$('.rightopenclose').text('Open');
		}else{
			$('.rightopenclose').text('Closed');
		}
	});
	
	
	function updateDisplay(){
		var lowerchoice = $( '#rangeselector' ).slider( 'values', 0 );
		var upperchoice = $( '#rangeselector' ).slider( 'values', 1 );
	    $( '#leftbound' ).val( sigFigs(lowerchoice, 3) );
    	$( '#rightbound' ).val( sigFigs(upperchoice, 3) );
    }
    
	function updateLabels(){
		
		var label1 = farleft;
		var label2 = (3*farleft + farright) / 4;
		var label3 = (farleft + farright) / 2;
		var label4 = (farleft + 3*farright) / 4;
		var label5 = farright;

		label1 = sigFigs(label1, 2)
		label2 = sigFigs(label2, 2)
		label3 = sigFigs(label3, 2)
		label4 = sigFigs(label4, 2)
		label5 = sigFigs(label5, 2)
		
		$('#location1').text(label1);
		$('#location2').text(label2);
		$('#location3').text(label3);
		$('#location4').text(label4);
		$('#location5').text(label5);
    }
    
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

	if($('#lefttypebox').is(':checked')){
		leftopen = false;
	}else{
		leftopen = true;
	}
	
	if($('#righttypebox').is(':checked')){
		rightopen = false;
	}else{
		rightopen = true;
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
		return JSON.stringify(JSProblemState);
	}

	function setState() {
		console.log('setting state');
		stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
		JSProblemState = JSON.parse(stateStr);
	}

	function getGrade() {
		console.log('getting grade');
		
		// Log the problem state. 
		// This is called from the parent window's Javascript so that we can write to the official edX logs. 
		parent.logThatThing(JSProblemState);

		// Return the whole problem state.
		return JSON.stringify(JSProblemState);
	}
	
	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	return {
		getState: getState,
		setState: setState,
		getGrade: getGrade
	};

}());