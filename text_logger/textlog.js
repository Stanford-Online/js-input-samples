var JSProblemState = {
	'answer': ''
};


// This wrapper function is necessary.
var textlog = (function() {

	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	var channel;
	
	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	if (window.parent !== window) {
		channel = Channel.build({
			window: window.parent,
			origin: '*',
			scope: 'JSInput'
		});
		channel.bind('getGrade', getGrade);
		channel.bind('getState', getState);
		channel.bind('setState', setState);
	}
	
	
	function getState(){
	    console.log('getting state');
        JSProblemState['answer'] = document.getElementById('answer').value;
		return JSON.stringify(JSProblemState);
	}

	function setState() {
	    console.log('setting state');
		stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
		JSProblemState = JSON.parse(stateStr);
	    document.getElementById('answer').value = JSProblemState['answer'];
	}

	function getGrade() {
	    console.log('getting grade');
        JSProblemState['answer'] = document.getElementById('answer').value;
		parent.logThatThing(JSProblemState);
		return JSON.stringify(JSProblemState);
	}
	

	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	return {
		getState: getState,
		setState: setState,
		getGrade: getGrade
	};

}());

console.log('inner ready');
