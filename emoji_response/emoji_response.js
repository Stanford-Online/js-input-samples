var JSProblemState = {
    'selected': 'No response selected'
};


console.log('inner ready');

// If someone clicks a radio button, put its value into the state.
let formbits = document.forms.emojibox.elements;
Array.from(formbits).forEach(function(e){
    e.addEventListener('change', function(){
        console.log(e.value);
        JSProblemState.selected = e.value;
        // Goal for later: make the problem submit itself when you select.
    });
});


// This wrapper function is necessary.
var emoji_response = (function() {

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
        // Set the radio button
        let barevalue = JSProblemState.selected.split(' ').slice(0, -1).join('_');
        let theID = barevalue.replace(/ /g,'_');
        let radiobutton = document.getElementById(theID);
        radiobutton.checked = true;
    }

    function getGrade() {
        console.log('getting grade');
        JSProblemState.survey_complete = true;
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
