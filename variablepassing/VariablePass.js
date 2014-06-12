// Thank you to the Stanford OpenEdX program
// for their initial exploration of how these problems work.

// This script still has a lot of debugging code in it, like console.log() functions.
// Feel free to ditch those when you're done.

// The "JSProblemState" JSON dictionary below is passed to the platform for grading and saving.
// Pass through whatever you wish. It will get logged.
var JSProblemState = {
	'answerGiven': false,
	'variable1': 0,
	'isCorrect': false
};

// This wrapper function is necessary.
var VariablePass = (function() {

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

	// Right now getGrade() both calculates whether the student is correct and returns the problem state.
	// The down side is that anyone who uses "view source" can see how it works.
	// To keep students from seeing the solution that way, just pass the problem state back
	// and use python in the problem XML to analyze it.
	
	function getGrade() {
		console.log('getting grade');
		
		// Read the answer from the text area
		JSProblemState['answerGiven'] = $('#studentanswer').val();
		
		// Right now we're just checking to see if you can square something.
		// In practical use, you should check correctness within the problem's Python, not here.
		var input = parseInt(JSProblemState['variable1'], 10);
		var studentAnswer = parseInt(JSProblemState['answerGiven'], 10);
		if(studentAnswer == input*input){
			JSProblemState['isCorrect'] = true;
		}
		
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

$(document).ready(function(){

	// Takes a bit to get randomized stuff on the page sometimes, so don't rush to read it.
	// Not 100% sure this is necessary, but I've seen '$variable' briefly on some pages before.
	setTimeout(function(){
		var foo = parent.$('#variable1').text();	// This is the bit that reads things from the parent frame.
		JSProblemState['variable1'] = parseInt(foo, 10);
		console.log('randomized value: ' + foo);
	}, 100);

	console.log('inner ready');

});