### Text Logger ###

#### Current Status ####

Seems to be more or less in working order.

#### Overview ####
Sometimes you just want students to type in a paragraph so you can log it for later. For instance, you might be collecting free-response answers to create a better multiple-choice question later. This problem type just collects a response, logs it, and marks the student correct if the answer is at least 10 characters.

#### Creating Your Own Text-Logging Problems ####

Here's how to adapt this example to create your own guessing problems.

1. Grab python_lib.zip from the [HX-PY](https://github.com/Colin-Fredericks/hx-py) repo, and upload it (still compressed) into your Files & Uploads.
2. Download textlog.html and textlog.js, and put them in your Files & Uploads.
3. Download textlog.xml, edit the prompt as desired, and paste that into a Blank Advanced Problem.
4. Profit!

##### Using Multiple Guessing Problems #####

I haven't tested having more than one text logging problem on a page.

#### Files: ####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `textlog.js`: the javascript file that does the majority of the work. You should not need to change this.
- `textlog.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `textlog.xml`: the XML used to create the problem within Studio. You will need to make changes to this, but you only need to replace the prompt with your own.
