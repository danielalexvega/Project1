//save the book...make an object...put in an array.... save the array
var bookArr = JSON.parse(localStorage.getItem('bookArr'));


saveBookBtn.on('click', createBookObject);
bookShelfBtn.on('click', gotoBookshelf);
// removeBook.on('click', remBook);

topShelfBtn.on('click', function () {
    window.location.href = 'index.html';
});

function createBookObject(event) {
    event.preventDefault();
    console.log('creating the book object');

    if (savedBookArr !== undefined && savedBookArr.length !== 0) {
        let containsBook = false;
        savedBookArr.forEach(book => {
            if (book.bkTitle === title) {
                containsBook = true;
            }
        });

        if (!containsBook) {
            savedBookArr.push({
                bkTitle: title,
                bkAuthor: author,
                bkDescription: description,
                bkImgURL: imgURL
            });
        }
    } else {
        savedBookArr.push({
            bkTitle: title,
            bkAuthor: author,
            bkDescription: description,
            bkImgURL: imgURL
        });
    }
    //store the object in local storage
    localStorage.setItem('bookArr', JSON.stringify(savedBookArr));
}

function renderBookShelf() {
    //bookArr = JSON.parse(localStorage.getItem('bookArr'));
    //I need to clear out the container
    /* ****************
Render the elements on the savedBooks.html page
    **************** */
    //bookImg     name, author     description

    if (bookArr === null || bookArr.length === 0) {
        //render a message 
    } else {
        bookArr.forEach(book => {
            let row = $('<div>').attr('class', 'row bookShelfRow');
            let imgCol = $('<div>').attr('class', 'col-md-2');
            let bookShelfImg = $('<img>');
            let detailCol = $('<div>').attr('class', 'col-md-2');
            detailCol.attr('id', book.bkTitle);
            let bookTitle = $('<h5>').attr('class', 'bookShelfTitle');
            let bookAuthor = $('<h5>').attr('class', 'bookShelfAuthor');
            let descriptionCol = $('<div>').attr('class', 'col-md-6');
            let descriptionP = $('<p>').attr('class', 'bookShelfDescription');
            let removeCol = $('<div>').attr('class', 'col-md-2');

            bookShelfImg.attr('src', book.bkImgURL);
            bookShelfImg.attr('class', 'bookShelfBook');
            imgCol.append(bookShelfImg);
            row.append(imgCol);
            bookTitle.text(book.bkTitle);
            bookAuthor.text(`by ${book.bkAuthor}`);
            detailCol.append(bookTitle);
            detailCol.append(bookAuthor);
            row.append(detailCol);
            descriptionP.text(book.bkDescription);
            descriptionCol.append(descriptionP);
            row.append(descriptionCol);

            let removeBtn = $('<button>').attr('class', 'btn btn-dark m1-2 my-sm-0 removeBook');
            removeBtn.attr('id', 'remBtn');
            removeBtn.text('Remove');
            removeCol.append(removeBtn);
            row.append(removeCol);

            $('#savedBookContainer').append(row);
        });
    }
}

function gotoBookshelf(event) {
    event.preventDefault();
    window.location.href = 'savedBooks.html';
}

