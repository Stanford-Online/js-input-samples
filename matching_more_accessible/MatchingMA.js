// Global variables elementsLeft and elementsRight are read in through another link in the the HTML.

// The "JSProblemState" JSON dictionary below is passed to the platform for grading and saving.
// Pass through whatever you wish. It will get logged.
var JSProblemState = {
  'pairings': [], // Pairings of the form [letter, number].
  'sighted': 'true'
};

// This one tracks whether we're working with sighted users (the default)
// or with blind or partially sighted users (switched with link).
var sighted = true;
  
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
        + jQuery('<p>' + elementsLeft[tableArrayLeft[i]].text + '</p>').text()  // Strip the tags from the text for alt text
        + '" class="icon" /></div></div>';
      $('#hiddenspace').append('<div id="bigelement' 
        + tableArrayLeft[i] 
        + '" class="bigelement" title="' 
        + elementsLeft[tableArrayLeft[i]].label 
        + '"><img src="' 
        + elementsLeft[tableArrayLeft[i]].imgURL 
        + '" alt="'
        + jQuery('<p>' + elementsLeft[tableArrayLeft[i]].text + '</p>').text()  // Strip the tags from the text for alt text
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
      + elementsRight[tableArrayRight[i]].label 
      + ' <img src="tiny_magnifying_glass.png" tabindex="0" alt=", click to enlarge" class="openbig" />'
      + '</h3></div></div>';
    dropArea = '<div class="drop-area">'
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
        + jQuery('<p>' + elementsRight[tableArrayRight[i]].text + '</p>').text()  // Strip the tags from the text for alt text
        + '" class="icon" /></div>'
        + dropArea 
        + '</div>';
      $('#hiddenspace').append('<div id="bigelement' 
        + tableArrayRight[i]
        + '" class="bigelement" title="' 
        + elementsRight[tableArrayRight[i]].label 
        + '"><img src="' 
        + elementsRight[tableArrayRight[i]].imgURL 
        + '" alt="'
        + jQuery('<p>' + elementsRight[tableArrayRight[i]].text + '</p>').text()  // Strip the tags from the text for alt text
        + '" />&nbsp;</div>');
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
        + '<button type="button" aria-haspopup="true" aria-controls="contextual_menu" class="assign-options" data-element-number="' + tableArrayRight[i] + '" data-element-left="' + tableArrayLeft[i] + '">Make selections</button>' 
        + '</div>'
        + dropArea
        + '</div>';
      $('#hiddenspace').append('<div id="bigelement' 
        + tableArrayRight[i]
        + '" class="bigelement" title="' 
        + elementsRight[tableArrayRight[i]].label 
        + '">' 
        + elementsRight[tableArrayRight[i]].text 
        + '&nbsp;</div>');
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
    revert: 'invalid',  // Snap back visibly if not dropped to a valid location.
    helper: 'clone'   // This helps when dragging out of scrollable areas.
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
    var newID = 'big' + $(this).parents('.bigboss').attr('id');
    
    // Slightly different procedure for images and text cards.
    var modalWidth = 'auto';
    if($(this).parents('.bigboss').hasClass('text')){ modalWidth = 650; }
    
    $('#' + newID).dialog({
      width: modalWidth,
      modal: true,
      closeOnEscape: true,
      open: function(){     // Close that if they click outside the image.
        $('.ui-widget-overlay').on('click tap',function(){
          $('#' + newID).dialog('close');
        });
      }
    });
  });




  /* ----------------------------------------------
   * fn update_selected_options(number, letter);
   *      number = string
   *      letter = string
   *
   * fn build_menu(letter, number, parent);
   *      letter = string
   *      number = string
   *      parent = object
   *
   * fn save_pairings(values, popup);
   *      values = array
   *      popup = object
   *
   * fn close_popup(popup);
   *      popup = object
   * -------------------------------------------- */

  function update_selected_options(number, letter) {
    
    console.log('Running function: update_selected_options...');
    console.log('Looping through checkboxes in the open popup menu...');

    if ($('#contextual_menu').is(':visible')) {
      console.log('OK!');

      $('input[type="checkbox"]').each(function(i) {
        var oL = $(this).attr('name'),
            oN = $(this).val(),
            needle;

        oLetter = oL.replace('element', '');
        oNumber = oN.replace('element', '');
        needle = [oLetter, oNumber];

        console.log(JSProblemState.pairings);
        console.log(needle);

        if (!_.isEmpty(JSProblemState.pairings)) {

          $.each(JSProblemState.pairings[0], function(i) {
            if ($.inArray(needle, JSProblemState.pairings[i]) > -1) {
            
              console.log('Setting the state to checked.');
              $(this).prop('checked', true).attr('checked', 'checked');
            } else {
              
              console.log('Setting the state to unchecked.');
              $(this).removeProp('checked').removeAttr('checked');
            }
          });
        }
      });
    } else {
      console.log('Can\'t find the popup menu! Aborting!');
    }

  }

  function build_menu(letter, number, parent) {
    
    console.log('Running function: build_menu...');
    var tableArrayLeft = [], 
        tableArrayRight = [], 
        tableArray = [], 
        totalTableLength = 0, 
        elementDiv = $('#elementtable'),
        contextual_menu = $('<div id="contextual_menu" class="popup-menu" tabindex="-1"></div>'),
        options_menu = $('<ol id="options_menu" class="popup-options"></ol>'), 
        options_options = '',
        contextual_actions = '<div class="popup-actions"><button type="button" class="save-options" data-save-options-for="element"' + tableArrayLeft[i] + '>Save</button><button type="button" class="cancel">Cancel</button></div>';
 
    for (var key in elementsLeft) {
      tableArrayLeft.push(key);
    }
    
    for (var key in elementsRight) {
      tableArrayRight.push(key);
    }
    
    $.each(elementsLeft, function(tableArrayLeft, i) {
      options_options += '<li><label for="element_' + tableArrayLeft + '_' + number + '" class="option-label" aria-describedby="description' + tableArrayLeft + '"><input type="checkbox" id="element_' + tableArrayLeft + '_' + number + '" name="element' + tableArrayLeft + '" value="element' + number + '" /> ' + this.label + '</label></li>';
    });

    $(options_menu).append(options_options);
    
    console.log('Built the checkbox menu.');
    $(contextual_menu).append(options_menu).append(contextual_actions);
    
    console.log('Attached the menu to the popup.');
    $(parent).append(contextual_menu);
    
    console.log('Displaying the popup menu with options.');
    update_selected_options(number, letter);
    
    console.log('Updating the selected options, if available.');
  }

  function save_pairings(values, popup) {
    
    console.log('Running function: save_pairings...');
    // JSProblemState.pairings.push(values);
    for (var i = 0; i < JSProblemState.pairings.length; i++){
      if (JSProblemState.pairings[1] == values[0][1]) {
        JSProblemState.pairings.splice(i, 1);
      }
    }

    $.each(values, function(k, ob) {
      JSProblemState.pairings.push(ob);
      console.log(ob);
    });
    
    console.log('Looping through selected options and adding options to bulk.');
    $.each(values, function(i) {
      addMatch([values[i][0], values[0][1]]);
    });
    
    console.log('Closing the popup after adding/updating matches.');
    close_popup(popup);
  }

  function close_popup(popup) {
    
    console.log('Running function: close_popup...');
    $(popup).remove();
    
    console.log('Popup removed.')
    $(popup).parent().find('button').focus();
    
    console.log('Focus sent back to initiating button.');
  }

  $('.content').on('click', '.assign-options', function() {
    
    console.log('Button clicked, assigning matches...');
    var eLetter = $(this).data('element-left'),
        eNumber = $(this).data('element-number');
    
    console.log('Creating the popup menu...');
    build_menu(eLetter, eNumber, $(this).parent());
  });

  $('.content').on('click', '#contextual_menu .save-options', function() {
    
    console.log('Button clicked, saving selections...');
    var inputs = $('#options_menu li input[type="checkbox"]'), 
        values = [];

    $(inputs).each(function() {
      
      console.log('Looping through each checkbox to see if its selected...');
      if ($(this).is(':checked')) {
        
        console.log('Found checked.');
        var oLetter = $(this).attr('name'),
            oNumber = $(this).val();

        console.log('Replacing strings...');
        oLetter = oLetter.replace('element', '');
        oNumber = oNumber.replace('element', '');
        
        console.log('Building values array...');
        values.push([oLetter, oNumber]);
        
        console.log('Values:' + values);
      }
    });

    console.log('Saving selections.');
    save_pairings(values, $(this).parent().parent());
  });

  $('.content').on('click', '#contextual_menu .cancel', function() {
    
    console.log('Button clicked, closing open popup menu.');
    close_popup($('.popup-menu'));
  });

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
      console.log('existing match');
      break;
    }
  }
  
  // If not, add visual indication of the match and update JSProblemState.
  if(!existingMatch){
    
    // Copy the title from the left-hand element and add it to the indicator space.
    var indicatorSpace = targetElement.find('.drop-area');
    addMatch([letter, number]);
    JSProblemState.pairings.push(thisPairing);
  }
}

