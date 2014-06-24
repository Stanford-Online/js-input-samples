### Card Sorting ###

#### Overview ####
Card-sorting activities are used to assess expertise in cognitive science. This is intended primarily as a research tool, but it's created as a problem type so that we can give students credit for doing it. The problem is graded correct if every card is assigned to a group, and incorrect otherwise.

#### Creating Your Own Card-Sorting Problems ####

Here's how to adapt this example to create your own card-sorting problems.

1. Come up with the cards. This is not a trivial step.
2. Find images or write text (full HTML ok) for the cards.
3. Download the files used in this problem: CardSortJS.zip
4. Update the CardSort\_CardList.js file. Fill in the 'type' property with either 'text' or 'image', and fill in the according property with the image's filename or with your text.
5. Upload all your images and files to the "Files and Uploads" section of Studio.
6, Create a new Custom Javascript Display and Input problem (under the "Advanced" problem tab). Copy and paste the contents of CardSortJS.xml into that problem, and add your own instructions for the students.
7. If you want to grade based on a more complex criteron than "All cards are in groups", you'll need to code it yourself within the Python code in the XML.
8. Use your browser's javascript console for debugging - for instance, if your cards' text or images aren't showing up, it may point you to the line in your CardSort_CardList.js file that is causing the problem.

#### Using Multiple Card-Sort Problems #### 

If you have multiple card-sorting problems in your course, you need to have different CardList files for each one. You will need to number or name them differently, and update the link in the HTML page.

Never put two card-sorting problems on the same page. The universe will explode. Or maybe they just won't work. Probably the second one. No guarantees.

#####Files:#####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `CardSortJS.js`: the javascript file that does the majority of the work and allows you to drag cards around and stuff. You should not need to change this.
- `CardSortJS.css`: the css file that makes things look pretty (or as close as I could get them). You should not need to change this.
- `CardSortJS.html`: the HTML file that will be iframed into the page. You should not need to change this unless you have more than one card-sorting problem in your course.
- `CardSortJS.xml`: the XML used to create the problem within Studio. You will need to make minimal changes to this: filling it with your own instruction text.
- `CardSort_GroupList.js`: holds the pregenerated group names. You will need to update this only if you want to set some pre-set group names. If "Group 1" and "Group 2" are all you want at the start, just leave it as-is.
- `CardSort_CardList.js`: holds all the information about the cards. You will definitely need to update this with your own information.
- And severa image files that you will need to replace with your own.

When creating your own card-sorting problem, you will upload almost every file in this directory to the Files and Uploads section. There are two exceptions: the XML file (which you cut-and-paste into Studio) and the image files (which you replace with your own).
