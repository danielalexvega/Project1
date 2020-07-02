// read the user input 

// make api calls to get information

// render the elements on the page 

var drinkValue;
var containsAlcolhol;
var title;
var containsAlcolhol;
var author;
var description;
var hasReview = false;
 


var searchBtn = $('#search-btn');

//when the search button is clicked, I need to read the input.
searchBtn.on('click', function (event) {
    event.preventDefault();
    title = $('#search-term').val().trim();
    containsAlcolhol = $('#contains-alcohol').val();

    // need to clear the divs that contain the information

    var queryURL = `https://www.googleapis.com/books/v1/volumes?q=${title}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        author = response.items[0].volumeInfo.authors[0];
        title = response.items[0].volumeInfo.title;
        category = response.items[0].volumeInfo.categories[0];
        description = response.items[0].volumeInfo.description;
        getBookID(author, title);
    });

    var nytkey = 'MJTrpJJbUsVAAkzyjcaL8Vpkm73QTDlp';
    var nytURL = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${title}&api-key=${nytkey}`;

    $.ajax({
        url: nytURL,
        method: "GET"
    }).then(function (response) {
        if (response.results.length !== 0) {
            hasReview = true;
            console.log(response.results[0].url)
        }
    });
});

function getBookID(author, title) {
    drinkValue = 0;
    let totalString = (author + title).trim();
    totalString = totalString.replace(/\s+/g, '').toUpperCase();
    
    for (let i = 0; i < totalString.length; i++) {
        drinkValue += totalString.charCodeAt(i);
    }
}

