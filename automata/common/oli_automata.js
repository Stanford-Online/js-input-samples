var state = {
    'errors': 0,
    'completed': false,
    'genarray': new Array()
};

var startingState;

var HW = (function () {

    var channel;
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

    function getGrade() {
        userErrorsCount = 0;
        checkGeneration();
        state.errors = userErrorsCount;
        state.completed = true;
        return JSON.stringify(state);
    }

    function getState() {
        for (index = 0; index < GENERATION_MEMBER_COUNT; index++) {
            var activeGenerationMemberId = getGenerationMemberId(index, usersGenerationIndex);
            var cell = document.getElementById(activeGenerationMemberId);
            state.genarray[index] = cell.style.backgroundColor;
        }
        return JSON.stringify(state);
    }

    function setState() {
        state = JSON.parse(arguments[1]);
        for (index = 0; index < GENERATION_MEMBER_COUNT; index++) {
            var cellColor = state.genarray[index];
            var activeGenerationMemberId = getGenerationMemberId(index, usersGenerationIndex);
            var cell = document.getElementById(activeGenerationMemberId);
            cell.style.backgroundColor = cellColor;
        }
    }

    return {
        getState: getState,
        setState: setState,
        getGrade: getGrade
    };

}());

var cellColorName_1 = "black";
var cellColorName_0 = "white";
var cellColorName_x = "cyan";

var cellColorName_Correct = "green";
var cellColorName_Incorrect = "red";

var ruleValues = [0, 0, 0, 0, 0, 0, 0, 0];
var usersGenerationIndex = -1;
var userErrorsCount = 0;

var GENERATION_MEMBER_COUNT = 32;
var GENERATION_COUNT = 10;

//____________________________________________________________________________
// automatically set the correct values for the specified generation
function autoGeneration() {
    for (index = 0; index < GENERATION_MEMBER_COUNT; index++) {
        var generationMemberValue = calculateGenerationMemberValue(index)
        var activeGenerationMemberId = getGenerationMemberId(index, usersGenerationIndex);
        setCell(activeGenerationMemberId, generationMemberValue);
    }
}

//____________________________________________________________________________
// set the specified generation to be active
function activateGeneration(generationIndex) {
    var generationBlockPrefix = 'generationBlock_';
    var buttonNameCheckPrefix = 'button_check_';
    var buttonNameAutoPrefix = 'button_auto_';

    if (usersGenerationIndex > 0) {          // if there is a visible button, hide it
        var currentGenerationCheckButtonId = buttonNameCheckPrefix + usersGenerationIndex.toString();
        var currentGenerationCheckButton = document.getElementById(currentGenerationCheckButtonId);
        currentGenerationCheckButton.hidden = true;

        var currentGenerationAutoButtonId = buttonNameAutoPrefix + usersGenerationIndex.toString();
        var currentGenerationAutoButton = document.getElementById(currentGenerationAutoButtonId);
        currentGenerationAutoButton.hidden = true;
    }

    usersGenerationIndex = generationIndex;
    var newGenerationBlockId = generationBlockPrefix + usersGenerationIndex.toString();
    var newGenerationBlock = document.getElementById(newGenerationBlockId);
    newGenerationBlock.hidden = false;
}

//____________________________________________________________________________
// given the index of a generation to check, test that new generation for correctness
function checkGeneration() {
    for (index = 0; index < GENERATION_MEMBER_COUNT; index++) {
        var expectedValue = calculateGenerationMemberValue(index)
        var activeGenerationMemberId = getGenerationMemberId(index, usersGenerationIndex);
        var correctValue = getCellState(activeGenerationMemberId);

        var cell = document.getElementById(activeGenerationMemberId);
        if(cell.style.backgroundColor == cellColorName_Incorrect) {
            setCellCorrect(activeGenerationMemberId, false);
        }
        else {
            setCellCorrect(activeGenerationMemberId, (correctValue == expectedValue));
        }
    }
}

//____________________________________________________________________________
// given a cell id, toggle the background color (i.e. a white cell changes to black, a black cell changes to black)
function toggleCell(id) {
    var usersGenerationPattern = "generationCell_" + usersGenerationIndex.toString();
    if (id.indexOf(usersGenerationPattern) != -1) {   // only allow the user to change cells on the active row
        setCell(id, !getCellState(id));
    }
    state.completed = true;
}

//____________________________________________________________________________
// given a cell id, set the border color to correct or incorrect, depending
// on the value of the boolean; also increment the number or errors encountered
// if appropriate
function setCellCorrect(id, correct) {
    var cell = document.getElementById(id);
    if (cell != null) {
        if (correct) {
            //cell.style.backgroundColor = cellColorName_Correct;
        }
        else {
            cell.style.backgroundColor = cellColorName_Incorrect;
            userErrorsCount++;
        }
    }
}

