// Global variables elementsLeft and elementsRight are read in through another link in the the HTML.

// The "JSProblemState" JSON dictionary below is passed to the platform for grading and saving.
// Pass through whatever you wish. It will get logged.
var JSProblemState = {
	'pairings': [] // Pairings of the form [letter, number].
};

// This one tracks whether we're working with sighted users (the default)
// or with blind or partially sighted users (switched with link).
// Right now it's on false for testing.
var sighted = false;
	
// Loads the cards from the cardList variable
function loadElementsSighted(){

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
	
	var totalTableLength = Math.max(tableArrayLeft.length, tableArrayRight.length);
	
	for(var i = 0; i<totalTableLength; i++){
		if(tableArrayLeft[i] && tableArrayRight[i]){
			tableArray.push([tableArrayLeft[i], tableArrayRight[i]]);
		}
		if(tableArrayLeft[i] && !tableArrayRight[i]){
			tableArray.push([tableArrayLeft[i], false]);
		}
		if(!tableArrayLeft[i] && tableArrayRight[i]){
			tableArray.push([false, tableArrayRight[i]]);
		}
		
	}
	
	// Now we actually build the elements.
	
	for(var i = 0; i < totalTableLength; i++){
		
		// Setting it up this way as extra debugging breadcrumbs.
		var thisElement = 'error message';
		var tableTag = 'no table';
		var label = 'no label';
		var content = 'no content';
		var innercontent = 'no inner content';
		var dropArea = 'nothing';
		
		// Left-hand elements:
		if(tableArray[i][0]){
		
			label = '<tr><td class="spacer-right"></td><td class="label-left openbig">' 
				+ elementsLeft[tableArray[i][0]].label 
				+ '</td></tr>';
			
			// Handle image vs text
			// Also load full-sized elements in hidden space for zoom later.
			if(elementsLeft[tableArray[i][0]].type == 'image'){
				tableTag = '<table id="element' 
					+ tableArray[i][0] 
					+ '" class="element-left image">';
				content = '<tr><td colspan="2" class="content left-image openbig"><img src="' 
					+ elementsLeft[tableArray[i][0]].imgURL 
					+ '" alt="'
					+ elementsRight[tableArray[i][0]].text 
					+ '" class="icon" /></td></tr>';
				$('#hiddenspace').append('<div id="bigelement' 
					+ tableArray[i][0] 
					+ '" class="bigelement" title="' 
					+ elementsLeft[tableArray[i][0]].label 
					+ '"><img src="' 
					+ elementsLeft[tableArray[i][0]].imgURL 
					+ '" alt="'
					+ elementsLeft[tableArray[i][0]].text 
					+ '" /></div>');
			}
			if(elementsLeft[tableArray[i][0]].type == 'text'){
				tableTag = '<table id="element' 
					+ tableArray[i][0] 
					+ '" class="element-left text">';
				content = '<tr><td colspan="2" class="content left-text openbig">' 
					+ elementsLeft[tableArray[i][0]].text 
					+ '</td></tr>';
				$('#hiddenspace').append('<div id="bigelement' 
					+ tableArray[i][0] 
					+ '" class="bigelement" title="' 
					+ elementsLeft[tableArray[i][0]].label 
					+ '">' 
					+ elementsLeft[tableArray[i][0]].text 
					+ '</div>');
			}
			
			thisElement = tableTag + label + content + '</table>';
			
			leftElements.append(thisElement);

		}
		
		// Right-hand elements:
		if(tableArray[i][1]){
			
			label = '<tr><td class="spacer-right"></td><td class="label-right openbig">' 
				+ elementsRight[tableArray[i][1]].label 
				+ '</td></tr>';
			dropArea = '<td class="drop-area"> </td>'
			
			// Handle image vs text.
			// Also load full-sized elements in hidden space for zoom later.
			if(elementsRight[tableArray[i][1]].type == 'image'){
				tableTag = '<table id="element' 
					+ tableArray[i][1] 
					+ '" class="element-right image">';
				content = '<tr>' 
					+ dropArea 
					+ '<td class="content right-image openbig"><img src="' 
					+ elementsRight[tableArray[i][1]].imgURL 
					+ '" alt="'
					+ elementsRight[tableArray[i][1]].text 
					+ '" class="icon" /></td></tr>';
				$('#hiddenspace').append('<div id="bigelement' 
					+ tableArray[i][1] 
					+ '" class="bigelement" title="' 
					+ elementsRight[tableArray[i][1]].label 
					+ '"><img src="' 
					+ elementsRight[tableArray[i][1]].imgURL 
					+ '" alt="'
					+ elementsRight[tableArray[i][1]].text 
					+ '" /></div>');
			}
			if(elementsRight[tableArray[i][1]].type == 'text'){
				tableTag = '<table id="element' 
					+ tableArray[i][1] 
					+ '" class="element-right text">';
				content = '<tr>' 
					+ dropArea 
					+ '<td class="content right-text openbig">' 
					+ elementsRight[tableArray[i][1]].text 
					+ '</td></tr>';
				$('#hiddenspace').append('<div id="bigelement' 
					+ tableArray[i][1] 
					+ '" class="bigelement" title="' 
					+ elementsRight[tableArray[i][1]].label 
					+ '">' 
					+ elementsRight[tableArray[i][1]].text 
					+ '</div>');
			}
			
			thisElement = tableTag + label + content + '</table>';
			
			rightElements.append(thisElement);

		}

	}
	
	// After adding all the elements, make the left-hand ones draggable.
	$('.element-left').draggable({
		opacity: 0.7,
		revert: 'invalid',	// Snap back visibly if not dropped to a valid location.
		helper: 'clone'		// This helps when dragging out of scrollable areas.
	});
	
	// Make the right-hand ones drop targets.
	$( '.element-right' ).droppable({
		tolerance: 'pointer',
		hoverClass: 'drophighlight',
		activeClass: 'dropactive',
		drop: handleDrop						
	});

	
	// When an element is clicked, show the full-size image or text.
	$('.openbig').on('click tap', function(){
		var newID = 'big' + $(this).parents('table').attr('id');
		
		// Slightly different procedure for images and text cards.
		var modalWidth = 'auto';
		if($(this).parents('table').hasClass('text')){ modalWidth = 650; }
		
		$('#' + newID).dialog({
			width: modalWidth,
			modal: true,
			closeOnEscape: true,
			open: function(){			// Close that if they click outside the image.
				$('.ui-widget-overlay').on('click tap',function(){
					$('#' + newID).dialog('close');
				});
			}
		});
	});

}

