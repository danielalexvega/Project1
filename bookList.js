//save the book...make an object...put in an array.... save the array
saveBookBtn.on('click', createBookObject);
bookShelfBtn.on('click', renderBookShelf);
topShelfBtn.on('click', function() {
    window.location.href = 'index.html';
});

function createBookObject(event) {
    console.log('creating the book object');
    event.preventDefault();

    if (savedBookArr.length !== 0) {
        console.log('the saveBook array is not 0');
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
                bkImgURL: imgUrl
            });
            console.log('added to bookArray');
        }
    } else {
        savedBookArr.push({
            bkTitle: title,
            bkAuthor: author,
            bkDescription: description,
            bkImgURL: imgUrl
        });
    }
 //store the object in local storage
    localStorage.setItem('bookArray', JSON.stringify(savedBookArr));
}

function renderBookShelf() {

    /* ****************
Render the elements on the savedBooks.html page
    **************** */

window.location.href = 'savedBooks.html';
}