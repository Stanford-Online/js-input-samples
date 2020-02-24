### Journaling Problem

#### Current Status

Working!

...almost. See #3 below.

#### Overview

This problem type collects a response, logs it, and marks the student correct if the answer is at least 10 characters.

If you set up an identical problem later in the course, you can have learners see what they typed in before.

#### Creating Your Own Text-Logging Problems

First, set up the [Learner Backpack](https://github.com/Stanford-Online/js-input-samples/tree/master/learner_backpack).

Then take the following steps:

1. Download jschannel.js, journaling.html and journaling.js, and put them in your Files & Uploads.
2. Download journaling.xml, edit the prompt as desired, and paste that into a Blank Advanced Problem.
3. Move the div with `class="hx-editor"` out of the problem and into a nearby HTML component. (Move the prompt with it.) No, I have no idea why you need to do this, but you do - the getGrade and getState functions do not fire otherwise. The presence of the [summernote editor](https://summernote.org/) within the same component seems to interfere with it somehow. I'm working on fixing that.
4. Profit!

##### Using Multiple Text-Logging Problems

You can create multiple journaling problems on the same page. You will need to give each one a different saveslot ("journaling" by default) in several locations:

- To keep your logs accurate, `Logger.log("harvardx.StudioAdv.journaling", ThatThing);`
- The div's data attribute, `data-saveslot="journaling"`
- The URL for the HTML page: `/static/journaling.html?saveslot=journaling` Note that you _only need to change the last item, the URL parameter._ You don't need to upload a different file each time you do this.

#### Files:

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `journaling.js`: the javascript file that does the majority of the work. You should not need to change this.
- `journaling.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `journaling.xml`: the XML used to create the problem within Studio. You will need to make changes to this, replacing the prompt with your own and extracting the editor div as mentioned in #3 above.
