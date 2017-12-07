$(document).ready(function () {


    var randomWordArray = ["java", "ruby", "swift", "python", "php", "mysql", "javascript", "csharp"];
    //var randomWordArray = ["java","php"];

    var randomWord = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
    randomWord = randomWord.toUpperCase();

    var blankString = "";
    var answerArr = [];
    var wrongLettersArr = [];
    var guessCount = 12;
    var wins = 0;
    var results = "";

    document.onkeyup = function (event) {

        var guessLetter = event.key;

        if (guessCount == 12) {
            //results = "";
            // $('#results').text(results);
            $('#results').empty();
        }

        if (guessCount != 0) {

            MatchLetters(guessLetter);
            if (randomWord === answerArr.join('')) {
                wins++;
                $('#wins').text(wins);
                // $('#results').text('You won!');
                var newElement = $('<img>');
                $('#results').append(newElement);
                //newElement.attr('src','assets/images/java.png')
                var imgSource = "assets/images/" + randomWord.toLowerCase() + ".png";
                newElement.attr('src', imgSource);
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
        if (wrongLettersArr.indexOf(wrongLetter.toUpperCase()) === -1) {
            wrongLettersArr.push(wrongLetter.toUpperCase());
            guessCount--;
        }
        /* if(wrongLetter === "Shift") {
        }
        else if (wrongLettersArr.indexOf(wrongLetter.toUpperCase()) === -1) {
            wrongLettersArr.push(wrongLetter.toUpperCase());
        } */
    }

    function Reset() {
        randomWord = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
        randomWord = randomWord.toUpperCase();
        blankString = "";
        answerArr = [];
        wrongLettersArr = [];
        guessCount = 12;
        Initialize();
    }

    function MatchLetters(letter) {
        var letterFound = false;
        for (var i = 0; i < randomWord.length; i++) {

            if (randomWord[i] === letter.toUpperCase()) {
                answerArr[i] = letter.toUpperCase();
                letterFound = true;
            }
        }

        if (letterFound == false) {
            UpdateLettersGuessed(letter);
            $('#guesscount').text(guessCount);
            $('#lettersGuessed').text(wrongLettersArr.join(" "));
            /* if(wrongLetter === "Shift") {
            }
            else{
                guessCount--;
                
                $('#guesscount').text(guessCount);
                $('#lettersGuessed').text(wrongLettersArr.join(" "));
            } */

        }

        if (guessCount == 0) {
            if (wins != 0) {
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

    }
});