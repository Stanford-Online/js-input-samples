## Pathway Problem

### Current Status

Initial working state.

### Overview

It's basically a choose-your-own-adventure problem. We use hide/show buttons to do it, so it's not 100% hidden from tech-savvy learners.

### Creating Your Own Pathway Problem

Here's how to adapt this example to create your own pathway problem.

1. Download `pathway_problem.html` and `pathway_problem.js`, and put them in your Files & Uploads.
2. Download `pathway_problem.xml`, follow the instructions at the top of that file, and paste the result into a Blank Advanced Problem. This will be much more involved than your typical problem - you need to do a lot here, including:
   - Making the text
   - Deciding how it's all connected
   - Setting point values
3. Make sure you've got `hx.js` and `hx.css` in your Files & Uploads. If you don't have those, grab them from the [HX-JS Repo](https://github.com/Colin-Fredericks/hx-js).
4. You're done!

### Customizing Your Pathway Problem

**General Advice:** You can build as much branching-path stuff as you want, it's just going to take a while. Tone it back. Build what's important. Break longer things up into smaller scenarios. You can't run your entire course inside one problem.

**HTML:** You can add HTML to these easily. The sample problem has images, with some `br` tags to keep them from overflowing their boxes.

**Points:** You can use any point values you want, so make sure it all makes sense to your beta testers. By default, users get the _positive scores from the path they chose_ and the _negative scores from every path they explored_. You can change the options to alter that, or you can just avoid negative point values.

**Options:**

- show_points - True/False. Do learners see the points they earned? No breakdown shown at the moment.
- grade_on - Mark as 'score' if you want to use the points to determine grade, or 'participation' if you want to use how much of the scenario was explored to determine grade.
- retain_negative - True/False. Do negative point values stick around until the end, or do they go away when you choose a different path?

### Using Multiple Pathway Problems

You should be able to use more than one on the same page, but only as long as their options do not overlap. Otherwise the buttons from one problem will open the boxes from the other.

### Files:

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `pathway_problem.js`: the javascript file that does the majority of the work. You should not need to change this.
- `pathway_problem.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `pathway_problem.xml`: the XML used to create the problem within Studio. You will need to do a lot here.
