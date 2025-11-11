const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// array for storing the words of the current challenge
let words = [];
// stores the index of the word the player is currently typing
let wordIndex = 0;
// sets the cuurent time as a variable (will be set on start)
let startTime = Date.now();

// grabs page elements (from html)
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', function () {
  // selects a random quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // splits the quote by word and puts them into an array
  words = quote.split(' ');
  // resets word index for tracking
  wordIndex = 0;

  // UI updates
  // creates an array of span elements so it can assign a class
  const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  // converts above into string and inserts into inner .html on quote display with innerHTML
  quoteElement.innerHTML = spanWords.join(''); 
  // highlights the first word
  quoteElement.childNodes[0].className = 'highlights';
  // clears all prior messages
  messageElement.innerText = '';

  // setups the textbox
  // clears the textbox
  typedValueElement.value = '';
  // sets focus
  typedValueElement.focus();
  // sets event handler

  // starts the timer
  startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', (e) => {
  // gets current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // at the end of the sentance
    // display success message
    const elapsedTime = new Date().getTime() - startTime;
    const message =`CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // at the end of the word
    // clear the typedValueElement for the new word
    typedValueElement.value = '';
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    // hightlight the new word
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = '';
  } else {
    // error state
    typedValueElement.className = 'error';
  }
});