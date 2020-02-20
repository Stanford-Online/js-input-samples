// If the student comes to this problem for the first time,
// they start with a blank.
var JSProblemState = {
  answer: ''
};

// Pull in functions from the editor code

var hxSetData = parent.hxSetData;
var hxGetData = parent.hxGetData;

// This wrapper function is necessary.
// You can rename it if you want, just make sure the attributes
// in your <jsinput> tag match the function name here.
var journaling = (function() {
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
    // Save the current buffer.
    let saveslot = parent.saveslot;
    let markup_string = parent.document
      .find('[data-saveslot="' + saveslot + '"]')
      .summernote('code');
    hxSetData('summernote_' + saveslot, markup_string);
    // Get what the learner typed.
    JSProblemState.answer = hxGetData('summernote_' + saveslot);
    // Give edX our state as a string.
    return JSON.stringify(JSProblemState);
  }

  // Called by edX to set the live learner state to what's recorded on the server.
  function setState() {
    console.log('setting state');
    // Reactivate the summernote editor. Problem reset wipes it out.
    parent.HXEditor.activateEditor(saveslot);
    // Make sure we're getting the right thing from edX.
    stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
    // edX stores the state as stringified JSON. Parse it.
    JSProblemState = JSON.parse(stateStr);
    // What if the stored state doesn't match the backpack's data? Give choice.
    if (
      !parent._.isEqual(
        hxGetData('summernote_' + saveslot),
        JSProblemState.answer
      )
    ) {
      if (
        confirm(
          `It looks like you updated your journal somewhere else.
          Press OK to use it, or Cancel to use your old answer to this problem.`
        )
      ) {
        JSProblemState.answer = hxGetData('summernote_' + saveslot);
      } else {
        hxSetData('summernote_' + saveslot, JSProblemState.answer);
      }
    }
  }

  // Called by edX when the learner submits the problem.
  function getGrade() {
    console.log('getting grade');
    // Get what the learner typed.
    JSProblemState.answer = document.getElementById('answer').value;
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
    getGrade: getGrade
  };
})();

// Just letting us know that the iframe is working.
console.log('inner ready');
