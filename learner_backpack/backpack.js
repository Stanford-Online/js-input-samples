// If the student comes to this problem for the first time,
// they start with a blank.
var hx_state = {
  answer: '',
  data: ''
};

var last_state = {};

// Insert nice functions for working with the state data.
// Also make those available to any parent window, if we're iframed.

// This wrapper function is necessary.
// You can rename it if you want, just make sure the attributes
// in your <jsinput> tag match the function name here.
var backpack = (function() {
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

  // Returns current state if it's small enough, or the original if not.
  function smallEnough(ob) {
    // Gives us a rough idea of the memory size for the state.
    // Assuming 2 bytes per character, storing no more than 50,000 characters.
    let size = JSON.stringify(ob).length * 2;
    if (size < 100000) {
      console.log('Current size: ~' + size + ' bytes.');
      return true;
    } else {
      console.log('Data too large: ' + size + ' bytes. Changes rejected.');
      return false;
    }
  }

  // Called by edX to obtain the current learner state for this problem.
  function getState() {
    console.log('getting state');
    // Get whether the learner agreed.
    hx_state.answer = document.getElementById('agree').checked;
    // The data string gets URI-decoded later, so percents need to be escaped.
    hx_state.data = hx_state.data.replace(/%/g, '%25');
    // Give edX our state as a string.
    return JSON.stringify(hx_state);
  }

  // Called by edX to set the live learner state to what's recorded on the server.
  function setState() {
    console.log('setting state');
    // Make sure we're getting the right thing from edX.
    state_string = arguments.length === 1 ? arguments[0] : arguments[1];
    // edX stores the state as stringified JSON. Parse it.
    hx_state = JSON.parse(state_string);
    // Keep the old one so we can discard changes if we need to.
    last_state = hx_state;
    // Set the live state appropriately.
    let box = document.getElementById('agree');
    if (hx_state.answer === true) {
      box.checked = true;
      document.getElementById('checkboxlabel').textContent = 'Thank you.';
    }
  }

  // Called by edX when the learner submits the problem.
  function getGrade() {
    console.log('getting grade');
    // Get what the learner typed.
    hx_state.answer = document.getElementById('agree').checked;
    // This calls the logging code from the XML file.
    parent.logThatThing(hx_state);
    // The answer string gets URI-decoded later, so percents need to be escaped.
    hx_state.data = hx_state.data.replace(/%/g, '%25');
    // Check the size of the state before we send it to edx.
    // Then send the problem state to be graded.
    if (smallEnough(hx_state)) {
      return JSON.stringify(hx_state);
    } else {
      return JSON.stringify(last_state);
    }
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
console.log('data store ready');
