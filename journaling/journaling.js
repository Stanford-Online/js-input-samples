// If the student comes to this problem for the first time,
// they start with a blank.
var JSProblemState = {
  answer: '',
  saveslot: '',
  length: ''
};

// Pull in functions from the editor code
var hxSetData = parent.hxSetData;
var hxGetData = parent.hxGetData;

// Save slot is passed as a URL parameter.
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
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
    // Get what the learner typed.
    let markup_string = parent.window
      .$('[data-saveslot="' + JSProblemState.saveslot + '"] .summernote')
      .summernote('code');
    console.log(markup_string);
    let len = parent.$(markup_string).text().length;
    // Save the current buffer.
    hxSetData('summernote_' + JSProblemState.saveslot, markup_string);
    // Give edX our state as a string.
    JSProblemState.answer = markup_string;
    JSProblemState.length = len;
    console.log(JSProblemState);
    return JSON.stringify(JSProblemState);
  }

  // Called by edX to set the live learner state to what's recorded on the server.
  function setState() {
    console.log('setting state');
    // Reactivate the summernote editor. Problem reset wipes it out.
    parent.HXED.activateEditor(JSProblemState.saveslot);
    console.log('breakpoint 1');
    // Make sure we're getting the right thing from edX.
    stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
    console.log('breakpoint 2');
    // edX stores the state as stringified JSON. Parse it.
    console.log(stateStr);
    JSProblemState = JSON.parse(stateStr);
    console.log('breakpoint 3');
    // What if the stored state doesn't match the backpack's data? Give choice.
    if (
      !parent._.isEqual(
        hxGetData('summernote_' + JSProblemState.saveslot),
        JSProblemState.answer
      )
    ) {
      console.log('breakpoint 4');
      if (
        confirm(
          `It looks like you updated your journal somewhere else.
          Press OK to use it, or Cancel to use your old answer to this problem.`
        )
      ) {
        JSProblemState.answer = hxGetData(
          'summernote_' + JSProblemState.saveslot
        );
      } else {
        hxSetData(
          'summernote_' + JSProblemState.saveslot,
          JSProblemState.answer
        );
        let markup_string = parent.window
          .$('[data-saveslot="' + JSProblemState.saveslot + '"] .summernote')
          .summernote('code', JSProblemState.answer);
      }
    }
  }

  // Called by edX when the learner submits the problem.
  function getGrade() {
    console.log('getting grade');
    // Get what the learner typed.
    let markup_string = parent
      .$('[data-saveslot="' + JSProblemState.saveslot + '"] .summernote')
      .summernote('code');
    JSProblemState.answer = markup_string;
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
console.log('inner ready: journaling assignment');
