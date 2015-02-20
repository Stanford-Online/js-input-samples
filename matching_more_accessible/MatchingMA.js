// Global variables elementsLeft and elementsRight are read in through another link in the the HTML.

// The "JSProblemState" JSON dictionary below is passed to the platform for grading and saving.
// Pass through whatever you wish. It will get logged.
var JSProblemState = {
	'pairings': [] // Pairings of the form [letter, number].
};


// Loads the cards from the cardList variable
function loadElements(){

	var tableArrayLeft = [];
	var tableArrayRight = [];
	var tableArray = [];
	var totalTableLength = 0;
	
	var leftElements = $('#leftelements');
	var rightElements = $('#rightelements');
	
	// We're going to build an array from the elementsLeft and elementsRight objects,
	// and then we'll build HTML elements out of that. It'll be easier.
	
	for(var key in elementsLeft){
		tableArrayLeft.push(key);
	}
	
	for(var key in elementsRight){
		tableArrayRight.push(key);
	}
		
	// Now we actually build the elements.
	// Setting it up this way as extra debugging breadcrumbs.
	var thisElement = 'error message';
	var tableTag = 'no table';
	var label = 'no label';
	var content = 'no content';
	var innercontent = 'no inner content';
	var dropArea = 'nothing';
	
	for(var i = 0; i < tableArrayLeft.length; i++){
	
		label = '<div><div class="label-left openbig"><h3 tabindex="0">'
			+ elementsLeft[tableArrayLeft[i]].label 
			+ ' <img src="tiny_magnifying_glass.png" tabindex="0" alt=", click to enlarge" class="openbig" />'
			+ '</h3></div></div>';
	
		// Handle image vs text
		// Also load full-sized elements in hidden space for zoom later.
		if(elementsLeft[tableArrayLeft[i]].type == 'image'){
			tableTag = '<div id="element' 
				+ tableArrayLeft[i] 
				+ '" class="element-left image bigboss">';
			content = '<div><div id="description'
				+ tableArrayLeft[i] 
				+ '" class="content left-image"><img src="' 
				+ elementsLeft[tableArrayLeft[i]].imgURL 
				+ '" alt="'
				+ jQuery('<p>' + elementsLeft[tableArrayLeft[i]].text + '</p>').text()	// Strip the tags from the text for alt text
				+ '" class="icon" /></div></div>';
			$('#hiddenspace').append('<div id="bigelement' 
				+ tableArrayLeft[i] 
				+ '" class="bigelement" title="' 
				+ elementsLeft[tableArrayLeft[i]].label 
				+ '"><img src="' 
				+ elementsLeft[tableArrayLeft[i]].imgURL 
				+ '" alt="'
				+ jQuery('<p>' + elementsLeft[tableArrayLeft[i]].text + '</p>').text()	// Strip the tags from the text for alt text
				+ '" /></div>');
		}
		if(elementsLeft[tableArrayLeft[i] ].type == 'text'){
			tableTag = '<div id="element' 
				+ tableArrayLeft[i] 
				+ '" class="element-left text bigboss">';
			content = '<div><div id="description'
				+ tableArrayLeft[i] 
				+ '" class="content left-text">' 
				+ elementsLeft[tableArrayLeft[i]].text 
				+ '</div></div>';
			$('#hiddenspace').append('<div id="bigelement' 
				+ tableArrayLeft[i] 
				+ '" class="bigelement" title="' 
				+ elementsLeft[tableArrayLeft[i]].label 
				+ '">' 
				+ elementsLeft[tableArrayLeft[i]].text 
				+ '</div>');
		}
	
		thisElement = tableTag + label + content + '</div>';
	
		leftElements.append(thisElement);

		
	}
	
	for(var i = 0; i < tableArrayRight.length; i++){		
	
		label = '<div>'
			+ '<div class="label-right" id="labelfor' +
			+ tableArrayRight[i]
			+ '"><h3 tabindex="0">'
			+ '<span class="sr">Category</span>' 
			+ elementsRight[tableArrayRight[i]].label 
			+ ' <img src="tiny_magnifying_glass.png" tabindex="0" alt=", click to enlarge" class="openbig" />'
			+ '</h3></div></div>';
		dropArea = '<div class="drop-area" role="region" aria-label="Matched items for category '
			+ elementsRight[tableArrayRight[i]].label 
			+ '">'
			+ '<ul class="match-indicator" id="listfor'
			+ tableArrayRight[i]
			+ '"></ul></div>'
		
		// Handle image vs text.
		// Also load full-sized elements in hidden space for zoom later.
		if(elementsRight[tableArrayRight[i]].type == 'image'){
			tableTag = '<div role="presentation" id="element' 
				+ tableArrayRight[i]
				+ '" class="element-right image bigboss">';
			content = '<div>' 
				+ '<div class="content right-image" id="contentfor' +
				+ tableArrayRight[i]
				+ '"><img src="' 
				+ elementsRight[tableArrayRight[i]].imgURL 
				+ '" alt="'
				+ jQuery('<p>' + elementsRight[tableArrayRight[i]].text + '</p>').text()	// Strip the tags from the text for alt text
				+ '" class="icon" />'
				+ '<button type="button" class="assign-options" data-element-number="' + tableArrayRight[i] + '">Make selections</button>' 
				+ '</div>'
				+ dropArea 
				+ '</div>';
			$('#hiddenspace').append('<div id="bigelement' 
				+ tableArrayRight[i]
				+ '" class="bigelement" title="' 
				+ elementsRight[tableArrayRight[i]].label 
				+ '"><img src="' 
				+ elementsRight[tableArrayRight[i]].imgURL 
				+ '" alt="'
				+ jQuery('<p>' + elementsRight[tableArrayRight[i]].text + '</p>').text()	// Strip the tags from the text for alt text
				+ '" />'
				+ '</div>');
		}
		if(elementsRight[tableArrayRight[i]].type == 'text'){
			tableTag = '<div role="presentation" id="element' 
				+ tableArrayRight[i] 
				+ '" class="element-right text bigboss">';
			content = '<div>' 
				+ '<div class="content clearfix right-text" id="contentfor' +
				+ tableArrayRight[i]
				+ '">' 
				+ elementsRight[tableArrayRight[i]].text 
				+ '<button type="button" aria-haspopup="true" aria-controls="contextual_menu" class="assign-options" data-element-number="' + tableArrayRight[i] + '">Make selections</button>' 
				+ '</div>'
				+ dropArea
				+ '</div>';
			$('#hiddenspace').append('<div id="bigelement' 
				+ tableArrayRight[i]
				+ '" class="bigelement" title="' 
				+ elementsRight[tableArrayRight[i]].label 
				+ '">' 
				+ elementsRight[tableArrayRight[i]].text 
				+ '</div>');
		}
		
		// Wrap it in a div that we can tab through using screen readers.
		thisElement = '<div id="forreader' 
			+ tableArrayRight[i]
			+ '">' 
			+ tableTag + label + content + '</div>' 
			+ '</div>';
		
		rightElements.append(thisElement);

	}
	
	// After adding all the elements, make the left-hand ones draggable.
	$('.element-left').draggable({
		opacity: 0.7,
		revert: 'invalid',	// Snap back visibly if not dropped to a valid location.
		helper: 'clone'	 // This helps when dragging out of scrollable areas.
	});
	
	// Make the right-hand ones drop targets.
	$( '.element-right' ).droppable({
		tolerance: 'pointer',
		hoverClass: 'drophighlight',
		activeClass: 'dropactive',
		drop: handleDrop						
	});

	
	// When the magnifying glass is clicked, show the full-size image or text.
	$('.openbig').on('click tap', function(){
		var newID = 'big' + $(this).parents('.bigboss').attr('id');
		
		// Slightly different procedure for images and text cards.
		var modalWidth = 'auto';
		if($(this).parents('.bigboss').hasClass('text')){ modalWidth = 650; }
		
		$('#' + newID).dialog({
			width: modalWidth,
			modal: true,
			closeOnEscape: true,
			open: function(){		 // Close that if they click outside the image.
				$('.ui-widget-overlay').on('click tap',function(){
					$('#' + newID).dialog('close');
				});
			}
		});
	});


	// When someone clicks on the button to make selections, open the menu so they can.
	// We're also manually handling focus to some extent for this whole maneuver.
	$('.content').on('click', '.assign-options', function() {
		
		console.log('Button clicked, assigning matches...');
		var eNumber = $(this).data('element-number');
		
		console.log('Creating the popup menu...');
		build_menu(eNumber, $(this).parent());
	});
	
}


