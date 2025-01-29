const textInput = document.getElementById('textInput');
const textOutput1 = document.getElementById('textOutput1');
const textOutput2 = document.getElementById('textOutput2');
const textOutput3 = document.getElementById('textOutput3');
const copyButton1 = document.getElementById('copyButton1');
const copyButton2 = document.getElementById('copyButton2');
const copyButton3 = document.getElementById('copyButton3');
const pasteButton = document.getElementById('pasteButton');

// List of special characters to remove
const specialCharacters = ['-', '/', '.', ';', ',', '(', ')', '{', '}', '[', ']', ':', '_', '+'];
// List of words that should not be capitalized
const exceptions = ['de', 'la', 'los', 'las', 'el', 'lo', 'un', 'una', 'uno', 'unas', 'unos', 'y', 'en', 'a', 'os', 'as', 'o', 'lo', 'um', 'uma', 'um', 'umas', 'uns', 'e', 'dos', 'em'];

// Text processing
const processText = () => {
    let text = textInput.value;

    // Step 1: Trim spaces before and after the text
    text = text.trim();

    // Step 2: Remove special characters
    specialCharacters.forEach(char => {
        const regex = new RegExp(`\\${char}`, 'g');
        text = text.replace(regex, ' ');
    });

    // Step 3: Remove double spaces
    text = text.replace(/\s\s+/g, ' ');

    // Output before capitalization
    textOutput1.innerHTML = text;

    // Step 4: Convert all words to lowercase
    text = text.toLowerCase();

    // Step 5: Capitalize the first letter of the entire sentence
    const capitalizedSentence = text.charAt(0).toUpperCase() + text.slice(1);

    // Step 6: Capitalize the first letter of each word, except for exceptions
    const capitalizedWithExceptions = text.split(' ').map((word, index) => {
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

    // Update the outputs
    textOutput2.innerHTML = capitalizedSentence;
    textOutput3.innerHTML = capitalizedWithExceptions;
}

// Paste Text
pasteButton.addEventListener('click', () => {
    navigator.clipboard.readText().then(text => {
        textInput.value = text;
        processText(); // Optionally process the text immediately after pasting
    }).catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
});

// Copy Text
const copyText = (outputElement) => {
    const textToCopy = outputElement.innerText;
    navigator.clipboard.writeText(textToCopy).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

textInput.addEventListener("keyup", processText);
copyButton1.addEventListener("click", () => copyText(textOutput1));
copyButton2.addEventListener("click", () => copyText(textOutput2));
copyButton3.addEventListener("click", () => copyText(textOutput3));
