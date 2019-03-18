## Pathway Problem ###

### Current Status ####

WIP

### Overview ####

It's basically a choose-your-own-adventure problem.

### Creating Your Own Pathway Problem ####

Here's how to adapt this example to create your own pathway problem.

1. Download `pathway_problem.html` and `pathway_problem.js`, and put them in your Files & Uploads.
2. Download `pathway_problem.xml`, follow the instructions at the top of that file, and paste the result into a Blank Advanced Problem. This will be much more involved than your typical problem - you need to do a lot here, including:
    - Making the text
    - Deciding how it's all connected
    - Setting point values
3. Make sure you've got `hx.js` and `hx.css` in your Files & Uploads. If you don't have those, grab them from the [HX-JS Repo](https://github.com/Colin-Fredericks/hx-js).
4. You're done!

### Customizing Your Pathway Problem ####

(add more here)

### Using Multiple Pathway Problems #####

Probably not.

### Files: ####

Inside you will find many pieces used to create this problem:

- `jschannel.js`: the javascript file that allows javascript-type problems to work at all. You should not need to change this. I didn't make this one.
- `pathway_problem.js`: the javascript file that does the majority of the work. You should not need to change this.
- `pathway_problem.html`: the HTML file that will be iframed into the page. You should not need to change this.
- `pathway_problem.xml`: the XML used to create the problem within Studio. You will need to do a lot here.
