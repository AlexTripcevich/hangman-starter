//global variables here: word, word array(s), guesses, guessedLetters
console.log(data.length)
//event listeners for startGame and guessLetter
//for example:
document.getElementById("start").addEventListener("click",startGame);

//once at start of the game
function startGame() {
    console.log("hi")

    let l = document.getElementById("guessedLetter").value
    console.log(l)
    document.getElementById("guessedLetters").innerHTML = l

    /*
    - Reset the board, empty guessedLetters 
    - Set a word from words array into word - this line will grab  a random element from your words array for you:
    word = words[Math.floor(Math.random() * words.length)];
    */
    
}

//at start and every time the user enters a guess
function printWord() {

/*
Compare each letter in answer word to the letters in guessedLetters using guessedLetters.indexOf(letter).  Use this to build the “_” word with the correctly guessed letters filled in.
there is a help video for this in classroom 
*/


}

//every time the user enters a guess
function guessLetter() {

/*
Manage the game: Add letters to guessedLetters, call printWord, deduct from guesses, check for a win or loss.
*/

}