function handleCheck(event, checkbox){

  // Check for existing match in the problem state.
  var leftID = $(checkbox).attr('name');
  var letter = leftID.replace('element', '');
  var rightID = $(checkbox).attr('value');
  var number = rightID.replace('element', '');
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


function addMatch(pairing){
  // Add to the DOM
  var indicator = '<li id="' + pairing[0] + '-' + pairing[1] + '">' + elementsLeft[pairing[0]].label + '</li>';
  indicatorSpace = $('#element' + pairing[1]).find('ul').append(indicator);

  // Give this a removal button.
  $('#' + pairing[0] + '-' + pairing[1]).append('<button type="button" class="delete">x</button>');
  $('.delete').on('click tap', function(event){selfDelete(event)}); 
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
      indicatorSpace = $('#element'+number).find('drop-area');
      addMatch([letter, number]);
    }else{
      thisCheckbox = $('#row'+letter).find('input[value="element' + number + '"]');
      thisCheckbox.prop('checked', true);
    }
  }
  
}

function setUpSpace(){

  // Set up the space differently for sighted vs. screen-reader
  var space = $('#spacewrapper');
  var switcher = $('#switcher');
  var instructions = $('#instructions');  
  
  if(sighted){
    // Bring in the left-hand and right-hand elements in our standard space.
    space.html('<div id="leftelements"></div><div id="rightelements"></div><div id="hiddenspace"></div>');
    switcher.html('[Click here for accessible version.]');
    instructions.html('[Drag from left to right to match. Click to zoom.]');
    loadElementsSighted();
  }else{
    // Build a view for people who are blind or partially sighted.
    space.html('<div id="elementtable"></div>');
    switcher.html('[Click here for sighted version.]');
    instructions.html('[Use checkboxes in the table below to put items into categories.]');
    loadElementsScreenReader();
  }
}


$(document).ready(function(){
  
  // Called as a default for first-runs.
  loadElementsSighted();

  var space = $('#spacewrapper');
  var switcher = $('#switcher');
  var instructions = $('#instructions');  
    
  // Different spaces for blind and partially sighted learners.
  // These will be rebuilt from the JSProblemState rather than being saved.
  $('#switcher').on('click tap', function(event){
    event.preventDefault();
    if(sighted){
      space.html('<div id="elementtable"></div>');
      switcher.html('[Click here for sighted version.]');
      instructions.html('[Use checkboxes in the table below to put items into categories.]');
      sighted = false;
      JSProblemState.sighted = 'false';
      loadElementsScreenReader();
    }else{
      space.html('<div id="leftelements"></div><div id="rightelements"></div><div id="hiddenspace"></div>');
      switcher.html('[Click here for accessible version.]');
      instructions.html('[Drag from left to right to match. Click to zoom.]');
      sighted = true;
      JSProblemState.sighted = 'true';
      loadElementsSighted();
    }
    putMatchesBack();

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
    
    // Update the sighted variable from the state
    sighted = (JSProblemState.sighted == 'true');
    
    // Put the cards in the correct locations based on what the problem state says.
    setUpSpace();
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