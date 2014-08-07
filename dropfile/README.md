### File Processing ###

#### Overview ####
This is a bare-bones file processing problem. All it does at the moment is check to see whether a file dropped into the proper area is an image, a text file or some other type. It's here not as a real-use sort of assignment, but as a proof-of-concept for assignments that analyze student files.

Student state is recorded via Logger.log() when a grade is calculated, but not at other times. Only correctness is logged at the moment.

#### Creating Your Own File Processing Problems ####

Here's how to adapt this example to create your own file processing problems.

1. Decide what sort of files you want to process and how.
2. Write the code for that in Javascript.
3. Download the files used in this problem.
4. Update the DropFile.js file to include your own file processing code. You will probably want to add more to the JSProblemState variable so as to log more stuff.
5. Upload all files to the "Files and Uploads" section of Studio, or just dump them in the proper directory if you're using the XML approach.
6. Create a new Custom Javascript Display and Input problem (under the "Advanced" problem tab). Copy and paste the contents of DropFile.xml into that problem and add your own instructions for the students.

##### Using Multiple File Processing Problems #####

If you have file processing problems in your course, you will probably need to have different DropFile.js files for each one, each with its own processing code. You will need to number or name them differently, and update the link in the HTML page.

Never put two matching problems on the same page. The universe will explode. Or maybe they just won't work. Probably the second one. No guarantees.

#### Files: ####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `jquery.ui.touch-punch.min.js`: [Touch Punch](https://github.com/furf/jquery-ui-touch-punch), an awesome JQuery extension that maps touch events into mouse events. Used for mobile compatibility, although most mobile devices are not going to be able to drag a file onto this interface anyway. It might be useful to build in "browse files" and "upload" buttons for real-world use. Should not need to alter.
- `DropFile.js`: the javascript file that does the majority of the work and allows you to drag items around and stuff. You will need to change this to insert your own processing.
- `DropFile.css`: the css file that makes things look pretty (or as close as I could get them). Feel free to tinker.
- `DropFile.html`: the HTML file that will be iframed into the page. You should not need to change this unless you have more than one matching problem in your course.
- `DropFile.xml`: the XML used to create the problem within Studio. You probably won't need to change this unless you want to hide some of the processing from the students and do it in python rather than JS.
- And several image files and the zip files they come from. 

When creating your own file processing problem, you will upload almost every file in this directory to the Files and Uploads section. The only exception is the XML file (which you cut-and-paste into Studio).
