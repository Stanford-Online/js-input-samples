### Adaptive Multiple Choice ###

#### Notes ####
This problem type was created as a student project by David Sall at Harvard. Basic functionality is there, but it's still under construction.

**Known Issues and Upcoming Features:**

* The slide animation doesn't work very well for the MC questions. Not sure what's going on yet.
* Improve accessibility for screen readers.
* Default explanatory text.

#### Overview ####

coming

Student state is recorded via Logger.log() when a grade is calculated, but not at other times. This state includes the history of the student's most recent travel through the learning objects.

#### Creating Your Own Adaptive Problems ####

coming

##### Using Multiple Adaptive Problems #####

coming

#### Files: ####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `jquery.ui.touch-punch.min.js`: [Touch Punch](https://github.com/furf/jquery-ui-touch-punch), an awesome JQuery extension that maps touch events into mouse events. Used for mobile compatibility. Should not need to alter.
- `adaptive-example.js`: this contains an example adaptive problem. The "object" array has several examples of problems, text, video, and images that you can adapt to create your own problem.
- `adaptiveExample.pdf`: this is a visual map of the problem created in the adaptive-example.js file.
- `adaptive-mc.css`: the css file that makes things look pretty (or as close as I could get them). You should not need to change this.
- `adaptive-mc.html`: the HTML file that will be iframed into the page. You will need to change this if you have more than one adaptive problem in your course.
- `adaptive-mc.xml`: the XML used to create the problem within Studio. You will need to make changes to this: updating `if answer == 7:` to be the actual final step you want to grade as correct, and filling it with your own instruction text.
- `adaptive-mc.js`: the javascript file that does the majority of the work. You should not need to change this.

