## Emoji Response Poll ###

### Current Status ####

Basic version working.

Goals for later:
* Make the problem submit itself when you select a response.
* Handle custom emoji defined locally or in hxGlobalOptions.js

### Overview ####
Click on an emoji to say how you felt about this page.

### Creating Your Own Emoji Response Poll ####

Here's how to adapt this example to create your own emoji poll.

1. Download `emoji_response.html` and `emoji_response.js`, and put them in your Files & Uploads.
2. Download `emoji_response.xml`, follow the instructions at the top of that file, and paste the result into a Blank Advanced Problem.
3. You're done! This one's real simple.

### Customizing Your Emoji Response Poll ####

* By default, the emoji shown are ✓ ❓ 😯 🤔 😴 .
* Eventually I want to let people set a course-wide custom set of emoji. In the meantime, if you fiddle with this to change things you'll want to get the HTML entity (ampersand code) for the emoji you're using from [&what;](http://www.amp-what.com/unicode/search/icon)

### Using Multiple Emoji Response Polls #####

Should work just fine with any number per page.

### Files: ####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `emoji_response.js`: the javascript file that does the majority of the work. You should not need to change this.
- `emoji_response.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `emoji_response.xml`: the XML used to create the problem within Studio. You will need to write a prompt and set your course name.
