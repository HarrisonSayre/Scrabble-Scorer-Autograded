// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

//Used for isVowel to check for point value in vowelBonusScorer
const vowels = ["A", "E", "I", "O", "U"];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// Your job is to finish writing these functions and variables that we've named //
// Don't change the names or your program won't work as expected. //
function initialPrompt() {
   let word = oldScrabbleScorer(input.question("Let's play some scrabble!\n\nEnter a word to score: "));
};

let newPointStructure = transform(oldPointStructure);
//Adds the blank tile for the bonus. Want transform to be "neutral", so don't hardcode it in the function but do it here. 
newPointStructure[" "] = 0;

//let simpleScorer; //do we comment this out? It's declared as a variable, not a function...

function simpleScorer(word){
   return(word.length); //If every letter is the same, only thing that matters is how long word is. Does count spaces. Symbols and numbers not allowed as inout, so don't need to check here.
}

//Used for vowel scoring
function isVowel(character){
   return vowels.includes(character);
}

//let vowelBonusScorer; //do we comment this out? It's declared as a variable, not a function...
function vowelBonusScorer(word){
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++){
      if(isVowel(word[i])){
         letterPoints += 3
      }else{
         letterPoints++;
      }
   }
   return letterPoints;
}

//let scrabbleScorer;
function scrabbleScorer(word){
   word = word.toLowerCase();
	let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i]]; 
   }
   return letterPoints;
}

//Checks to see if a word is legal to play.
function wordChecker(word){
   word = word.toLowerCase()
   //Iterate through input word.
   for(let i = 0; i < word.length; i++){
      //If it's not a letter or space it's not legal.
      if(newPointStructure[word[i]] === undefined){
         return false;
      };
   }
   //Legal input
   return true;
}

let simpleScorerStructure = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

let vowelBonusScorerStructure = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let ScrabbleScorerStructure = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScorerStructure, vowelBonusScorerStructure, ScrabbleScorerStructure];

function scorerPrompt() {
   let word = input.question("Let's play some scrabble!\n\nEnter a word to score: ")
   //Check to see user enters a legal scrabble word.
   let validWord = wordChecker(word);
   //Prompts to retype until they do so.
   while(validWord === false){
      word = input.question("Please enter a valid word to play in scrabble: ")
      validWord = wordChecker(word);
   }
   let mode = "";
   //Ensure only a proper mode is picked.
   while(mode != '0' & mode != '1' & mode != '2'){
      mode = input.question(`Which scoring algorithm would you like to use?   
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `)}
   score = scoringAlgorithms[mode].scorerFunction(word);
   console.log(`Score for ${word}: ${score}`);
}

function transform(structure) {
   let transformedStructure = {};
   for(item in structure){
      for(let i = 0; i < structure[item].length; i++){
         newKey = structure[item][i];
         newKey = newKey.toLowerCase(); 
         transformedStructure[newKey] = Number(item);
      }
   }
   return transformedStructure;
}

function runProgram() {
   //initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};