// Creates the contextual menu for accessible access.
function build_menu(number, parent) {

	if ($('#contextual_menu').length) {
		console.log('Closing open menus.')
		// Hacky for now, but you'll want to check any open containers for changed checkboxes and save them before closing.
		$('#contextual_menu').remove();
	}
	
	var tableArrayLeft = [];
	
	// Creating pieces for the menu
	console.log('Running function: build_menu...');
	var contextual_menu = $('<div id="contextual_menu" class="popup-menu" tabindex="-1"></div>'),
		options_menu = $('<ol id="options_menu" class="popup-options"></ol>'), 
		options_options = '',
		contextual_actions = '<div class="popup-actions">'
			+ '<button type="button" class="save-options">Save</button>'
			+ '<button type="button" class="cancel">Cancel</button>'
			+ '</div>';
	
	// Build an array of keys and iterate through them to make the menu.
	for (var key in elementsLeft) {
		tableArrayLeft.push(key);
	}
	
	$.each(tableArrayLeft, function(i, value) {
		options_options += '<li><label for="element_' 
			+ value + '_' + number 
			+ '" class="option-label">'
			+ '<input type="checkbox" '
			+ 'id="element_' + value + '_' + number 
			+ '" name="element' + value
			+ '" value="element' + number 
			+ '" aria-describedby="description' + value 
			+ '" /> ' 
			+ elementsLeft[value].label 
			+ '</label></li>';
	});
	console.log('Built the checkbox menu.');
	
	// Add the menu to the page.
	$(options_menu).append(options_options);
	$(contextual_menu).append(options_menu).append(contextual_actions);
	$(parent).append(contextual_menu);
	console.log('Attached the menu to the popup.');
	
	console.log('Displaying the popup menu with options.');
	update_selected_options(number);
	
	// For in case we decide to handle focus manually.
	// $('#contextual_menu').focus();
	
	console.log('Updating the selected options, if available.');


	// Let's add some event handlers for the menu.
	// If someone saves what they've done with the menu, handle the checkboxes appropriately.
	$('.content').on('click', '#contextual_menu .save-options', function() {
		
		console.log('Button clicked, saving selections...');
		var inputs = $('#options_menu li input[type="checkbox"]');
		var checkboxes = [];
		var checked = []
		var thisLetter = '';

		$(inputs).each(function(i) {
			
			console.log('Looping through each checkbox to see if it\'s selected...');
			
			if ($(this).is(':checked')) {
				console.log('Found checked.');
				checked.push(true);
			}else{
				checked.push(false);
			}
			
			var oLetter = $(this).attr('name'),
				oNumber = $(this).val();

			oLetter = oLetter.replace('element', '');
			thisLetter = oLetter;
			oNumber = oNumber.replace('element', '');
			
			checkboxes.push([oLetter, oNumber]);

		});
		
		console.log(checkboxes, checked);
		console.log('Saving selections.');
		save_pairings(checkboxes, checked, thisLetter);
	});
	
	
	// If they cancel the menu, ignore everything they did with it.
	$('.content').on('click', '#contextual_menu .cancel', function() {
		
		console.log('Button clicked, closing open popup menu.');
		close_popup($('.popup-menu'));
		
	});
	
}


