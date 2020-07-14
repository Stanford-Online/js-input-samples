// If the student comes to this problem for the first time,
// they start with a blank.
var JSProblemState = {
  answer: '',
  saveslot: '',
  length: 0,
};

// Save slot is passed as a URL parameter.
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}
JSProblemState.saveslot = getUrlVars().saveslot;

// This wrapper function is necessary.
// You can rename it if you want, just make sure the attributes
// in your <jsinput> tag match the function name here.
var journaling = (function () {
  // REQUIRED --- DO NOT REMOVE/CHANGE!!
  var channel;

  // REQUIRED --- DO NOT REMOVE/CHANGE!!
  // Channel.js sets up a way for the problem to pass information back to edX.
  if (window.parent !== window) {
    channel = Channel.build({
      window: window.parent,
      origin: '*',
      scope: 'JSInput',
    });
    channel.bind('getGrade', getGrade);
    channel.bind('getState', getState);
    channel.bind('setState', setState);
  }

  function getStateData() {
    // Use what the learner typed, not what's in the save buffer.
    // Include markup and everything.
    let markup_string = parent.HXED.getMarkupFrom(JSProblemState.saveslot);
    // Also set length equal to number of characters typed.
    // Ignore markup for this.
    let len = parent.$(markup_string).text().length;
    let save_slot = JSProblemState.saveslot;
    // Note we have to URI-encode the answer.
    return {
      answer: markup_string.replace(/%/g, '%25'),
      saveslot: save_slot,
      length: len,
    };
  }

  // Called by edX to obtain the current learner state for this problem.
  function getState() {
    console.log('getting state');
    // Get the current state data.
    JSProblemState = getStateData();
    console.log(JSProblemState);
    // Save the current buffer. Note the URI decoding.
    parent.hxSetData(
      'summernote_' + JSProblemState.saveslot,
      JSProblemState.answer.replace(/%25/g, '%')
    );
    // Give edX our state as a string.
    console.log(JSProblemState);
    return JSON.stringify(JSProblemState);
  }

  // Called by edX to set the live learner state to what's recorded on the server.
  function setState() {
    console.log('setting state');
    // Make sure we're getting the right thing from edX.
    stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
    // edX stores the state as stringified JSON. Parse it.
    JSProblemState = JSON.parse(stateStr);
    console.log(JSProblemState);
    // The editor will automatically pull the last stored text.
    // No need to repeat that functionality here.
    // (What if the stored state doesn't match the backpack's data?)
  }

  // Called by edX when the learner submits the problem.
  function getGrade() {
    console.log('getting grade');
    // Get the current state data.
    JSProblemState = getStateData();
    console.log(JSProblemState);
    // This calls the logging code from the XML file.
    parent.logThatThing(JSProblemState);
    // Send the problem state to be graded.
    return JSON.stringify(JSProblemState);
  }

  // REQUIRED --- DO NOT REMOVE/CHANGE!!
  // These make the above functions public so that edX can call them.
  return {
    getState: getState,
    setState: setState,
    getGrade: getGrade,
  };
})();

// Just letting us know that the iframe is working.
console.log('inner ready');
