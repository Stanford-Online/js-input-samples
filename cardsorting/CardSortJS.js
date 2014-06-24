// Global variables cardList and groupList are read in through another link in the the HTML.

// The "JSProblemState" JSON dictionary below is passed to the platform for grading and saving.
// Pass through whatever you wish. It will get logged.
var JSProblemState = {
	'groups': {
		'0': 'null group'
	},
	'cards': {
		'0': 'null card'
	},
	'pairings': ['group0, card0'] // Pairings of the form 'group #, card #'.
};

// Loads the cards from the cardList variable
function loadCards(cardSpace){

	// Numbering cards from 1.
	var loopy = 1;
	
	for(var key in cardList){
		
		// Treat image and text cards a little differently.
		if(cardList[key].type === 'image'){
		
			// Load the cards into the card space.
			cardSpace.append('<div id="card' + loopy + '" class="card"><img src="' + cardList[key].imgURL + '" class="cardimage"><br/><span class="cardtitle">' + key + '</span></div>');

			// Load full-sized images of the cards as invisible divs so we can make them into dialogs later.
			$('#hiddenspace').append('<div id="bigcard' + loopy + '" class="bigimgcard"><img src="' + cardList[key].imgURL + '"></div>');
		
		}else if(cardList[key].type === 'text'){
		
			// Load the cards into the card space.
			cardSpace.append('<div id="card' + loopy + '" class="card"><p class="cardtext">' + cardList[key].text + '</p><br/><span class="cardtitle">' + key + '</span></div>');

			// Load the entire text of the cards as invisible divs so we can make them into dialogs later.
			$('#hiddenspace').append('<div id="bigcard' + loopy + '" class="bigtextcard"><p>' + cardList[key].text + '</p></div>');
		
		}

		JSProblemState['cards'][String(loopy)] = key;
		loopy++;
	}


	$('.card').draggable({
		revert: 'invalid',	// Snap back visibly if not dropped to a valid location.
		helper: 'clone'		// This helps when dragging out of scrollable areas.
	});
	
	// When a card is clicked, show the full-size image.
	$('.card').on('click tap', function(){
		var newID = 'big' + $(this).attr('id');
		
		// Slightly different procedure for images and text cards.
		var modalWidth = 'auto';
		if($(this).children().hasClass('cardtext')){ modalWidth = 650; }
		
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

// Loads the groups from the groupList variable. Note the options.
function loadGroups(groupSpace, cardSpace, options){
	
	// 'all' means adding the pre-made groups.
	if(options == 'all'){
		
		// Numbering groups from 1.
		var loopy = 1;
		
		// Load the predefined groups into the group space.
		for(var key in groupList){
			groupSpace.append('<div id="group' + loopy + '" class="group"><p class="title">' + key + '</p><br/></div>');
			JSProblemState['groups'][String(loopy)] = key;
			loopy++;
		}

	}
	
	// 'reload' is used when we're recovering a student state with putCardsBack().
	if(options == 'reload'){
		
		// Numbering groups from 1.
		var loopy = 1;
		
		// Load the predefined groups into the group space.
		for(var key in JSProblemState['groups']){
			if(key != 0){
				groupSpace.append('<div id="group' + loopy + '" class="group"><p class="title">' + JSProblemState['groups'][loopy] + '</p><br/></div>');
				console.log('added group' + loopy + ' named ' + JSProblemState['groups'][loopy]);
				if(loopy > 2){
					// Give groups beyond the first two a self-deletion button.
					$('#group'+loopy).append('<span class="deletegroup">x</span>');
					$('.deletegroup').on('click tap', function(event){selfDelete(event, cardSpace)});
				}
				loopy++;
			}
		}

	}
	
	// 'blank' adds a single blank group with number higher than any extant group.
	else if (options == 'blank'){
		
		// TODO: keep the user from adding more groups than there are cards.
		var groupCount = 0;
		for (key in JSProblemState['groups']) if (JSProblemState['groups'].hasOwnProperty(key)) groupCount++;
		var cardCount = 0;
		for (key in JSProblemState['cards']) if (JSProblemState['cards'].hasOwnProperty(key)) cardCount++;
		if(groupCount < (cardCount-1)){
		
			// Find the number of the highest existing group so we can number the new one properly.
			var groupNumbers = [];
			for(key in JSProblemState['groups']){
				groupNumbers.push(key);
			}
		
			var newGroupNum = Math.max.apply(Math, groupNumbers) + 1	// We're adding the *next* group.
		
			// Add the new blank group
			groupSpace.append('<div id="group' + newGroupNum + '" class="group"><p class="title">Group ' + newGroupNum + '</p><br/></div>');
				
			// Update the problem state to include this group.
			JSProblemState['groups'][String(newGroupNum)] = 'Group ' + newGroupNum;

			// Give it a self-deletion button.
			$('#group'+newGroupNum).append('<span class="deletegroup">x</span>');
			$('.deletegroup').on('click tap', function(event){selfDelete(event, cardSpace)});

		} else {
			
			alert('There must be fewer groups than cards. You must delete an existing group before adding another one.');
			
		}
		
	}
	
	// After adding, make sure all the groups are drop-targets.
	$( '.group' ).droppable({
		tolerance: 'pointer',
		hoverClass: 'drophighlight',
		drop: function(event, ui) {
			
			var draggedCard = $(ui.draggable);
			var groupTarget = $(this);
	
			// Remove this card from the card area, and put it inside its group.
			draggedCard.detach();
			draggedCard.appendTo($(this));
			
			// In JSProblemState, remove any previous pairings involving this card.
			removePairings(draggedCard);
			
			// Add new pairing to JSProblemState
			JSProblemState['pairings'].push(groupTarget.attr('id') + ', ' + draggedCard.attr('id'))
		}
	});
	
	// Click on group title to change it.
	$('p.title').on('click tap', function(){
	    var text = $(this).text();
		var groupNumber = $(this).parent().attr('id').substr(5);
	    nameChanger(this, text, groupNumber);
	});


}

// Handles name changes in groups.
function nameChanger(title, text, groupNumber){

	// Turn the paragraph into a text input area.
    $(title).replaceWith('<textarea id="grouprename">' + text + '</textarea>');
    inputarea = $('#grouprename');
    inputarea.focus();
    
    // Change name when return is pressed
    inputarea.keypress(function(e){
		var code = null;
		code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13){
		
			// Don't let the carriage return stick around.
			e.preventDefault();
			
			var inputtext = inputarea.val();
            inputarea.replaceWith('<p class="title">' + inputtext + '</p>');
            JSProblemState['groups'][groupNumber] = inputtext;
            
            // Need to reenable the listener that lets us change the name.
            $('p.title').on('click tap', function(){
                var text = $(this).text();
				var groupNumber = $(this).parent().attr('id').substr(5);
                nameChanger(this, text, groupNumber);
            });
		
		}
		
	});
	
	// Also change name if someone clicks outside the box or tabs away from it.
    inputarea.blur(function(){

		var inputtext = inputarea.val();
		inputarea.replaceWith('<p class="title">' + inputtext + '</p>');
		JSProblemState['groups'][groupNumber] = inputtext;
		
		// Need to reenable the listener that lets us change the name.
		$('p.title').on('click tap', function(){
			var text = $(this).text();
			var groupNumber = $(this).parent().attr('id').substr(5);
			nameChanger(this, text, groupNumber);
		});
		
	});

}

// Removes pairings for a particular card, typically in the process of moving them out of a group.
function removePairings(card){
	for(var i = 0; i < JSProblemState['pairings'].length; i++){
		if(JSProblemState['pairings'][i].match(card.attr('id'))){
			JSProblemState['pairings'].splice(i, 1);
			i--;	// We just took an element out of the array, so step back one.
		}
	}
}

// Callback function for the self-delete button that later groups have.
function selfDelete(event, cardSpace){

	var groupTarget = $(event.target).parent();
	var groupNumber = groupTarget.attr('id').substr(5);  // Strip off the word "group" from the id
	
	// Put all the cards back into the pile.
	var cardsInGroup = groupTarget.children('.card');
	cardsInGroup.detach();
	cardsInGroup.appendTo(cardSpace);
	for(var i = 0; i < cardsInGroup.length; i++){
		removePairings($(cardsInGroup[i]));
	}
	
	// Remove the group from JSProblemState
	delete JSProblemState['groups'][groupNumber];
	
	// Remove the group from the DOM
	groupTarget.remove();

}

// Used by the setState() function to put all the cards back in place.
function putCardsBack(){

	// Wipe the two starter groups and recreate them all according to the group list.
	$('.group').remove();
	loadGroups($('#groupspace'), $('#cardspace'), 'reload');
	
	// Go through all the pairings and put the cards into the correct places.
	// Remember that the first pairing is just null/null.
	for(var i = 1; i < JSProblemState['pairings'].length; i++){
		var cardID = JSProblemState['pairings'][i].match(/card\d+/);
		var matchingGroup = JSProblemState['pairings'][i].match(/group\d+/);
		var thisCard = $('#' + cardID);
		
		thisCard.detach();
		thisCard.appendTo($('#' + matchingGroup));
		console.log('adding ' + cardID + ' to ' + matchingGroup);
	}
}




$(document).ready(function(){
	
	var cardSpace = $('#cardspace');
	var groupSpace = $('#groupspace');
	
	loadCards(cardSpace);
	loadGroups(groupSpace, cardSpace, 'all');


	// If we drag a card back into the card area, take it out of its group and put it there.
	$( "#cardspace" ).droppable({
		tolerance: 'pointer',
		drop: function(event, ui) {
		
			var draggedCard = $(ui.draggable);
			var groupTarget = $(this);
		
			// Remove this card from its group and put it back in the pile.
			draggedCard.detach();
			draggedCard.appendTo($(this));
			
			// Remove old pairings for this card.
			removePairings(draggedCard);

		}
	});
		
	// Add a new blank group when someone clicks the plus button.
	$('#addgroup').on('tap click', function(){
		loadGroups(groupSpace, cardSpace, 'blank');
	});
	
	console.log('inner ready');

});

// This wrapper function is necessary.
var CardSortJS = (function() {

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
		putCardsBack();
		
	}

	// To keep students from seeing the solution that way, just pass the problem state back
	// and use python in the problem XML to analyze it.
	
	function getGrade() {
		console.log('getting grade');
		
		// Read the answer from the text area
		JSProblemState['answerGiven'] = $('#studentanswer').val();
				
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