// This function checks the appropriate boxes on the pop-up menu, to show which pairings exist.
function update_selected_options(number) {
	
	console.log('Running function: update_selected_options...');
	console.log('Looping through checkboxes in the open popup menu...');

	if ($('#contextual_menu').is(':visible')) {
		console.log('OK!');
		
		// Go through each checkbox to compare it to the problem state
		$('#contextual_menu input[type="checkbox"]').each(function(j) {

			var oL = $(this).attr('name');
			var oLetter = oL.replace('element', '');
			var oNumber = number.toString();
			var needle = [oLetter, oNumber];

			console.log(JSProblemState.pairings);
			console.log(needle);
			
			// Go through each pairing in the problem state and compare against the pop-up.
			if (!_.isEmpty(JSProblemState.pairings)) {
				for(var i=0; i < JSProblemState.pairings.length; i++){
					console.log('checking for pairing ' + JSProblemState.pairings[i]);
					var thisbox = $('#element_'+oLetter+'_'+oNumber);
					
					if(_.isEqual(JSProblemState.pairings[i], needle)){
						console.log('Setting the state to checked.');
						thisbox.prop('checked', true).attr('checked', 'checked');
					}
				}
			}

		});
	} else {
		console.log('Can\'t find the popup menu! Aborting!');
	}

}

