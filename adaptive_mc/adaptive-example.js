//load all objects here (in array objects).  Types include 'MC' (multiple choice problem), 'video', 'image' and 'text'.
//'logic' refers to the destination when an input is clicked (for MC) or when the "Continue" button is clicked (for video, image or text).

var objects=new Array();

objects[0]={
	'type': 'MC',
	'choices': '2',
	'html': {
		'stem': '1 + 3 = ____',
		'choices': [
			'A. 4',
			'B. 13'
		],
		'alt': 'Question X'
	},
	'logic': {
    	'A. 4': 1,
    	'B. 13': 2
    }
};

objects[1]={
	'type': 'MC',
	'choices': '4',
	'html': {
		'stem': '6 + (-3) x (-6) = ____',
		'choices': [
			'A. -18',
			'B. 24',
			'C. -12'
			],
			'alt': 'Question X'
	},
	'logic': {
    	'A. -18': 8,
    	'B. 24': 7,
    	'C. -12': 9
    }
};

objects[2]={
	'type': 'text',
	'html': {
		'text': 'Based on your answer to the previous question, it is possible that you do not fully grasp the concept of <strong>addition</strong>.  <br>You will now be directed to a short video about addition, and then to a red follow-up question.'
	},
	'logic': 3
};

objects[3]={
	'type': 'video',
	'html': {
		'src': '//www.youtube.com/embed/WT_wvvEvkw4',
		'height': '315',
		'width': '560',
		'alt': 'video x'
	},
	'logic': 4
};

objects[4]={
'type': 'MC',
	'choices': '4',
	'html': {
		'stem': '8 + 10 = ____',
		'choices': [
			'A. -18',
			'B. 18',
			'C. 810',
			'D. 42'
			],
			'alt': 'Question X'
	},
	'logic': {
    	'A. -18': 5,
    	'B. 18': 1,
    	'C. 810': 5,
    	'D. 42': 5
    }
};

objects[5]={
	'type': 'text',
	'html': {
		'text': 'Based on your answer to the previous question, it looks like you still do not fully grasp the concept of <strong>addition</strong>.  You will now be directed to another short video about addition, and will then continue onto the next yellow question.'
	},
	'logic': 6
};

objects[6]={
	'type': 'video',
	'html': {
		'src': '//www.youtube.com/embed/AQ7THUKx6Es',
		'height': '315',
		'width': '560',
		'alt': 'video x'
	},
	'logic': 1
};

objects[7]={
	'type': 'text',
	'html': {
		'text': 'Nice work!  You finished the problem set.'
	},
	'logic': 'end'
};

objects[8]={
	'type': 'text',
	'html': {
		'text': 'Your answer indicates that you may have incorrectly gone through the order of operations.  You will now be directed to a diagram that will remind you in which order you add, multiply, etc.  You will then be directed to a red follow-up problem.'
	},
	'logic': 11
};

objects[9]={
	'type': 'text',
	'html': {
		'text': 'Your answer indicates that you may not understand how to multiply by negative numbers.  Watch the video resource, and then try the red follow-up question.'
	},
	'logic': 10
};

objects[10]={
	'type': 'video',
	'html': {
		'src': '//www.youtube.com/embed/47wjId9k2Hs',
		'height': '315',
		'width': '560',
		'alt': 'video x'
	},
	'logic': 12
};

objects[11]={
	'type': 'image',
	'html': {
		'src': 'http://resource.rockyview.ab.ca/t4t/math8/images/u2/u2_l5/m08_u2_046_l.jpg',
		'height': '400',
		'width': '400',
		'alt': 'image x'
	},
	'logic': 7
};