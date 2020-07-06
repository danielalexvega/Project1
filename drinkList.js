//save the drink... make an object... put in an aray... save the array
var drinkArr = JSON.parse(localStorage.getItem('drinkArr'));

var savedDrinkContainer = $('#savedDrinkContainer');

saveDrinkBtn.on('click', createDrinkObject);
barCartBtn.on('click', gotoBarcart);

function createDrinkObject(event) {
    event.preventDefault();

    if (savedDrinkArr !== undefined && savedDrinkArr !== null && savedDrinkArr.length !== 0) {
        let containsDrink = false;
        savedDrinkArr.forEach(drink => {
            if (drink.drName === drinkName) {
                containsDrink = true;
            }
        });
        if (!containsDrink) {
            savedDrinkArr.push({
                drName: drinkName,
                drInstructions: drinkInstructions,
                drIngredients: ingredients,
                drMeasurements: measurements,
                drImgURL: drinkUrl
            });
        }
    } else {
        savedDrinkArr.push({
            drName: drinkName,
            drInstructions: drinkInstructions,
            drIngredients: ingredients,
            drMeasurements: measurements,   
            drImgURL: drinkUrl
        });
    }
    //store the object in local storage
    localStorage.setItem('drinkArr', JSON.stringify(savedDrinkArr));

}

function gotoBarcart(event){
    event.preventDefault();
    window.location.href = 'savedDrinks.html';   
}

function renderBarCart() {
   // drinkArr = JSON.parse(localStorage.getItem('drinkArr'));

    //picture     name     ingredients       instructions
    //I need to clear out the container
    if(drinkArr === null || drinkArr.length === 0) {
        //try a modal alerting that there's nothing on the barcart, go to the top shelf
        // console.log('test');
        // $('#myDrinkModal').modal('show');

    } else {
        //loop through array and render elements
        drinkArr.forEach(drink => {
            //create row
            let row = $('<div>').attr('class', 'row barCartRow');
            //create 4 cols
            let imgCol = $('<div>').attr('class', 'col-md-2');
            let barCartImg = $('<img>');
            let nameCol = $('<div>').attr('class', 'col-md-2');
            nameCol.attr('id', drink.drName);
            let nameHeader = $('<h5>').attr('class', 'barCartName');
            let ingredientsCol = $('<div>').attr('class', 'col-md-3');
            let instructionsCol = $('<div>').attr('class', 'col-md-3');
            let removeCol = $('<div>').attr('class', 'col-md-2');

            barCartImg.attr('src', drink.drImgURL);
            barCartImg.attr('class', 'barCartDrink');
            imgCol.append(barCartImg);
            row.append(imgCol);
            nameHeader.text(drink.drName);
            nameCol.append(nameHeader);
            row.append(nameCol);

            let ingredientList = $("<ul>");
            for (let i = 0; i < drink.drIngredients.length; i++) {
                if (drink.drIngredients[i] !== null) {
                    if (drink.drMeasurements[i] === null) {
                        ingredientList.append($("<li>").text(drink.drIngredients[i]));
                    } else {
                        ingredientList.append($("<li>").text(drink.drMeasurements[i] + " " + drink.drIngredients[i]));
                    }
                }
            }
            ingredientsCol.append(ingredientList);
            row.append(ingredientsCol);
            instructionsCol.text(drink.drInstructions);
            row.append(instructionsCol);

            let removeBtn = $('<button>').attr('class', 'btn btn-dark m1-2 my-sm-0 removeDrink');
            removeBtn.attr('id', 'remBtn');
            removeBtn.text('Remove');
            removeCol.append(removeBtn);
            row.append(removeCol);

            $('#savedDrinkContainer').append(row);
       });    
   }       
}