function save_pairings(checkboxes, checked, letter) {
	
	console.log('Running function: save_pairings...');
	
	// Loop through the checkboxes from this pop-up.
	for(var i = 0; i < checkboxes.length; i++){
		
		// Get the index for this checkbox within the pairings.
		var indexOfPairing = findSubArray(checkboxes[i], JSProblemState.pairings);
		console.log(checkboxes[i] + ' is number ' + indexOfPairing);
		
		// If we find this pairing in the list...
		if(indexOfPairing >= 0){

			// If it's checked, do nothing. It's already on the list.
			
			// If it's unchecked and it's currently on the pairing list, 
			//  remove it from the problem state and the DOM.
			if(!checked[i]){
				JSProblemState.pairings.splice(indexOfPairing, 1);
				$('#' + checkboxes[i][0] + '-' + checkboxes[i][1]).remove()
			}
		}
		
		// If we don't find this pairing in the list...
		else{
			// If it's checked, add it.
			if(checked[i]){
				addMatchToDOM(checkboxes[i]);
				JSProblemState.pairings.push(checkboxes[i]);
			}
			// If not checked, ignore it - we don't need to remove anything.
		}
	}
	
	// Then we're done.
	console.log('Closing the popup after adding/updating matches.');
	close_popup();
}


// Called after you save or cancel from the pop-up menu
function close_popup(popup) {
	
	$('#contextual_menu').remove();
	console.log('Popup removed.')

	$(popup).parent().find('button').focus();
	console.log('Focus sent back to initiating button.');
}


// Called when you drop the draggable element into the right-hand side.
function handleDrop(event, ui){

	var draggedElement = $(ui.draggable);
	var targetElement = $(this);

	var draggedID = draggedElement.attr('id');
	var letter = draggedID.replace('element', '');
	var targetID = targetElement.attr('id');
	var number = targetID.replace('element', '');
	var thisPairing = [letter,number];
	
	console.log(letter + ' dropped on ' + number);
	
	var existingMatch = false;

	// If these elements are already matched, we're done.
	for(var i = 0; i < JSProblemState.pairings.length; i++){
		if(_.isEqual(JSProblemState.pairings[i], thisPairing)){	// Uses underscore.js
			existingMatch = true;
			console.log('existing match found for ' + letter + ' ' + number);
			break;
		}
	}
	
	// If not, add visual indication of the match and update JSProblemState.
	if(!existingMatch){
		
		// Copy the title from the left-hand element and add it to the indicator space.
		var indicatorSpace = targetElement.find('.drop-area');
		JSProblemState.pairings.push(thisPairing);
		addMatchToDOM([letter, number]);
	}
}


// Takes care of adding a pairing to the DOM. Doesn't touch the problem state, just handles display.
function addMatchToDOM(pairing){

	var indicator = '<li id="' + pairing[0] + '-' + pairing[1] + '">' + elementsLeft[pairing[0]].label + '</li>';
	indicatorSpace = $('#element' + pairing[1]).find('ul').append(indicator);

	console.log('Added Match for ' + pairing[0] + ' ' + pairing[1]);
	console.log(JSProblemState.pairings);

	// Give this a removal button.
	$('#' + pairing[0] + '-' + pairing[1]).append('<button type="button" class="delete" id="delete' + pairing[0] + '-' + pairing[1] + '" aria-label="remove match">[-]</button>');
	$('#delete' + pairing[0] + '-' + pairing[1]).on( 'click tap', function(event){ selfDelete(event) } ); 

	// Once in a while this makes the whole damn right-hand side hide. Let's refresh it just in case.
	$('#rightelements').hide().show(0);
}


