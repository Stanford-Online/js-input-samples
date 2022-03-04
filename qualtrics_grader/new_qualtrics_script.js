Qualtrics.SurveyEngine.addOnload(function() {
  /*Place your JavaScript here to run when the page loads*/
  if (typeof window.hxScores === 'undefined') {
    window.hxScores = {
      'problems_answered': {},
      'max_score': 1
    };
  } else {
    window.hxScores.max_score += 1;
  }

});

Qualtrics.SurveyEngine.addOnReady(function() {
  /*Place your JavaScript here to run when the page is fully displayed*/
  this.questionclick = function(event, element) {
    container = jQuery(element).closest('.QuestionOuter');
    window.hxScores.problems_answered[container[0].id] = true;
    let raw_score = Object.keys(window.hxScores.problems_answered).length;
    let score_text = String(Math.round(raw_score / window.hxScores.max_score * 100));

    // This object will be sent to the JSInput problem.
    // Feel free to customize, but make sure the 'source' here matches the
    // source that your JSInput problem is looking for.

    message = {
      text: "Survey Complete",
      source: "HX_Qualtrics_Survey",
      score: score_text // Score is percentage out of 100%.
    };

    // If you will never run your course on Edge,
    // you can safely remove the first line.
    window.parent.postMessage(message, "https://edge.edx.org");
    window.parent.postMessage(message, "https://courses.edx.org");
    window.parent.postMessage(message, "https://learning.edx.org");
    window.parent.postMessage(message, "https://preview.courses.edx.org");

    // Can remove.
    console.log('Qualtrics sent message: "' + message.text + '" with score ' + score_text);
  };
});

Qualtrics.SurveyEngine.addOnUnload(function() {
  /*Place your JavaScript here to run when the page is unloaded*/

});
