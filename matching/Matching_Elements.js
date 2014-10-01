// The label should be kept short for visual aesthetics.
// Type can be 'text' or 'image'. 
// If the type is set to 'image', the 'text' field will be used as alt text for accessibility.
// The imgURL should be just the filename; no need to include "/static/" in this.
// The linked images should not be larger than about 700x700 pixels, or they will not display well.

var elementsLeft = {
	'A': {
		'label': 'Red',
		'type': 'text',
		'text': 'The color <span style="color:red;">red</span>.',
		'imgURL': ''
	},
	'B': {
		'label': 'Orange',
		'type': 'text',
		'text': 'The color <span style="color:orange;">orange</span>.',
		'imgURL': ''
	},
	'C': {
		'label': 'Green',
		'type': 'text',
		'text': 'The color <span style="color:green;">green</span>.',
		'imgURL': ''
	},
	'D': {
		'label': 'Blue',
		'type': 'text',
		'text': 'The color <span style="color:blue;">blue</span>.',
		'imgURL': ''
	}
}

var elementsRight = {
	'1': {
		'label': 'Red',
		'type': 'image',
		'text': 'The word "red" colored red.',
		'imgURL': 'Red.png'
	},
	'2': {
		'label': 'Orange',
		'type': 'image',
		'text': 'The word "orange" colored orange.',
		'imgURL': 'Orange.png'
	},
	'3': {
		'label': 'Green',
		'type': 'image',
		'text': 'The word "green" colored green.',
		'imgURL': 'Green.png'
	},
	'4': {
		'label': 'Blue?',
		'type': 'image',
		'text': 'The word "blue" colored orange.',
		'imgURL': 'Blue.png'
	},
	'5': {
		'label': 'None of the Above',
		'type': 'text',
		'text': 'Does not match any other category.',
		'imgURL': ''
	}
}