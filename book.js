//deal with local storage, storing drinks, storing books, random books, 


var drinkValue;
var containsAlcohol = true;
var title;
var author;
var description;
var imgURL;
var hasReview = false;
var bookImg;
var bookLoaded = false;
var savedBookArr;
var hasImg = false;
var hasDescription = false;

var bookTitle = $('#bookTitle');
var autherNameEl = $('#autherName');
var bookDescriptionEl = $('#bookDescription');
var bookReviewEl = $('#bookReview');
var bookImgDiv = $('#bookImageDiv');
var bookContainer = $('#bookContainer');
var bookCol = $('#bookCol');
var drinkContainer = $('#drinkContainer');
var searchBtn = $('#search-btn');
var saveBookBtn = $('#saveBookBtn');
var saveDrinkBtn = $('#saveDrinkBtn');
var bookShelfBtn = $('#bookShelf-btn');  //fix the button naming convention
var barCartBtn = $('#barCart-btn');
var topShelfBtn = $('#topShelf-btn');

var litArray = ['Lord of the Flies', '1984', "The Handmaid's Tale", 'The Great Gatsby', 'Things Fall Apart', 'To Kill a Mockingbird', 'Farewell to Arms', 'Invisible Man', 'On the Road', "One Flew Over the Cuckoo's Nest", 'Catch-22', 'The Catcher in the Rye', 'Fahrenheit 451', 'East of Eden', 'Breakfast of Champions'];


function loadBookStorage() {
    title = localStorage.getItem('title');
    if(title === null || title === '') {
        makeCalls(litArray[Math.floor(Math.random() * litArray.length)]);
    } else {
        makeCalls(title);
    }

    saveBookArr = JSON.parse(localStorage.getItem('bookArr'));
    if(saveBookArr === null) {
        saveBookArr = [];
    }
    console.log(saveBookArr);
}

searchBtn.on('click', function (event) {
    event.preventDefault();
    saveBookBtn.toggle();
    bookImgDiv.empty();

    containsAlcohol = $('#alcoholicCheckbox').prop('checked');
    title = $('#search-term').val().trim();

    $('#recipeListEl').empty();
    console.log(title);
    localStorage.setItem('title', title);
    bookLoaded = true;
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
    console.log('value calculated');
}

function renderElements() {
    bookTitle.text(title);
    autherNameEl.text(author);
    bookDescriptionEl.text(description);
    bookImg = $('<img>');
    bookImg.attr('src', imgURL);
    bookImgDiv.append(bookImg);
    saveBookBtn.toggle();
    
    
}

function makeCalls(bookTitle) {
    console.log('making call...');
    var queryURL = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        author = response.items[0].volumeInfo.authors[0];
        title = response.items[0].volumeInfo.title;
        if(response.items[0].volumeInfo.description !== null){
            hasDescription = true;
            description = response.items[0].volumeInfo.description;
        } else {
            description = "";
        }
        if(response.items[0].volumeInfo.imageLinks.thumbnail !== undefined) {
            hasImg = true;
            imgURL = response.items[0].volumeInfo.imageLinks.thumbnail;
        }else {
            imgURL = "";
        }
        
        calDrinkVal(author, title);  //calculate drinkValue
        drinkCalls();
        renderElements();
    }).fail(failedResponse);

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
            bookReviewEl.text('Click to read a New York Times review.')
            bookReviewEl.show();
        } else {
            bookReviewEl.hide();
        }
    });
}

function failedResponse() {
    
    makeCalls(litArray[Math.floor(Math.random() * litArray.length)]);
}










