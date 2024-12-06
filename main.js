const textInput = document.getElementById('textInput');
const textOutput = document.getElementById('textOutput');
const processButton = document.getElementById('processButton');
const copyButton = document.getElementById('copyButton');

// List of special characters to remove
const specialCharacters = ['-', '/', '.', ';', ',', '(', ')', '{', '}', '[', ']', ':', '_', '+'];
// List of words that should not be capitalized
const exceptions = ['de', 'la', 'los', 'las', 'el', 'lo', 'un', 'una', 'uno', 'unas', 'unos', 'y', 'en', 'a', 'os', 'as', 'o', 'lo', 'um', 'uma', 'um', 'umas', 'uns', 'e', 'dos', 'em'];


// Text processing
const processText = () => {
    let text = textInput.value;

    // Step 1: Remove special characters
    specialCharacters.forEach(char => {
        const regex = new RegExp(`\\${char}`, 'g');
        text = text.replace(regex, '');
    });

    // Step 2: Remove double spaces
    text = text.replace(/\s\s+/g, ' ');

    // Step 3: Convert all words to lowercase
    text = text.toLowerCase();

    // Step 4: Capitalize the first letter of each word, except for exceptions
    text = text.split(' ').map((word, index) => {
        // Capitalize the first word
        if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        // Capitalize if it's not an exception
        if (!exceptions.includes(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    }).join(' ');

    // Update the output
    textOutput.innerHTML = text;
}

// Copy Text

const copyText = () => {
    
    var textToCopy = textOutput.innerHTML
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(textToCopy);

  }

textInput.addEventListener("keyup", processText);

processButton.addEventListener("click", processText);

copyButton.addEventListener("click", copyText);


