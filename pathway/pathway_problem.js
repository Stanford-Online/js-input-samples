var JSProblemState = {
  currently_open: [],
  last_open: [],
  ever_opened: []
};

console.log('inner ready');

// hx-js handles all the hide/show stuff for us.
// Copying a few things from it below.

// Takes in an array of classes, as from a className function.
// Returns the number or name attached to the important class.
function getClassNumber(className, importantClass) {
  let allClasses = className.split(/\s+/);
  for (let i = 0; i < allClasses.length; i++) {
    if (allClasses[i].indexOf(importantClass) === 0) {
      return allClasses[i].slice(importantClass.length);
    }
  }
  return -1;
}

// Keep the Problem State up to date.
parent.window.find('[class^="hx-togglebutton"').on('click tap', function() {
  JSProblemState.last_open = Array.from(JSProblemState.currently_open);

  let myNumber = getClassNumber(this.className, 'hx-togglebutton');

  // Every time we open a box, add it to ever_opened and currently_open.
  if (JSProblemState.currently_open.indexOf(myNumber) === -1) {
    JSProblemState.currently_open.push(myNumber);
  }

  // Every time we close a box, remove it from currently_open.
  if (JSProblemState.ever_open.indexOf(myNumber) === -1) {
    JSProblemState.ever_open.push(myNumber);
  } else {
    JSProblemState.ever_open.splice(
      JSProblemState.ever_open.indexOf(myNumber),
      1
    );
  }
});

// This wrapper function is necessary.
var pathway_problem = (function() {
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
  function getState() {
    console.log('getting state');
    return JSON.stringify(JSProblemState);
  }

  function setState() {
    console.log('setting state');
    stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
    JSProblemState = JSON.parse(stateStr);
    // Open all the boxes that were open last time.
    // Just click them, honestly.
    // This is probably wrong code. Fix it next time.
    parent.window.find('[class^="hx-togglebutton"').each(function(e){
      if(JSProblemState.currently_open.indexOf(getClassNumber(e.classes)) !== -1){
        e.click();
      }
    });
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
})();
