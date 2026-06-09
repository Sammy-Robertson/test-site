
function chooseRandomListItem(x) {
    return x[Math.floor(Math.random(x.length) * x.length)];
}

function setFieldToBlank(fieldId) {
    document.getElementById(fieldId).value = "";
    return;
}

function showMessage(messageType, word, messageContainerID = "message") {
    if (messageType == "guessConfirmation") {
        document.getElementById(messageContainerID).innerHTML = "You guessed \"" + word + "\""
    } else if (messageType == "tooShort") {
        document.getElementById(messageContainerID).innerHTML = "\"" + word + "\" is not 5 letters long"
    } else if (messageType == "notValid") {
        document.getElementById(messageContainerID).innerHTML = "\"" + word + "\" is not a recognised word"
    } else if (messageType == "alreadyGuessed") {
        document.getElementById(messageContainerID).innerHTML = "You already guessed \"" + word + "\""
    } else if (messageType == "reveal") {
        document.getElementById(messageContainerID).innerHTML = "The secret word is \"" + word + "\""
    }
}

function revealWord() {
    showMessage("reveal", attempt.target);
}

function checkGuess(guess, target) {
    wordLength = guess.length;
    guessLetters = guess.split("");
    targetLetters = target.split("");
    checkResults = [null, null, null, null, null];

    // check for letter and position matches
    for (let i = 0; i < wordLength; i++) {
        if (guessLetters[i] == targetLetters[i]) {
            checkResults[i] = 2;
            guessLetters[i] = null;
            targetLetters[i] = null;
        }
    }

    // check for letter but not position matches
    for (let i = 0; i < wordLength; i++) {
        for (let j = 0; j < wordLength; j++) {
            if (guessLetters[i] != null && guessLetters[i] == targetLetters[j]) {
                checkResults[i] = 1;
                guessLetters[i] = null;
                targetLetters[j] = null;
            }
        }
    }

    // check for mismatches
    for (let i = 0; i < wordLength; i++) {
        if (guessLetters[i] != null) {
            checkResults[i] = 0;
            guessLetters[i] = null;
            targetLetters[i] = null;
        }
    }

    // 0 = no match; 1 = letter but not pos; 2 = letter and pos
    return checkResults;
}

function takeTurn(guess, target) {
    turnResults = checkGuess(guess, target);
    updateRow(attempt.guessNumber, guess, turnResults);
    updateKeyboard(guess, turnResults);
    attempt.guessHistory.push(guess);
    attempt.resultHistory.push(turnResults);
    attempt.guessNumber += 1;
}

// functions to update cell colour/text
function updateRow(y, word, results) {
    for (let x = 0; x < setLength; x++) {
        updateCell(y, x, word[x], colours[results[x]]);
    }
}
function updateCell(y, x, letter, colour) {
    updateCellLetter(y, x, letter);
    updateCellColour(y, x, colour);
}
function updateCellLetter(y, x, letter) {
    document.getElementById("resultBox" + y + x).innerHTML = letter;
}
function updateCellColour(y, x, colour) {
    document.getElementById("resultBox" + y + x).classList.add(colour);
}

// functions to update keyboard key colours
function updateKeyboard(word, results) {
    for (let i = 0; i < setLength; i++) {
        updatekeyboardCell(word[i], colours[results[i]])
    }
}


function updatekeyboardCell(letter, colour) {
    document.getElementById(letterKeyAssociations[letter]).classList.add(colour);
}


function handleTurn() {
    var guess = document.getElementById("guessField").value.toLowerCase();
    if (attempt.guessNumber < 6) {
        if (checkGuessIsNewAndValid(guess)) {
            showMessage("guessConfirmation", guess);
            takeTurn(guess, attempt.target);
        }
    }
    setFieldToBlank("guessField");
}

function checkGuessIsNewAndValid(guessWord) {
    if (!checkWordLength(guessWord, 5)) {
        showMessage("tooShort", guessWord)
    } else if (!checkWordIsValid(guessWord)) {
        showMessage("notValid", guessWord)
    }
    else if (!checkWordIsNew(guessWord)) {
        showMessage("alreadyGuessed", guessWord)
    } 
    else {
        return true;
    }
    return false;
}

function checkWordIsValid(word) {
    return largeWordList.includes(word);
}

function checkWordIsNew(word) {
    return !attempt.guessHistory.includes(word);
}

function checkWordLength(word, length) {
    return word.length == length;
}
const attempt = {
    guessNumber: 0,
    guessHistory: [],
    resultHistory: [],
    target: chooseRandomListItem(solutionsList),
};

const colours = ["grey", "yellow", "green"];

const setLength = 5;


const letterKeyAssociations = {
    "a": "keyA",
    "b": "keyB",
    "c": "keyC",
    "d": "keyD",
    "e": "keyE",
    "f": "keyF",
    "g": "keyG",
    "h": "keyH",
    "i": "keyI",
    "j": "keyJ",
    "k": "keyK",
    "l": "keyL",
    "m": "keyM",
    "n": "keyN",
    "o": "keyO",
    "p": "keyP",
    "q": "keyQ",
    "r": "keyR",
    "s": "keyS",
    "t": "keyT",
    "u": "keyU",
    "v": "keyV",
    "w": "keyW",
    "x": "keyX",
    "y": "keyY",
    "z": "keyZ",
}


var guessField = document.getElementById("guessField");

guessField.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    document.getElementById("submitGuess").click();
  }
}); 