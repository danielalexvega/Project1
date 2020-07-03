//deal with local storage, storing drinks, storing books, random books, 


var drinkValue;
var containsAlcohol = true;
var title;
var author;
var description;
var imgURL;
var hasReview = false;

var bookTitle = $('#bookTitle');
var autherNameEl = $('#autherName');
var bookImg = $('#bookImg');
var bookDescriptionEl = $('#bookDescription');
var bookReviewEl = $('#bookReview');
var bookContainer = $('#bookContainer');
var drinkContainer = $('#drinkContainer');
var searchBtn = $('#search-btn');


var litArray = ['Lord of the Flies', '1984'];




//when the search button is clicked, I need to read the input.
searchBtn.on('click', function (event) {
    event.preventDefault();
    containsAlcohol = $('#alcoholicCheckbox').prop('checked');
    title = $('#search-term').val().trim();

    $('#recipeListEl').empty();

    // ***** Get Book Information from Google Books, calculate drink value, render elements *****
    makeCalls(title);
});

function calDrinkVal(author, title) {
    drinkValue = 0;
    let totalString = (author + title).trim();
    totalString = totalString.replace(/\s+/g, '').toUpperCase();

    for (let i = 0; i < totalString.length; i++) {
        drinkValue += totalString.charCodeAt(i);
    }
    drinkValue -= 500;
    drinkValue = containsAlcohol ? Math.floor(drinkValue / 7.57) : Math.floor(drinkValue / 68.97);
}

function renderElements() {
    bookTitle.text(title);
    autherNameEl.text(author);
    bookDescriptionEl.text(description);
    bookImg.attr('src', imgUrl);

    console.log(drinkValue);
}

function makeCalls(bookTitle) {
    var queryURL = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        author = response.items[0].volumeInfo.authors[0];
        title = response.items[0].volumeInfo.title;
        category = response.items[0].volumeInfo.categories[0];
        description = response.items[0].volumeInfo.description;
        imgUrl = response.items[0].volumeInfo.imageLinks.thumbnail;  //the width is 128 pixels

        calDrinkVal(author, title);  //calculate drinkValue
        drinkCalls();
        renderElements();
    });

    // ***** Get New York Times Review, render element *****
    var nytkey = 'MJTrpJJbUsVAAkzyjcaL8Vpkm73QTDlp';
    var nytURL = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${title}&api-key=${nytkey}`;

    $.ajax({
        url: nytURL,
        method: "GET"
    }).then(function (response) {
        if (response.results.length !== 0) {
            var reviewURL = response.results[0].url;
            bookReviewEl.attr("href", reviewURL);
        }
    });
}



