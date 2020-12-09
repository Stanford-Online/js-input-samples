### Multi-Text-Box Problems

#### Current Status

Just started adapting this from the text-logger problem.

#### Overview

Sometimes you want students to type in several text boxes. This problem type just collects a response, logs it, and marks the student correct if the answer is at least 10 characters.

#### Creating Your Own Text-Logging Problems

Here's how to adapt this example to create your own guessing problems.

1. Grab python_lib.zip from the [HX-PY](https://github.com/Colin-Fredericks/hx-py) repo, and upload it (still compressed) into your Files & Uploads.
2. Download jschannel.js, multi_text.html and multi_text.js, and put them in your Files & Uploads.
3. Download multi_text_with_pylib.xml, edit the prompt as desired, and paste that into a Blank Advanced Problem.
4. Profit!

##### Using Multiple Multi-Text Problems

You cannot create multiple text logging problems on the same page. Since their text boxes are not iframed into the page, they will interfere with each other.

#### Files:

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `multi_text.js`: the javascript file that does the majority of the work. You should not need to change this.
- `multi_text.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `multi_text.xml`: the XML used to create the problem within Studio. You will need to make changes to this. There's a version that uses the grading code from [HX-PY](https://github.com/Colin-Fredericks/hx-py) repo, which I recommend.
