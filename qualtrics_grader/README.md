### Qualtrics Grader ###

#### Current Status ####

Working on initial build.

#### Overview ####
You want to grade Qualtrics surveys? Turns out to be surprisingly doable.

Not sure whether we can get any information beyond "done with this page", but we'll find out.

#### Creating Your Own Qualtrics-Grading Problems ####

Here's how to adapt this example to create your own qualtrics-grading problems.

1. Grab python_lib.zip from the [HX-PY](https://github.com/Colin-Fredericks/hx-py) repo, and upload it (still compressed) into your Files & Uploads.
2. Download `qualtrics_grader.html` and `qualtrics_grader.js`, and put them in your Files & Uploads.
3. Download `qualtrics_grader.xml`, follow the instructions at the top of that file, and paste the result into a Blank Advanced Problem.
4. Create a Qualtrics survey along the [method described in the edX documentation](https://edx.readthedocs.io/projects/edx-partner-course-staff/en/latest/exercises_tools/qualtrics.html). You will probably want it set up so that it accepts User IDs. Do not create an iframe to embed the survey; we've done that for you.
5. On the final page of that survey, include the javascript from the `qualtrics.js` file. If you want to give partial credit for each page learners compete, add that code to *every* page of your survey.
4. Profit!

##### Using Multiple Qualtrics-Grading Problems #####

Haven't tested this yet, not sure.

#### Files: ####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `qualtrics_grader.js`: the javascript file that does the majority of the work. You should not need to change this.
- `qualtrics_grader.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `qualtrics_grader.xml`: the XML used to create the problem within Studio. You will need to make changes to this, but you only need to replace the prompt with your own.
