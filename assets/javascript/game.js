$(document).ready(function () {


    /* alert("testing js"); */
    /* var txt = document.getElementById("test");

    document.onkeyup = function(event) {
        txt.textContent = event.key;
      }; */

    /* var guessLetter = ""; */

    var randomWordArray = ["javascript", "csharp"];

    var randomWord = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];

    var blankString = "";
    var answerArr = [];
    var wrongLettersArr = [];
    var guessCount = 12;
    var wins = 0;
    var results = "";

    document.onkeyup = function (event) {
    
        var guessLetter = event.key;

        if (guessCount == 12) {
            results = "";
            $('#results').text(results);
        }

        if (guessCount != 0) {

            MatchLetters(guessLetter);
            if(randomWord === answerArr.join('')) {
                wins++;
                $('#wins').text(wins);
                $('#results').text('You won!');
                Reset();
            }
        }
    };


    function Initialize() {
        /* alert('initialize'); */
        //alert(randomWord);
        for (var i = 0; i < randomWord.length; i++) {
            answerArr[i] = "_";
        }

        blankString = answerArr.join(" ");
        //alert(s);
        $("#answer").text(blankString);
        $("#guesscount").text(guessCount);
        $('#lettersGuessed').text('');
    }

    Initialize();

    function UpdateLettersGuessed(wrongLetter) {
        if (wrongLettersArr.indexOf(wrongLetter) === -1) {
            wrongLettersArr.push(wrongLetter);
        }
    }

    function Reset() {
        randomWord = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
        blankString = "";
        answerArr = [];
        wrongLettersArr = [];
        guessCount = 12;
        Initialize();
    }

    function MatchLetters(letter) {
        var letterFound = false;
        for (var i = 0; i < randomWord.length; i++) {

            if (randomWord[i] === letter) {
                answerArr[i] = letter;
                letterFound = true;
            }
        }

        if (letterFound == false) {
            UpdateLettersGuessed(letter);
            guessCount--;
            $('#guesscount').text(guessCount);
            $('#lettersGuessed').text(wrongLettersArr.join(" "));
        }


        if (guessCount == 0) {
            if(wins != 0) {
                wins--;
            }
            results = "You Guessed to Many Letters! Guess a new word"
            $('#results').text(results);
            $('#wins').text(wins);
            Reset();
            //reset everything and tally wins and start over
        }
        else {
            $('#guesscount').text(guessCount);
            $('#answer').text(answerArr.join(" "));
        }


        /* $('#results').text(results); */
        /* alert(randomWord); */
        /* alert(answerArray.join("")); */
    }
});