function loadElementsScreenReader(){
	
	var tableArrayLeft = [];
	var tableArrayRight = [];
	var tableArray = [];
	var totalTableLength = 0;
	
	var elementDiv = $('#elementtable');
	
	// We're going to build two arrays from the keys of elementsLeft and elementsRight,
	// and then we'll build an HTML table out of those.
	
	for(var key in elementsLeft){
		tableArrayLeft.push(key);
	}
	
	for(var key in elementsRight){
		tableArrayRight.push(key);
	}
	
	
	// Now we actually build the table.
	elementDiv.append('<table></table>');
	var elementTable = $('table');
	var currentRow = '';
	var selectionForm = 'form error';
	
	// Table rows are associated with left-hand elements.
	for(var i=0; i<tableArrayLeft.length; i++){
		
		selectionForm = '';
		
		elementTable.append('<tr id="row' 
			+ tableArrayLeft[i] 
			+ '"></tr>')
		currentRow = $('#row' + tableArrayLeft[i]);
		
		if(elementsLeft[tableArrayLeft[i]].type == 'text'){
			currentRow.append('<td id="element'
				+ tableArrayLeft[i] 
				+ '">'
				+ elementsLeft[tableArrayLeft[i]].text
				+ '</td>');
		}else if(elementsLeft[tableArrayLeft[i]].type == 'image'){
			currentRow.append('<td id="element'
				+ tableArrayLeft[i] 
				+ '"><img src="'
				+ elementsLeft[tableArrayLeft[i]].imgURL
				+ '" alt="'
				+ elementsLeft[tableArrayLeft[i]].text
				+ '" class="accessicon" /></td>');
		}
		
		
		// Build the form for the checkboxes from the right-hand elements.		
		for(var j=0; j<tableArrayRight.length; j++){
			if(elementsRight[tableArrayRight[j]].type == 'text'){
				selectionForm += '<input type="checkbox" name="element'
					+ tableArrayLeft[i]
					+ '" value="element'
					+ tableArrayRight[j]
					+ '">'
					+ elementsRight[tableArrayRight[j]].text
					+ '<br>';
			}else if(elementsRight[tableArrayRight[j]].type == 'image'){
				selectionForm += '<input type="checkbox" name="element'
					+ tableArrayLeft[i]
					+ '" value="element'
					+ tableArrayRight[j]
					+ '"><img src="'
					+ elementsRight[tableArrayRight[j]].imgURL
					+ '" alt="'
					+ elementsRight[tableArrayRight[j]].text
					+ '" class="accessicon" /><br>';
			}
		}
		
		selectionForm = '<td><form>' + selectionForm + '</form></td>';
		currentRow.append(selectionForm);
		
		// Add event listeners.
		$('input:checkbox').on('click tap', function(){
			handleCheck(event, this); 
		});
		
	}
	
	
}

