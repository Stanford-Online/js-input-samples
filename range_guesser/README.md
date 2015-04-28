### Range Guesser ###

#### Current Status ####

Starting with UI, which is mostly there. Going to add the grade and state functions soon, then the python code, then testing.

#### Overview ####
Move the sliders to guess a number (or an interval, depending on how the problem is set up). Partial credit is given depending on how accurate your guess is.

This problem should be accessible to blind and partially sighted users who are employing a screen reader.

Student state is recorded via Logger.log() when a grade is calculated, but not at other times.

#### Creating Your Own Number-Guessing Problems ####

Here's how to adapt this example to create your own guessing problems.

1. Choose a target number and decide how close students will have to get.
2. Put that into the Python part of the problem where indicated. It should be really easy to do this problem with randomized values.
3. Profit!

##### Using Multiple Guessing Problems #####

It looks like having two of these on one page will actually work properly these days, but test before deploying. You know, *just like everything else in your course.*

#### Files: ####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `jquery.ui.touch-punch.min.js`: [Touch Punch](https://github.com/furf/jquery-ui-touch-punch), an awesome JQuery extension that maps touch events into mouse events. Used for mobile compatibility. Should not need to alter.
- `Guessing.js`: the javascript file that does the majority of the work and allows you to drag items around and stuff. You should not need to change this.
- `Guessing.css`: the css file that makes things look pretty (or as close as I could get them). You should not need to change this.
- `Guessing.html`: the HTML file that will be iframed into the page. You should not need to change this unless you have more than one matching problem in your course.
- `Guessing.xml`: the XML used to create the problem within Studio. You will need to make changes to this: updating `right\_answer` to be the actual right answer you want, and filling it with your own instruction text. You can also turn partial credit and feedback off if you prefer; just set them to False.

When creating your own matching problem, you will upload almost every file in this directory to the Files and Uploads section. There are two exceptions: the XML file (which you cut-and-paste into Studio) and the image files (which you replace with your own).
