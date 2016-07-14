// The "HXVideoWatch" JSON dictionary is passed to the platform for grading and saving.
// It gets logged.
// It is defined in another file, videowatch_helper.js, and not in this file.
// That file is loaded in the parent frame.

// This wrapper function is necessary.
var videowatch = (function() {

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
		return JSON.stringify(parent.HXVideoWatch);
	}

	function setState() {
		console.log('setting state');
		stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
		parent.HXVideoWatch = JSON.parse(stateStr);
	}

	function getGrade() {
		console.log('getting grade');
		
		// Log the problem state. 
		// This is called from the parent window's Javascript so that we can write to the official edX logs. 
		parent.logThatThing(parent.HXVideoWatch);

		// Return the whole problem state.
		return JSON.stringify(parent.HXVideoWatch);
	}
	
	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	return {
		getState: getState,
		setState: setState,
		getGrade: getGrade
	};

}());