const quotes = [
    "Verily all actions are based on your intentions, and everyone will get what was intended.",
    "He who innovates into Islam that which is not of it will have it rejected.",
    "What I have forbidden for you, avoid. What I have ordered you, do as much of it as you can. For verily, it was only their excessive questioning and disagreeing with their Prophets that destroyed who were before you.",
    "Leave what makes you doubtful for what does not.",
    "Part of the perfection of one's Islam is his leaving that which does not concern him.",
    "None of you truely believes until you love for your brother what you love for yourself.",
    "There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift for him.",
    "this is not a hadith, 13sec or less",
    "All drinks that intoxicate are unlawful.",
    "The one providing water for people is the last of them to drink.",
    "The Messenger of Allah would repeat a statement three times so that it could be understood.",
    "O you people False witness is tantamount to Shirk with Allah",
    "The best of witnesses is the one who gives his testimony before being asked for it.",
    "Shall l not inform you of the best of witnesses? The one who comes with his testimony before being asked for it.",
];

// array for storing the words of the current challenge
let words = [];
// stores the index of the word the player is currently typing
let wordIndex = 0;
// sets the cuurent time as a variable (will be set on start)
let startTime = Date.now();

// grabs page elements (from html)
const quoteElement = document. querySelector('#quote');
const messageElement = document.querySelector('#message');
const typedValueElement = document.querySelector('#typed-value');

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
