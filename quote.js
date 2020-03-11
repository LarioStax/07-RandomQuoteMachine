const URL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
let currentQuote = "";
let currentAuthor = "";
let quoteDisplay = document.getElementById("text");
let authorDisplay = document.querySelector("#author");
const newQuoteButton = document.querySelector("#new-quote");
const newTweet = document.querySelector("#tweet-quote");



newQuoteButton.addEventListener("click", sendRequest);

function sendRequest() {
  axios.get(URL)
  .then(updateQuoteAndAuthor)
  .catch(handleError)
}

function updateQuoteAndAuthor(data) {
  let random = Math.floor(Math.random() * data.data.quotes.length);
  currentQuote = data.data.quotes[random].quote;
  currentAuthor = data.data.quotes[random].author;
  quoteDisplay.innerHTML = currentQuote;
  authorDisplay.innerHTML = "- " + currentAuthor;
  setTweet();
}

function handleError(error) {
  quoteDisplay.innerHTML = "Something went wrong. " + error + ".";
  authorDisplay.innerHTML = "";
}

function setTweet() {
  let tweetURL = "https://twitter.com/intent/tweet?text=" + '"' + encodeURI(currentQuote) + '" - ' + encodeURI(currentAuthor);
  newTweet.setAttribute("href", tweetURL);
}

function init() {
  newQuoteButton.click();
  setTweet();
}

init();

// https://twitter.com/intent/tweet?text=%22Every%20strike%20brings%20me%20closer%20to%20the%20next%20home%20run.%22%20Babe%20Ruth

// newQuoteButton.addEventListener("click", function() {
//   let XHR = new XMLHttpRequest();
//   XHR.onreadystatechange = function() {
//     if (XHR.readyState === 4) {
//       if (XHR.status === 200) {
//         var data = JSON.parse(XHR.responseText);
//         console.log(data);
//         quoteDisplay.innerHTML = data.quotes[2].quote;
//       } else {
//         quoteDisplay.innerHTML = "Something went wrong. Error: " + XHR.status;
//       }

//     }
//   }
//   XHR.open("GET", URL);
//   XHR.send();
// })