// Callback function for the self-delete button on match indicators
function selfDelete(event){

	var toDelete = $(event.target).parent();

	var targetID = toDelete.attr('id').split('-'); // Letter before hyphen, number after.
	var letter = targetID[0];	
	var number = targetID[1];
	
	var thisPairing = [letter, number];
	
	// Remove the group from JSProblemState
	// Actually finding the damn thing is not easy.
	var location = findSubArray(thisPairing, JSProblemState.pairings);
	if(location >= 0 ) { JSProblemState.pairings.splice(location, 1); }
	
	// Remove the indicator from the DOM
	toDelete.hide(300, function(){ toDelete.remove(); });
	// Once in a while this makes the whole damn right-hand side hide. Let's refresh it just in case.
	$('#rightelements').hide().show(0);
	
	console.log('Removed ' + thisPairing + ' from index ' + location);
	console.log(JSProblemState.pairings);

}

// Called by setState and nowhere else, to put things back how they were.
function putMatchesBack(){

	var letter;
	var number;
	var indicatorSpace;
	var thisCheckbox;
	
	for(var i = 0; i < JSProblemState.pairings.length; i++){
		letter = JSProblemState.pairings[i][0];
		number = JSProblemState.pairings[i][1];
		
		indicatorSpace = $('#element'+number).find('drop-area');
		addMatchToDOM([letter, number]);
	}
	
}

// Needle is an array; Haystack is an array of arrays.
function findSubArray(needle, haystack){

	if(haystack.length === 0){ return -2; }
	
	var target = needle.toString();
	var index;
	for(var i=0; i<haystack.length; i++) {
		index = i;
		if(target === haystack[i].toString()){
			console.log('Pairing ' + target + ' found at index ' + i);
			break;
		}
	}
	
	if(index > haystack.length) { index = -1; }
	
	return index;	
	
}


$(document).ready(function(){
	
	// Called as a default for first-runs.
	loadElements();

	var space = $('#spacewrapper');
	var switcher = $('#switcher');
	var instructions = $('#instructions');	
		
	// If the user hits escape while a pop-up menu is open, close it.
	$(document).keyup(function(e) {
		if ($('#contextual_menu').is(':visible')) {
			if (e.keyCode == 27) { $('.cancel').click(); }   // 27 is esc
		}
	});	

});


// This wrapper function is necessary.
var MatchingMA2 = (function() {

	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	var channel;

	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	if (window.parent !== window) {
		channel = Channel.build({
			window: window.parent,
			origin: "*",
			scope: "JSInput"
		});
		channel.bind("getGrade", getGrade);
		channel.bind("getState", getState);
		channel.bind("setState", setState);

	}
	
	// getState() and setState() are required by the problem type.
	function getState(){
		console.log('getting state');
		return JSON.stringify(JSProblemState);
	}
	
	// TODO: This needs a major update. Be sure to put all the cards in their correct places.
	function setState() {
		console.log('setting state');
		stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
		JSProblemState = JSON.parse(stateStr);
		
		// Put the cards in the correct locations based on what the problem state says.
		putMatchesBack();
		
	}

	// To keep students from seeing the solution that way, just pass the problem state back
	// and use python in the problem XML to analyze it.
	
	function getGrade() {
		console.log('getting grade');
		
		// Log the problem state. 
		// This is called from the parent window's Javascript so that we can write to the official edX logs. 
		parent.logThatThing(JSProblemState);

		// Return the whole problem state.
		return JSON.stringify(JSProblemState);
	}
	
	// REQUIRED --- DO NOT REMOVE/CHANGE!!
	return {
		getState: getState,
		setState: setState,
		getGrade: getGrade
	};

}());