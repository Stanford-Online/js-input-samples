// If the student comes to this problem for the first time,
// they start with a blank.
var JSProblemState = {
  answer: ''
};

// This is where we'd normally put extra code to do fancy things,
// like handling user input or resetting a complex interactive
// back to its original state. However, this problem type is
// so simple we don't need it.

// This wrapper function is necessary.
// You can rename it if you want, just make sure the attributes
// in your <jsinput> tag match the function name here.
var textlog = (function() {
  // REQUIRED --- DO NOT REMOVE/CHANGE!!
  var channel;

  // REQUIRED --- DO NOT REMOVE/CHANGE!!
  // Channel.js sets up a way for the problem to pass information back to edX.
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

  // Called by edX to obtain the current learner state for this problem.
  function getState() {
    console.log('getting state');
    // Get what the learner typed.
    JSProblemState.answer = document.getElementById('answer').value;
    // This string gets URI-decoded later, so percents need to be escaped.
    JSProblemState.answer = JSProblemState.answer.replace(/%/g, '%25');
    // Give edX our state as a string.
    return JSON.stringify(JSProblemState);
  }

  // Called by edX to set the live learner state to what's recorded on the server.
  function setState() {
    console.log('setting state');
    // Make sure we're getting the right thing from edX.
    stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
    // edX stores the state as stringified JSON. Parse it.
    JSProblemState = JSON.parse(stateStr);
    // Set the live state to the stored state (the learner's previous answer).
    document.getElementById('answer').value = JSProblemState.answer;
  }

  // Called by edX when the learner submits the problem.
  function getGrade() {
    console.log('getting grade');
    // Get what the learner typed.
    JSProblemState.answer = document.getElementById('answer').value;
    // This calls the logging code from the XML file.
    parent.logThatThing(JSProblemState);
    // The answer string gets URI-decoded later, so percents need to be escaped.
    JSProblemState.answer = JSProblemState.answer.replace(/%/g, '%25');
    // Send the problem state to be graded.
    return JSON.stringify(JSProblemState);
  }

  // REQUIRED --- DO NOT REMOVE/CHANGE!!
  // These make the above functions public so that edX can call them.
  return {
    getState: getState,
    setState: setState,
    getGrade: getGrade
  };
})();

// Just letting us know that the iframe is working.
console.log('inner ready');
