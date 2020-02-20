### Journaling Problem

#### Current Status

First commit

#### Overview

This problem type collects a response, logs it, and marks the student correct if the answer is at least 10 characters.

If you set up an identical problem later in the course, you can have learners see what they typed in before.

#### Creating Your Own Text-Logging Problems

First, set up the Learner Backpack.

Then take the following steps:

1. Grab python_lib.zip from the [HX-PY](https://github.com/Colin-Fredericks/hx-py) repo, and upload it (still compressed) into your Files & Uploads.
2. Download jschannel.js, journaling.html and journaling.js, and put them in your Files & Uploads.
3. Download journaling_with_pythonlib.xml, edit the prompt as desired, and paste that into a Blank Advanced Problem.
4. Profit!

##### Using Multiple Text-Logging Problems

You can create multiple journaling problems on the same page. You will need to give each one a different saveslot variable ("journaling" by default) and a different ID ("editor1" by default)

#### Files:

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `journaling.js`: the javascript file that does the majority of the work. You should not need to change this.
- `journaling.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `journaling.xml`: the XML used to create the problem within Studio. You will need to make changes to this, but you only need to replace the prompt with your own.