//____________________________________________________________________________
// given a cell id, set the background color to "one" or "zero", depending on the value of the boolean
function setCell(id, toOne) {
    var cell = document.getElementById(id);
    if (cell != null) {
        if (toOne) {
            cell.style.backgroundColor = cellColorName_1;
        }
        else {
            cell.style.backgroundColor = cellColorName_0;
        }
    }
}

//____________________________________________________________________________
// given a cell id, set the background color to "unknown" state
function setCellUninitialized(id) {
    var cell = document.getElementById(id);
    cell.style.backgroundColor = cellColorName_x;
}

//____________________________________________________________________________
// given a cell id, return true if the cell is in the 1 state
function getCellState(id) {
    var cell = document.getElementById(id);
    return (cell.style.backgroundColor == cellColorName_1);
}

//____________________________________________________________________________
// set one element of the rule by element index and whether the result will be black
function setRuleElement(elementIndex0, turnsBlack) {
    var elementIndex = zeroPadHex(elementIndex0, 2);
    var leftCellId = 'ruleTop_' + elementIndex + "_4"
    var middletCellId = 'ruleTop_' + elementIndex + "_2"
    var rightCellId = 'ruleTop_' + elementIndex + "_0"
    var bottomCellId = 'ruleBottom_' + elementIndex

    setCell(rightCellId, elementIndex0 & 0x01);
    setCell(middletCellId, elementIndex0 & 0x02);
    setCell(leftCellId, elementIndex0 & 0x04);
    setCell(bottomCellId, turnsBlack);

    if (turnsBlack) {
        ruleValues[elementIndex0] = 1;
    }
    else {
        ruleValues[elementIndex0] = 0;
    }
}

//____________________________________________________________________________
// return a zero padded string representation of the supplied number in hex
function zeroPadHex(num, places) {
    var paddedValue = '0000000' + Math.pow(2, num).toString(16);
    return paddedValue.substr(paddedValue.length - places, places);
}

//____________________________________________________________________________
// write the rule indication block with the specified rule by its standard identifier
function establishRule(ruleNumber) {
    var bitMask = 0x01;
    var generationCellId;

    for (index = 0; index < 8; index++) {        // set each element of the rule block
        setRuleElement(index, ruleNumber & bitMask);
        bitMask += bitMask;
    }

    var generationZeroPattern = 0x4000744;
    for (index = 0; index < 32; index++) {        // set each element of the 0th generation to zero (but one)
        generationCellId = "generationCell_0_" + index.toString();
        var cellValue = generationZeroPattern & 0x80000000;
        generationZeroPattern = generationZeroPattern << 1;
        setCell(generationCellId, cellValue);
    }

    for (generationIndex = 1; generationIndex < GENERATION_COUNT; generationIndex++) {
        for (index = 0; index < GENERATION_MEMBER_COUNT; index++) {        // set each element of the 1st generation to unknown
            generationCellId = "generationCell_" + generationIndex.toString() + "_" + index.toString();
            if (index == 0 || index == 31) {          // first and last cells set to zero
                setCell(generationCellId, false);
            }
            else {
                setCellUninitialized(generationCellId);
            }
        }
    }
}

//____________________________________________________________________________
// given a generation member index and a generation index, return the cell id string
// of the indicated generation member cell
function getGenerationMemberId(generationMemberIndex, generationIndex) {
    var generationMemberId = "generationCell_" + generationIndex.toString() + "_" + generationMemberIndex.toString();
    return generationMemberId;
}

//____________________________________________________________________________
// operating on the active generation, look to the previous generation member
// values and apply the rules to produce the proper value for the specified
// generation member
function calculateGenerationMemberValue(memberIndex) {
    var activeGenerationMemberId = getGenerationMemberId(memberIndex, usersGenerationIndex);
    var calculatedValue;

    if (memberIndex == 0 || (memberIndex == GENERATION_MEMBER_COUNT - 1)) {  // extrema cells are always 0
        calculatedValue = 0;
    }
    else {
        var bit0_parentCellId = getGenerationMemberId(memberIndex - 1, usersGenerationIndex - 1);
        var bit1_parentCellId = getGenerationMemberId(memberIndex, usersGenerationIndex - 1);
        var bit2_parentCellId = getGenerationMemberId(memberIndex + 1, usersGenerationIndex - 1);

        var bit0_parentCellValue = getCellState(bit0_parentCellId);
        var bit1_parentCellValue = getCellState(bit1_parentCellId);
        var bit2_parentCellValue = getCellState(bit2_parentCellId);

        ruleNumber = bit0_parentCellValue * 0x04 +
                bit1_parentCellValue * 0x02 +
                bit2_parentCellValue * 0x01;

        calculatedValue = ruleValues[ruleNumber];
    }
    return calculatedValue;
}

$(document).ready(function() {
    establishRule(0xB6);
    activateGeneration(1);
    startingState=HW.getState();
});
