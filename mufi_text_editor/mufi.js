var mufi = (function() {
  // REQUIRED --- DO NOT REMOVE/CHANGE!!
  var state = {
          'answer': ''
      },
      channel;

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

  function init() {
    $('li.specialButton').mousedown(function () {
        $(this).toggleClass('active');
        $('.sr .toggle-open', this).toggle();
        $('#specialCharTable').toggle();
        return false;
    });

    $('li.styleButton').mousedown(function () {
        var command = $(this).data('command');
        var argument = $(this).data('argument');
        document.execCommand(command, false, argument);
        return false;
    });

    $('.charWrapper .char').hover(function () {
        var selectedChar = $(this).html();
        var selectedCharTitle = $(this).attr('title') || '';
        $('.charZoom').html(selectedChar);
        $('.charZoomTitle').text(selectedCharTitle);
    });

    $('.charWrapper .char').mousedown(function () {
        var textToInsert = $(this).html();
        document.execCommand('insertHTML', false, textToInsert);
        return false;
    });
  }
  init();

  // Called by edX to obtain the current learner state for this problem.
  function getState() {
    state.answer = document.getElementById('answer').innerHTML;
    return JSON.stringify(state);
  }

  // Called by edX to set the live learner state to what's recorded on the server.
  function setState() {
    stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
    state = JSON.parse(stateStr);
    document.getElementById('answer').innerHTML = state.answer;
  }

  // Called by edX when the learner submits the problem.
  function getGrade() {
    state.answer = document.getElementById('answer').innerHTML;
    return JSON.stringify(state);
  }

  // REQUIRED --- DO NOT REMOVE/CHANGE!!
  // These make the above functions public so that edX can call them.
  return {
    getState: getState,
    setState: setState,
    getGrade: getGrade
  };
})();
