var JSProblemState = {
	'score': 0,
	'survey_url': 'unknown'
};

$(document).ready(function(){

	console.log('inner ready');

	// Give the iframe an appropriate title attribute.
	parent.$('iframe[name=' + window.name + ']').attr('title', 'Embedded Survey');

	var anonID = false
  // Making sure the analytics functions are ready. Usually very quick.
  var waitForAnalytics = setInterval(function(){
    if(parent.analytics._user.anonymousId() && parent.qualtricsSurveySource){
      clearInterval(waitForAnalytics);

      anonID = parent.analytics._user.anonymousId();
      console.log('Anonymous ID: ' + anonID);
      parent.qualtricsSurveySource = parent.qualtricsSurveySource + '?uid=' + anonID;

			// Set the survey URL from the parent page, including student ID.
			// We're doing this to make it easier to set all the options in the XML,
			// instead of having to have a separate .html page for every question.
			$(parent.document).find('#QualtricsSurvey').attr('src', parent.qualtrics_survey_source);
			JSProblemState.survey_url = parent.qualtrics_survey_source;
			console.log('survey source set');

    }
  }, 250);

	// Listen for the end-of-survey event.
	function hearQualtricsSurveyEnd(e) {
		console.log('Received message')
		// Only accept from Qualtrics.
		if (e.origin !== 'https://harvard.az1.qualtrics.com'){
			console.log('Origin wrong, aborting.');
			return;
		}

		// Only accept objects with the right form.
		if (typeof e.data == 'string') {
			console.log('Returned string instead of object, aborting.');
			return;
		} else {
			console.log('Message: ' + e.data.text);
			console.log('Source: ' + e.data.source);
			console.log('Complete? ' + e.data.complete);
			if(e.data.complete === 'yes' && e.data.source === 'HX_Qualtrics_Survey'){
				JSProblemState.score = 1;
			}
		}
	}

	addEventListener('done_message', hearQualtricsSurveyEnd, false);

});


// This wrapper function is necessary.
var qualtrics_grader = (function() {

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
