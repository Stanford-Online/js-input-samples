// The "JSProblemState" JSON dictionary below is passed to the platform for grading and saving.
// Pass through whatever you wish. It will get logged.
var JSProblemState = {
	'uploadedRightThing': false
};


function processFile(file, outputArea, infoArea){

	JSProblemState.uploadedRightThing = true;

	// Give us the basics about the file.
	infoArea.append('<p>Filename: ' + file.name + '</p>');
	infoArea.append('<p>Type: ' + file.type + '</p>');
	infoArea.append('<p>Size: ' + file.size + ' bytes</p>');
	
	if(file.type.indexOf('image') > -1){
	
		// Display a small preview of the image. Using Data URI approach to load.

		var imageData = new FileReader();
		imageData.onload = function(event) {
			var dataUri = event.target.result,
				img = document.createElement('img');

			img.src = dataUri;
			outputArea.append(img);
		};

		imageData.onerror = function(event) {
			console.error('File could not be read! Code ' + event.target.error.code);
			JSProblemState.uploadedRightThing = false;
		};

		imageData.readAsDataURL(file);
		
		JSProblemState
	
	}else if(file.type.indexOf('text') > -1){
	
		// Show the full content as preformatted text.
	
		var textData = new FileReader();
		textData.onload = function(event) {
			var rawText = event.target.result;
			outputArea.append('<pre></pre>');
			$('pre:last-child').text(rawText).html();
		};

		textData.onerror = function(event) {
			console.error('File could not be read! Code ' + event.target.error.code);
			JSProblemState.uploadedRightThing = false;
		};

		textData.readAsText(file);
	
	}else{
		
		// This is not what we asked for.
		outputArea.append('<p>That is not an image or text file.');
		JSProblemState.uploadedRightThing = false;
	
	}

}

$(document).ready(function(){

	// Mixing jQuery and straight Javascript here. 
	// Would be nice to fix this up, but I'm not gonna rush to do it.
	var dropTarget = document.getElementById('dropspace');
	var dropIndicator = $('#drophere');
	var dropVerified = $('#dropped');
	var infoArea = $('#fileinfo');
	var outputArea = $('#output');


	// Give visual indication of where to drop the files.
	$(document).on('dragover', function(event) {
		event.preventDefault();
	});

	$(document).on('dragleave', function(event) {
		event.preventDefault();
	});


	// Take care of the file when it's dropped.
	dropTarget.addEventListener('drop', function(event) {

		// cancel default actions
		event.preventDefault();
		dropIndicator.hide();
		dropVerified.show().fadeOut(800);
		setTimeout(function() {
			dropIndicator.fadeIn(400);
		}, 1000 );
		

		var i = 0;
		var files = event.dataTransfer.files;
		var len = files.length;
		
		// Send each of the files to the file processor function.
		// We can accept multiple files, but only the last one counts.
		for (; i < len; i++) {
			processFile(files[i], outputArea, infoArea);
		}

	}, false);


	console.log('inner ready');

});




// This wrapper function is necessary.
var DropFile = (function() {

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
