### Video Watcher ###

#### Current Status ####

Seems to be more or less in working order.

Now it needs testing.

#### Overview ####
Click the button to get credit for sitting there and watching something. Or for turning it on and walking away.

#### Creating Your Own Number-Guessing Problems ####

Here's how to adapt this example to create your own guessing problems.

1. Copy-paste the XML into a Blank Advanced Problem
2. Upload the .js and .html files to Files and Uploads
3. Make sure there's a video. Just one.
4. Profit!

##### Using Multiple Videos #####

Not currently supported.

#### Files: ####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `videowatch.js`: the javascript file that passes video info back to the grader. You should not need to change this.
- `VideoWatchTimer.js`: the javascript file that watches the time from the video and counts it up properly, and does logging. You should not need to change this.
- `videowatch.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `videowatch.xml`: the XML used to create the problem within Studio. Includes Python for grading. You can adjust the grading strictness and the prompt; leave everything else alone.