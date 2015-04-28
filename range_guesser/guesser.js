$(document).ready(function(){

	console.log('working');
	
	var farleft = 1/3;
	var farright = 2/3;
	var leftstart = farleft + Math.random() * (farright - farleft) / 2
	var rightstart = farright - Math.random() * (farright - farleft) / 2
	var leftbound;
	var rightbound;
	var leftopen;
	var rightopen;
	
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
		console.log(leftbound, rightbound);
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
		console.log(leftbound, rightbound);
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
	    $( '#leftbound' ).val( $( '#rangeselector' ).slider( 'values', 0 ) );
    	$( '#rightbound' ).val( $( '#rangeselector' ).slider( 'values', 1 ) );
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
	
	console.log('Left bound open: ' + leftopen + ', Right bound open: ' + rightopen);
	
	
	
    updateDisplay();


});