### Learner Backpack

#### Current Status

Working!

#### Overview

This problem does two things.

First, it gives you a real simple "Click here if you read it" problem. This is designed to let us hide the rest of the functionality in plain sight.

Second, and more importantly, it's part of a larger effort to allow edX course authors to store data that goes along with a learner and is kept on the edX server.

#### Creating Your Own Learner Backpack

- Download all the files.
- Put the .html and .js files into your Files & Uploads.
- Copy-paste the .xml file into a Blank Advanced Problem.
- You need to rename that problem's file. To do this...
  - Get the component's location, probably via Staff Debug Info.
  - Export the course and unzip it.
  - Find that component in the `problem` folder.
  - Rename it to `backpack.xml`.
  - Rezip the course and reimport it.
- On any page, get [HX-JS](https://github.com/Colin-Fredericks/hx-js) running.
- You can now access the backpack with the following javascript calls:
  - hxSetData('whatever', stuff) will store the `stuff` object in the `whatever` variable.
  - hxGetData('whatever') will get the contents of the `whatever` variable.
  - hxClearData('whatever') will empty the `whatever` variable.
  - This data is stored in the edX server, up to about 100k per student per course.

#### Files:

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `lz-string.min.js`: the javascript file that does some compression on the data. You should not need to change this. I didn't make this one.
- `backpack.js`: the javascript file that does the majority of the work. You should not need to change this.
- `backpack.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `backpack.xml`: the XML used to create the problem within Studio. You will need to make changes to this, but you only need to replace the prompt with your own.

#### Notes

The LZ compression is provided by the [lz-string](https://github.com/pieroxy/lz-string/) library, which is [MIT-licensed](https://github.com/pieroxy/lz-string/blob/master/LICENSE).
