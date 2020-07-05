
var queryURL = "https://www.thecocktaildb.com/api/json/";
var apiKey = "v2/9973533"
var alcoholic = queryURL + apiKey + "/filter.php?a=Alcoholic";
var nonAlcoholic = queryURL + apiKey + "/filter.php?a=Non_Alcoholic";
var drinkId = queryURL + apiKey + "/lookup.php?i=";

var drinkContainer;
var drinkIdNumber; 
var drinkName;
var measurements;
var ingredients;
var drinkInstructions;
var totalDrinkInfo;
var drinkUrl;
var drinkImg;
var savedDrinkArr = [];

var drinkTitle = $("#drinkTitleEl");
var recipe = $("#recipeList");
var instructions = $("#instructions");
var drinkImgDiv = $("#drinkImgDiv");
var ingredientHeader = $('#ingredientsHeader');
var instructionHeader = $('#insructionsHeader')
var drinkCol = $('#drinkCol');
var searchBtn = $('#search-btn');


var decider;


function loadDrinkStorage(){
    savedDrinkArr = JSON.parse(localStorage.getItem('drinkArr'));
    if(savedDrinkArr === null) {
        saveBookArr = [];
    }
    console.log(savedDrinkArr);
}

function drinkCalls() {
    saveDrinkBtn.toggle();
    if (containsAlcohol) {
        decider = alcoholic;
    } else {
        decider = nonAlcoholic;
    }
    $.ajax({
        url: decider,
        method: "GET"
    }).then(function (response) {
        drinkIdNumber = response.drinks[drinkValue].idDrink;

        $.ajax({
            url: "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + drinkIdNumber,
            method: "GET"
        }).then(function (response) {
            if (drinkImg !== undefined) {
                drinkImg.remove();
            }
            drinkName = response.drinks[0].strDrink;
            drinkInstructions = response.drinks[0].strInstructions;
            drinkImg = $('<img>');
            drinkUrl = response.drinks[0].strDrinkThumb;
            drinkImg.attr('src', drinkUrl);
            drinkImg.attr('id', 'drinkImg');
            drinkImgDiv.append(drinkImg);
            drinkTitle.text(drinkName);
            instructions.text(drinkInstructions);
            ingredientHeader.text('Ingredients:');
            instructionHeader.text('Instructions:');
            ingredients = [response.drinks[0].strIngredient1, response.drinks[0].strIngredient2, response.drinks[0].strIngredient3, response.drinks[0].strIngredient4, response.drinks[0].strIngredient5, response.drinks[0].strIngredient6, response.drinks[0].strIngredient7, response.drinks[0].strIngredient8, response.drinks[0].strIngredient9, response.drinks[0].strIngredient10, response.drinks[0].strIngredient11, response.drinks[0].strIngredient12, response.drinks[0].strIngredient13, response.drinks[0].strIngredient14, response.drinks[0].strIngredient15];
            measurements = [response.drinks[0].strMeasure1, response.drinks[0].strMeasure2, response.drinks[0].strMeasure3, response.drinks[0].strMeasure4, response.drinks[0].strMeasure5, response.drinks[0].strMeasure6, response.drinks[0].strMeasure7, response.drinks[0].strMeasure8, response.drinks[0].strMeasure9, response.drinks[0].strMeasure10, response.drinks[0].strMeasure11, response.drinks[0].strMeasure12, response.drinks[0].strMeasure13, response.drinks[0].strMeasure14, response.drinks[0].strMeasure15];

            recipe.empty();

            let ingredientList = $("<ul>");
            for (let i = 0; i < ingredients.length; i++) {
                if (ingredients[i] !== null) {
                    if (measurements[i] === null) {
                        ingredientList.append($("<li>").text(ingredients[i]));
                    } else {
                        ingredientList.append($("<li>").text(measurements[i] + " " + ingredients[i]));
                    }
                }
            }
            recipe.append(ingredientList);
            saveDrinkBtn.toggle();
           
        });
    });

}


