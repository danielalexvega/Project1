
var queryURL = "https://www.thecocktaildb.com/api/json/";
var apiKey = "v2/9973533"
var alcoholic = queryURL + apiKey + "/filter.php?a=Alcoholic"; // List of all the alcoholic drinks.
var nonAlcoholic = queryURL + apiKey + "/filter.php?a=Non_Alcoholic"; // List of all the non-alcoholic drinks --- possibly for sober adults/underage.
var drinkId = queryURL + apiKey + "/lookup.php?i=";// We will add the drink ID in the second $ajax call with var codeDrinkId = response.drinks[bookVariable#].idDrink (url: drinkId + codeDrinkId,) Do we need to change codeDrinkId into a string?
var drinkContainer;
var drinkIdNumber; 
var drinkName; // = response.drinks.strDrink;
var measurements; // = response.drinks.strMeasure(#1 -?); // how do we run through the #'s we want to include and exclude the null values? A for loop? 
var ingredients; // = response.drinks.strIngredient(#1 -?); // how do we run through the #'s we want to include and exclude the null values? A for loop? 
var drinkInstructions; // = repsonse.drinks.strInstructions;
var totalDrinkInfo;

//var drinkIngredientArray = []; // push into this
//var drinkMeasurementArray = []; // push into this, render()

var image; // = response.drinks.strDrinkThumb; // move this to the ajax call

//All of these variables to be included in a one <div>
var drinkTitle = $("#drinkTitleEl");//.append(drinkName).text(); // defined in API as strDrink
var recipe = $("#recipeListEl");//.append(measurements + ingredients).text(); // defined in API as strMeasure# (measurements) response.+ strIngredient# (ingredients).  The null values will be thrown out ...  but how?
var instructions = $("#instructionsEl"); //.append(drinkInstructions).text();

//The img variable will have a separate <div>
var img = $("#drinkImgEl");//.append("#imgDiv"); // defined as strDrinkThumb in the API.  What do we type after #imgDiv to run apply the image?

var decider;

var searchBtn = $('#search-btn');

function drinkCalls() {
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
            drinkName = response.drinks[0].strDrink;
            drinkInstructions = response.drinks[0].strInstructions;

            image = response.drinks[0].strDrinkThumb;
            drinkTitle.text(drinkName); 
            instructions.text(drinkInstructions);
            img.attr("src", image);

            ingredients = [response.drinks[0].strIngredient1, response.drinks[0].strIngredient2, response.drinks[0].strIngredient3, response.drinks[0].strIngredient4, response.drinks[0].strIngredient5, response.drinks[0].strIngredient6, response.drinks[0].strIngredient7, response.drinks[0].strIngredient8, response.drinks[0].strIngredient9, response.drinks[0].strIngredient10, response.drinks[0].strIngredient11, response.drinks[0].strIngredient12, response.drinks[0].strIngredient13, response.drinks[0].strIngredient14, response.drinks[0].strIngredient15];

            measurements = [response.drinks[0].strMeasure1, response.drinks[0].strMeasure2, response.drinks[0].strMeasure3, response.drinks[0].strMeasure4, response.drinks[0].strMeasure5, response.drinks[0].strMeasure6, response.drinks[0].strMeasure7, response.drinks[0].strMeasure8, response.drinks[0].strMeasure9, response.drinks[0].strMeasure10, response.drinks[0].strMeasure11, response.drinks[0].strMeasure12, response.drinks[0].strMeasure13, response.drinks[0].strMeasure14, response.drinks[0].strMeasure15];
   
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
        });
    });

}


