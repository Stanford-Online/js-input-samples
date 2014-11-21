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
  
    label = '<div><div class="label-left openbig"><h3>'
      + elementsLeft[tableArrayLeft[i]].label 
      + ' <img src="tiny_magnifying_glass.png" class="openbig" />'
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
      + '"><h3>' 
      + elementsRight[tableArrayRight[i]].label 
      + ' <img src="tiny_magnifying_glass.png" class="openbig" />'
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
        + '<button type="button" aria-haspopup="true" aria-controls="contextual_menu" class="assign-options" data-element-number="' + tableArrayRight[i] + '" data-element-left="' + tableArrayLeft[i] + '">Add</button>' 
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
    thisElement = '<div tabindex="0" id="forreader' 
      + tableArrayRight[i]
      + '" aria-labelledby="'
      + 'labelfor' + tableArrayRight[i] + ' contentfor' + tableArrayRight[i]
      + '" aria-describedby="listfor'
      + tableArrayRight[i]
      + '" aria-haspopup="true">' 
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



  function build_menu(letter, number, parent) {

    var tableArrayLeft = [], 
        tableArrayRight = [], 
        tableArray = [], 
        totalTableLength = 0, 
        elementDiv = $('#elementtable'),
        contextual_menu = $('<div id="contextual_menu" class="popup-menu" aria-hidden="true" tabindex="-1"></div>'),
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
      options_options += '<li><input type="checkbox" id="' + this.label + '_label" name="element' + tableArrayLeft + '" value="element' + number + '" /><label for="' + this.label + '_label" class="option-label">' + this.label + '</label></li>';
    });

    $(options_menu).append(options_options);
    $(contextual_menu).append(options_menu).append(contextual_actions);
    $(parent).append(contextual_menu);

    if ($('#contextual_menu').length) {
      $('#contextual_menu').focus();
    }

    return;

  }

  function save_pairings(values, popup) {
    JSProblemState.pairings.push(values);
    addMatch(values);
    close_popup(popup);
  }

  function close_popup(popup) {
    $(popup).remove();
    $(popup).parent().find('button').focus();
  }

  $('.content').on('click keyup', '.assign-options', function() {
    var eLetter = $(this).data('element-left'),
        eNumber = $(this).data('element-number');

    build_menu(eLetter, eNumber, $(this).parent());
  });

  $('.content').on('click keyup', '#contextual_menu .save-options', function() {
    var inputs = $('#options_menu li input[type="checkbox"]'), 
        values = [];

      $(inputs).each(function() {
        if ($(this).is(':checked')) {
          var oLetter = $(this).attr('name'),
              oNumber = $(this).val();

          oLetter = oLetter.replace('element', '');
          oNumber = oNumber.replace('element', '');

          values.push([oLetter, oNumber]);
        }
      });

    save_pairings(values, $(this).parent().parent());
  });

  $('.content').on('click keyup', '#contextual_menu .cancel', function() {
    close_popup($(this).parent().parent());
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
    addMatch(indicatorSpace, letter, number);
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


function addMatch(indicatorSpace, letter, number){
  // Add to the DOM
  var indicator = '<li id="' + letter + '-' + number + '">' + elementsLeft[letter].label + '</li>';
  indicatorSpace.find('ul').append(indicator);

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
      indicatorSpace = $('#element'+number).find('drop-area');
      addMatch(indicatorSpace, letter, number);
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