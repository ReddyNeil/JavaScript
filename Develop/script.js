// Assignment Code
var generateBtn = document.querySelector("#generate");

// Map to store character types and their properties
var charTypes = new Map([
  ['lowercase', {chars: 'abcdefghijklmnopqrstuvwxyz', prompt: 'include lowercase letters'}],
  ['uppercase', {chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', prompt: 'include uppercase letters'}],
  ['numbers', {chars: '0123456789', prompt: 'include numbers'}],
  ['special', {chars: '!@#$%^&*()_-+={}[];:\'`~<,>.?/|', prompt: 'include special characters'}]
]);

var passwordLength;
// Map to store user's choices for character types
var charChecks = new Map();

// Function to determine the length of the password
function determineLength() {
  while (true) {
    passwordLength = prompt("Choose how many characters long you'd like your password to be (between 8-128 characters): ");
    if (passwordLength === null) {
      return; // User clicked cancel
    } else if (passwordLength >= 8 && passwordLength <= 128 && !isNaN(passwordLength)) {
      break;
    } else {
      alert("Password length must be a number between 8-128 characters");
    }
  }
}

// Function to determine if user wants a specific character type in the password
function determineCharacterType(type) {
  while (true) {
    var response = prompt(`Do you want to ${charTypes.get(type).prompt} in your password? (Yes or No)`);
    if (response === null) {
      return; // User clicked cancel
    } else if (response.toLowerCase() === 'yes') {
      charChecks.set(type, true);
      break;
    } else if (response.toLowerCase() === 'no') {
      charChecks.set(type, false);
      break;
    } else {
      alert("Please answer Yes or No");
    }
  }
}

// Function to get a random character from a set of characters
function getRandomChar(characters) {
  return characters[Math.floor(Math.random() * characters.length)];
}

// Function to generate the password
function generatePassword() {
  determineLength();

  if (passwordLength === null) {
    return "Cancelled"; // User clicked cancel
  }

  // Loop through each character type to determine user's preference
  charTypes.forEach((value, key) => {
    determineCharacterType(key);
  });

  var characters = '';
  // Build a string of characters based on user's preferences
  charChecks.forEach((value, key) => {
    if (value) {
      characters += charTypes.get(key).chars;
    }
  });

  // If no character types selected, default to lowercase
  if (characters === '') {
    characters = charTypes.get('lowercase').chars;
  }

  var password = '';
  // Generate the password using selected characters
  for (var i = 0; i < passwordLength; i++) {
    password += getRandomChar(characters);
  }

  return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
