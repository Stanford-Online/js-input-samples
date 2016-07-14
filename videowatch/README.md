### Range Guesser ###

#### Current Status ####

Seems to be more or less in working order.

Now it needs testing.

#### Overview ####
Move the sliders to guess a number (or an interval, depending on how the problem is set up). Partial credit is given depending on how accurate your guess is. You can also use this to ask about when something happens in a video or audio clip, using the is\_time_question setting.

This problem should be accessible to blind and partially sighted users who are employing a screen reader.

Student state is recorded via Logger.log() when a grade is calculated, but not at other times.

#### Creating Your Own Number-Guessing Problems ####

Here's how to adapt this example to create your own guessing problems.

1. Choose a target number and decide how close students will have to get.
2. Put that into the Python part of the XML where indicated - near the top.
3. Put your own prompt into the HTML part of the XML where indicated - near the bottom.
4. Upload guesser.css, .js, and .html to the Files & Uploads in Studio.
5. Copy and paste your problem XML into a blank Advanced problem.
6. Profit!

##### Using Multiple Guessing Problems #####

Having more than one guessing problem on a page doesn't work well. They battle each other, trying to randomize or set the same python variables and call up the same HTML page multiple times. You could do it if you changed all the variable names, made a second HTML page, etc., but it's going to be a bit of a mess.

#### Files: ####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `jquery.ui.touch-punch.min.js`: [Touch Punch](https://github.com/furf/jquery-ui-touch-punch), an awesome JQuery extension that maps touch events into mouse events. Used for mobile compatibility. Should not need to alter.
- `guesser.js`: the javascript file that does the majority of the work and allows you to drag items around and stuff. You should not need to change this.
- `guesser.css`: the css file that makes things look pretty (or as close as I could get them). You should not need to change this.
- `guesser.html`: the HTML file that will be iframed into the page. You should not need to change this unless you have more than one matching problem in your course.
- `guesser.xml`: the XML used to create the problem within Studio. You will need to make changes to this: updating the part marked Course Author Section to be the actual right answer you want, and filling it with your own instruction text. You can also turn feedback off if you prefer; just set it to False.

When creating your own guessing problem, you will upload almost every file in this directory to the Files and Uploads section. The exception is the XML file (which you cut-and-paste into Studio).
