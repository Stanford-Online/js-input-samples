#Hackathon

One of the goals of the hackathon was to work out in detail just what it would take to embed the functional kernel of a course problem (written in html/css/javascript) using both the JSInput and XBlocks technologies available currently from the Open Edx platform. Both goals were largely achieved, although we didn't spend much energy in either case on polishing off any rough edges.

This repo holds the artifacts produced during our two day effort. Although the material doesn't provide a tutorial on how to build your own JSInput- or XBlocks-based problem, it should provide a fairly simple example of working code. If your goal is to build your own JSInput problem, please see the ["Hello, World!" example project](https://github.com/caesar2164/Hackathon/blob/master/mirror.html) created specifically with the goal of providing more guidance to the novice JSInput creator.

#Trying Out the Code

Creating a JSInput problem within your own course using the files found here requires only a few simple steps. (Creating an XBlocks version is a bit more involved so it won't be addressed here.)

* **Get copies of the files** The files you will need to copy are really only these four (all found in the 'common' folder):
    - jschannel.js
    - oli_automata.css
    - oli_automata.html
    - oli_automata.js

* **Add those files to your course** Go to the 'Content' dropdown in Studio and select 'Files and Uploads.' Click the green button in the upper right corner to upload files. Click the blue 'Choose File' button to get to a file manager dialog. Select the four files in the 'common' folder (using the shift key to select all four at once) and click 'Open' to start the upload process.

* **Copy the bit of "glue" code into the 'Edit' box in Studio**  In the 'JSInput' folder is a file called 'PasteText.txt' where a bit of javascript/python code will be found. Open that file in a text editor and copy the text to the clipboard. Go back to your new JSInput problem in Studio and open the Edit dialog box. Discard all the text you find there (it was automatically supplied when you originally created the new problem), replacing it with the code on the clipboard.

#Try the New Problem

All the pieces are in place now to try your new problem. Click on the 'Preview' button to see the cellular automata problem running.






