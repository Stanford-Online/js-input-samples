// The label should be kept short for visual aesthetics.
// Type can be 'text' or 'image'. 
// If the type is set to 'image', the 'text' field will be used as alt text for accessibility.
// The imgURL should be just the filename; no need to include "/static/" in this.
// The linked images should not be larger than about 700x700 pixels, or they will not display well.

var elementsLeft = {
	'A': {
		'label': 'Metal',
		'type': 'text',
		'text': 'Heavy Metal',
		'imgURL': ''
	},
	'B': {
		'label': 'Classical',
		'type': 'text',
		'text': 'Classical music',
		'imgURL': ''
	},
	'C': {
		'label': 'Jazz',
		'type': 'text',
		'text': 'Jazz music and improvisation',
		'imgURL': ''
	},
	'D': {
		'label': 'Techno',
		'type': 'text',
		'text': 'Techno, house, and other heavy electronica',
		'imgURL': ''
	}
}

var elementsRight = {
	'1': {
		'label': 'Flight of the Bumblebee',
		'type': 'text',
		'text': '<em>Flight of the Bumblebee</em>, by Rimsky-Korsakov. An orchestral piece composed for the opera <i>The Tale of Tsar Saltan</i>.',
		'imgURL': ''
	},
	'2': {
		'label': 'The Frog',
		'type': 'text',
		'text': '<em>The Frog</em>, by X-Dream. An electronic piece, notable for its extensive use of authentic frog croak samples.',
		'imgURL': ''
	},
	'3': {
		'label': 'A Night in Tunisia',
		'type': 'image',
		'text': '<em>A Night in Tunisia</em>, by Dizzy Gillespie and Frank Paparelli. A piece for trumpet, bass, drum, and potentially other instruments.',
		'imgURL': 'Tunisia.jpg'
	},
	'4': {
		'label': 'Sting of the Bumblebee',
		'type': 'text',
		'text': '<em>Sting of the Bumblebee</em>, by Man-o-war. A piece for electric guitar and drum that mirrors <i>Flight of the Bumblebee</i> before breaking down into dissonance.',
		'imgURL': ''
	},
	'5': {
		'label': 'None of the Above',
		'type': 'text',
		'text': 'Does not match any other category.',
		'imgURL': ''
	}
}