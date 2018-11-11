// create an array of strings, 
// each one related to a stock symbol that interests you. Save it to a variable called `stocksList`

var stocksList = ['FB','AMZN', 'MSFT','BLDR', 'SNAP','CNAT'];

// Your app should take the stocks in this array and create buttons in your HTML.
const createButton = function () {
  // for loop to go through array length and make buttons for them

for (let i = 0; i < stocksList.length; i++) {
  const element = stocksList[i];
  console.log(element);
  
  // create a variable for buttons
  const stockBtn = $('<button>');
  // give the button a class 'createBtn'
stockBtn.addClass('createBtn');
// give btn attr
stockBtn.attr('data-name', element);
// add a text to the stockBtn, which is the element name
stockBtn.text(element);
// append the buttons to html div 'magicBtns'
$('.magicBtns').append(stockBtn);
}
}
createButton();


// When the user clicks on a button, the page should grab the company name, 
// logo, price, and up to 10 news articles related to the stock from the 
// iexTrading API and place them on the page.










// $.ajax({
//   Url:'https://api.nytimes.com/svc/search/v2/articlesearch.json?',
//   Method:'GET'
//   })
  
//   .done(function() { 
// console.log('response');})
  
//   .fail (function () {
// console.log(`say what ever you want if you can't get request`);
//   });














// /ref-data/symbols