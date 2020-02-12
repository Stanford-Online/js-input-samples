// If the student comes to this problem for the first time,
// they start with a blank.
var hx_state = {
  answer: '',
  data: '{}'
};

var last_state = {};

// Need to use this to refer to original parent
// instead of dynamically finding parent within some functions.
var parent_doc = parent.document;

// Are we in an iframe?
function inFrame() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

// Returns true if the passed object is small enough, or the false if not.
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

// In order to record our data in edX's servers, we need to submit the problem.
function storeData() {
  console.log('Storing data');
  // Check for parent window.
  if (inFrame) {
    console.log('Problem state');
    console.log(hx_state);
    // Get the submit button for this problem. Luckily, this is the only problem in the iframe.
    let submit_button = parent_doc.querySelectorAll('button.submit')[0];
    // Click it.
    submit_button.click();
    return true;
  } else {
    return false;
  }
}

function hxSetData(key, input) {
  console.log('set ' + key + ' to ' + input);
  var obj = {};

  // Parse out the object and set the new info, then write it back.
  try {
    obj = JSON.parse(hx_state.data);
  } catch (err) {
    console.log(err);
    return null;
  }
  console.log('current parsed data:');
  console.log(obj);
  obj[key] = input;
  console.log('new parsed data:');
  console.log(obj);
  if (smallEnough(obj)) {
    hx_state.data = JSON.stringify(obj);
    console.log('stringified state');
    console.log(hx_state);
  } else {
    console.log('Object not stored.');
    return false;
  }
  // Store the info in edX.
  return storeData();
}

function hxClearData(key) {
  console.log('clear ' + key);
  // Parse out the object and remove the info, then write the object back.
  try {
    obj = JSON.parse(hx_state.data);
    delete hx_state.data[key];
    hx_state.data = JSON.stringify(obj);
  } catch (err) {
    console.log(err);
  }
  // Store the info in edX.
  return storeData();
}

function hxGetData(key) {
  console.log('get ' + key);
  try {
    obj = JSON.parse(hx_state.data);
    return obj[key];
  } catch (err) {
    console.log(err);
    return err;
  }
}

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
    // Are we in an iframe?
    if (inFrame()) {
      // If so, make functions available to the outer frame.
      parent.hxSetData = hxSetData;
      parent.hxClearData = hxClearData;
      parent.hxGetData = hxGetData;
    } else {
      console.log('Not running in an iframe.');
    }

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
      if (smallEnough(last_state)) {
        return JSON.stringify(last_state);
      } else {
        // If the last state is too big too, suspect foul play and revert completely.
        return JSON.stringify({ answer: '', data: '' });
      }
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
