Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
  // This object will be sent to the JSInput problem.
  // Feel free to customize, but make sure the 'source' here matches the
  // source that your JSInput problem is looking for.
	done_message = {
		text: "Insert any message you want here.",
		source: "HX_Qualtrics_Survey",
		complete: "yes"
	}

  // If you will never run your course on Edge,
  // you can safely remove the first line.
	window.parent.postMessage(done_message, "https://edge.edx.org");
	window.parent.postMessage(done_message, "https://courses.edx.org");

  // Can remove.
	console.log('Qualtrics sent message');

});