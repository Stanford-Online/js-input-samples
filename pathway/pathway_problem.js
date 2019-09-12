var JSProblemState = {
  currently_open: [],
  last_open: [],
  ever_opened: []
};
var disableStateUpdates = false;

console.log('inner ready');

// hx-js handles all the hide/show stuff for us.
// Copying a few things from it below.

// Takes in an array of classes, as from a className function.
// Returns the number or name attached to the important class.
function getClassLabel(className, importantClass) {
  let allClasses = className.split(/\s+/);
  for (let i = 0; i < allClasses.length; i++) {
    if (allClasses[i].indexOf(importantClass) === 0) {
      return allClasses[i].slice(importantClass.length);
    }
  }
  return -1;
}

// Make sure all the boxes that were open last time are open now.
function putEmBack() {
  // console.log('putting them back');
  // Make sure hx-js has assigned listeners. We need those.
  let waitForToggles = setInterval(function() {
    // console.log('checking for listeners');
    if (window.parent.hxGlobalOptions) {
      clearInterval(waitForToggles);
      // console.log('found them');
      // Just click their buttons. Only click the first one we find.
      JSProblemState.currently_open.forEach(function(n) {
        if (
          window.parent.window.$('.hx-toggletarget' + n).css('display') ===
          'none'
        ) {
          console.log('element ' + n + ' is hidden. Clicking.');
          disableStateUpdates = true;
          window.parent.window.$('.hx-togglebutton' + n)[0].click();
          disableStateUpdates = false;
        }
      });
    }
  }, 250);
}

// Keep the Problem State up to date.
window.parent.window
  .$('[class^="hx-togglebutton"]')
  .on('click tap', function() {
    if (disableStateUpdates) {
      // console.log('state updates temporarily disabled');
    } else {
      // console.log('state updates aok');
      JSProblemState.last_open = Array.from(JSProblemState.currently_open);

      let myLabel = getClassLabel(this.className, 'hx-togglebutton');

      // Every time we open a box, add it to currently_open.
      if (JSProblemState.currently_open.indexOf(myLabel) === -1) {
        JSProblemState.currently_open.push(myLabel);
      } else {
        // Every time we close a box, remove it from currently_open.
        JSProblemState.currently_open.splice(
          JSProblemState.currently_open.indexOf(myLabel),
          1
        );
        // If we close a box that would leave orphan boxes, close those too.
        let dontClickAgain = [];
        window.parent.window
          .$('.hx-toggletarget' + myLabel)
          .find('button')
          .each(function(i, b) {
            console.log(b);
            if (b.attributes['aria-expanded'].value === 'true') {
              // Only click a button for each orphan box once.
              if (dontClickAgain.indexOf(myLabel) === -1) {
                // Don't re-click a button we just clicked.
                if (myLabel !== getClassLabel(b.className, 'hx-togglebutton')) {
                  console.log('Orphan element: ' + b.className);
                  dontClickAgain.push(myLabel);
                  b.click();
                }
              }
            }
          });
      }

      // Every time we open a box, add it to ever_opened.
      if (JSProblemState.ever_opened.indexOf(myLabel) === -1) {
        JSProblemState.ever_opened.push(myLabel);
      }

      console.log(JSProblemState);
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
    console.log(JSProblemState);
    putEmBack();
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