function handleDrop(event, ui){

	var draggedElement = $(ui.draggable);
	var targetElement = $(this);

	var draggedID = draggedElement.attr('id');
	var letter = draggedID.replace('element', '');
	var targetID = targetElement.attr('id');
	var number = targetID.replace('element', '');
	var thisPairing = [letter,number];
	
	var existingMatch = false;

	// If these elements are already matched, we're done.
	for(var i = 0; i < JSProblemState.pairings.length; i++){
		if(_.isEqual(JSProblemState.pairings[i], thisPairing)){  // Uses underscore.js
			existingMatch = true;
			break;
		}
	}
	
	// If not, add visual indication of the match and update JSProblemState.
	if(!existingMatch){
		
		// Copy the title from the left-hand element and add it to the indicator space.
		var indicatorSpace = targetElement.find('td.drop-area');
		addMatch(indicatorSpace, letter, number);
		JSProblemState.pairings.push(thisPairing);
	}
}

function handleCheck(event, checkbox){

	// Check for existing match in the problem state.
	var leftID = checkbox.attr('name');
	var letter = leftID.replace('element', '');
	var rightID = checkbox.attr('value');
	var number = leftID.replace('element', '');
	var thisPairing = [letter,number];

	var existingMatch = false;
	
	// If there's an existing match, remove it.
	for(var i = 0; i < JSProblemState.pairings.length; i++){
		if(_.isEqual(JSProblemState.pairings[i], thisPairing)){  // Uses underscore.js
			existingMatch = true;
			JSProblemState.pairings.splice(i, 1);  // Removes just that item.
			break;
		}
	}
	
	// If there is no existing match, add this one to the state.
	if(!existingMatch){
		JSProblemState.pairings.push(thisPairing);
	}

}


function addMatch(indicatorSpace, letter, number){
	// Add to the DOM
	var indicator = '<p id="' + letter + '-' + number + '">' + elementsLeft[letter].label + '</p>';
	indicatorSpace.append(indicator);

	// Give this a removal button.
	$('#' + letter + '-' + number).append('<span class="delete">x</span>');
	$('.delete').on('click tap', function(event){selfDelete(event)});	
}

function addCheck(indicatorSpace, letter, number){
	addCheck
}


// Callback function for the self-delete button on match indicators
function selfDelete(event){

	var target = $(event.target).parent();

	var targetID = target.attr('id').split('-'); // Letter before hyphen, number after.
	var letter = targetID[0];	
	var number = targetID[1];
	
	var thisPairing = [letter, number];
	
	// Remove the group from JSProblemState
	var exIndex = _.indexOf(JSProblemState.pairings, thisPairing);
	JSProblemState.pairings.splice(exIndex, 1);
	
	// Remove the indicator from the DOM
	target.remove();

}

function putMatchesBack(){

	var letter;
	var number;
	var indicatorSpace;
	var thisCheckbox;
	
	for(var i = 0; i < JSProblemState.pairings.length; i++){
		letter = JSProblemState.pairings[i][0];
		number = JSProblemState.pairings[i][1];
		
		// Handle things  differently for sighted vs blind/partially sighted users
		if(sighted){
			indicatorSpace = $('#element'+number).find('td.drop-area');
			addMatch(indicatorSpace, letter, number);
		}else{
			console.log('setting checkbox ' + letter + '-' + number);
			thisCheckbox = $('input[value="element' + number + '"]');
			thisCheckbox.prop('checked', true);
		}
	}
	
}



$(document).ready(function(){
	
	var space = $('#spacewrapper');
	
	if(sighted){
		// Bring in the left-hand and right-hand elements in our standard space.
		space.html('<div id="leftelements"></div><div id="rightelements"></div><div id="hiddenspace"></div>');
		loadElementsSighted();
	}else{
		// Build a view for people who are blind or partially sighted.
		space.html('<div id="elementtable"></div>');
		loadElementsScreenReader();
	}
	
	// Different spaces for blind and partially sighted learners.
	// These will be rebuilt from the JSProblemState rather than being saved.
	$('#switcher').on('click tap', function(){
		if(sighted){
			space.empty();
			space.html('<div id="elementtable"></div>');
			sighted = false;
		}else{
			space.empty();
			space.html('<div id="leftelements"></div><div id="rightelements"></div><div id="hiddenspace"></div>');
			sighted = true;
		}
		putMatchesBack();

	});
	
});


// This wrapper function is necessary.
var MatchingA = (function() {

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