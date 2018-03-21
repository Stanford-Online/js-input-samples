## Qualtrics Grader ###

### Current Status ####

Initial functionality is present.

Next goals:
* Can we get extra data out of this? Answer responses? Total # of pages?
* Better advice on survey settings.
* Can we get the survey to show results when students return?

### Overview ####
You want to grade Qualtrics surveys? Turns out to be surprisingly doable. Good for handing out participation points.

### Creating Your Own Qualtrics-Grading Problems ####

Here's how to adapt this example to create your own qualtrics-grading problems.

1. Grab python_lib.zip from the [HX-PY](https://github.com/Colin-Fredericks/hx-py) repo, and upload it (still compressed) into your Files & Uploads.
2. Download `qualtrics_grader.html` and `qualtrics_grader.js`, and put them in your Files & Uploads.
3. Download `qualtrics_grader.xml`, follow the instructions at the top of that file, and paste the result into a Blank Advanced Problem.
4. Create a Qualtrics survey along the [method described in the edX documentation](https://edx.readthedocs.io/projects/edx-partner-course-staff/en/latest/exercises_tools/qualtrics.html).
  * You will probably want it set up so that it accepts User IDs. You CANNOT pass the usual anonymized ID; you have to pass a different one. This is handled in the javascript for you, but you still need to set the "uid" that edx's documentation mentions.
  * Do not create an iframe to embed the survey; we've done that for you.
5. On the final page of that survey, include the javascript from the `qualtrics.js` file.
6. Profit!

### Customizing Your Qualtrics-Grading Problems ####

* By default, learners can only submit once. If you'd like to change that, set the problem component to "Show Reset Button" and "Randomize on Reset", and then mark "allowReset = true" in the javascript section of the problem XML.
* If you want to give partial credit for each page learners compete, add the code in `qualtrics.js` to *every* page of your survey, adjusting the `score` variable appropriately as you go.
* You may want to turn on the "Prevent Ballot Box Stuffing. Keep people from taking this survey more than once." setting for your survey.
* You can choose "Show Response Summary" if you want, but it's probably better to give a message that reminds people to hit "Submit" when they're done.
* Qualtrics can generate embeddable reports, though you might need to "View Classic Reports" to get one that works in an iframe.

#### Using Multiple Qualtrics-Grading Problems #####

Seems to work so far, but more testing is needed.

### Files: ####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `qualtrics_grader.js`: the javascript file that does the majority of the work. You should not need to change this.
- `qualtrics_grader.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `qualtrics_grader.xml`: the XML used to create the problem within Studio. You will need to make changes to this, but you only need to replace the prompt with your own.
- `qualtrics.js`: This is the js code to insert into each Qualtrics page.
