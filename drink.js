
// How will we update the README.md?

// URL's, API Key, and variables for URL.
var queryURL = "https://www.thecocktaildb.com/api/json/";
var apiKey = "v2/9973533"
var alcoholic = queryURL + apiKey + "/filter.php?a=Alcoholic"; // List of all the alcoholic drinks.
var nonAlcoholic = queryURL + apiKey + "/filter.php?a=Non_Alcoholic"; // List of all the non-alcoholic drinks --- possibly for sober adults/underage.
var drinkId = queryURL + apiKey + "/lookup.php?i=";// We will add the drink ID in the second $ajax call with var codeDrinkId = response.drinks[bookVariable#].idDrink (url: drinkId + codeDrinkId,) Do we need to change codeDrinkId into a string?

var drinkContainer
//first $ajax call // make this variable empty and put in the first $ajax call.
var drinkIdNumber; // = response.drinks[drinkValue].idDrink;  // how will we connect the book.js value to the rest of the drink.js ?

////second $ajax call ... make these empty variables and put in the second $ajax call.
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

if (containsAlcohol) { // if true

    decider = alcoholic;
        // Boolean for alcoholic vs. non-alcoholic.  
        //      function getDrink(drinkIdNumber) {
        //          drinkTitle add to card title
        //          recipe add to <ol> in card body (populate <ol> to match the length of measurement and length of ingredients)
        //          instructions  add to <p> beneath the list
}
        //      img add to seperate <div> or card body ... maybe with the title above it in fun font and colors?
        // };
else {

        decider = nonAlcoholic
        // filter through nonAlcoholic drinks array
        // function (drinkIdNumber) {
        //      same as above
        //  };
    }




        $.ajax({
            url: decider
            method: "GET"
        }).then(function (response) {
            drinkIdNumber = response.drinks[drinkValue].idDrink;
        }

            $.ajax({ // looking up drink by ID - doesn't change
            url: "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + drinkIdNumber,
            method: "GET"
        }).then(function (response) {


            // Do the responses need to be paired with their appending methods below or is this format ok?
            // Do I need to move the ingredients / measurements array above the appending methods for the code to run in the correct order.
            // Did I put the render items in the correct area? Syntax correct?  Do I need to define this function/method or is render all it needs?


            drinkName = response.drinks.strDrink;
          
            drinkInstructions = repsonse.drinks.strInstructions;

            image = response.drinks.strDrinkThumb;



            drinkTitle.text(drinkName); // append to a <h2>?
             // does the for loop take care of adding the ingredients and measurements together? // append to <ul>?
            instructions.text(drinkInstructions); // append to a <p>?
            img.attr("src", image); //append to image <div>?


            ingredients = [];
            measurements = [];

            // not all of the listed ingredients match to a measurement.  Ex: margarita has an extra ingredient (salt) but no corresponding measurement.

            for (let i = 1; i < 16; i++) {
                ingredients.push(response.drinks.strIngredient + i);
                measurements.push(repsonse.strMeasure + i);
            }

            let ingredientList = $("<ul>");
            for (let i = 0; i < ingredients.length; i++) {
                if (ingredients[i] !== null) {
                    ingredientList.append($("<li>").text(measurements[i] + " " + ingredients[i]));

                }

            }
                recipe.append(ingredientList);


        });

    render: function(drinkName) {
        // code?
    }
    render: function(recipe) {
        // code?
    } //measurements + ingredients
    render: function(instructions) {
        // code
    };
    render: function(image) {
        // code
    };


});

}


// OTHER CODE NOT BEING USED RN

// var alcoholType = queryURL + apiKey + "/filter.php?i="; // We can use this to fliter the liquor specifically if we name the alcoholName variable locally.
// var popular = "https://www.thecocktaildb.com/api/json/v2/9973533/popular.php"; // List of poplular cocktails.
// var alcoholeName = "vodka"; // Should we create this variable in each function call that involves a specific liquor?

// var liquor = alcoholType + alcoholeName;

// var list1 = "https://www.thecocktaildb.com/api/json/" + apiKey + "/list.php?c=list"; // List of drink types.  Ex: coffee/tea, shot, ordinary drinks, cocktails, beer, punch/party drink. (11)
// var list2 = "https://www.thecocktaildb.com/api/json/" + apiKey + "/list.php?g=list"; // Glass type.  Ex: highball, champangne flute, ... (32)
// var list3 = "https://www.thecocktaildb.com/api/json/" + apiKey + "/list.php?i=list"; // list by ingredients (475)
// var list4 = "https://www.thecocktaildb.com/api/json/" + apiKey + "/list.php?a=list"; // Alcoholic, Non-Alcoholic, Optional Alcohol (3).

// all elements querried
// queryParams.q = $("# ...")
//     .val()
//     .trim();

// if (bookVariable = "" ) {  //Ex: genre: horror, authorName: alpha range, bookTitle: region/release year
//       choose this list/alcoholName
// }