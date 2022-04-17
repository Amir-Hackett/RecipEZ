
var userInput = "";
const submitDrink = document.getElementById("submit-btn");
const submitRecipe = document.getElementById("submit-btn");
const drinkContainer = document.querySelector("#drinkContainer");
const searchDrinkResultsContainer = document.getElementById("drinkSearchResults");
const recipeContainer = document.querySelector("#recipeContainer");
const searchResultsContainer = document.getElementById("searchResults");
var searchResultsArr = [];
var idSearchURL = [];
const spoonacularKey = "2bb10ff172ca4ab1b575e13c4f01a5c6";

// call cocktail api
function getCocktail() {
  var drinkAPI =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchInput;
  fetch(drinkAPI)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      // Examine the text in the response
      response
        .json()
        .then(function (data) {
          searchResultsArr.push(data);
        })
        .then(function () {
          loadDrinkCards();
        });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

//clears the search results array.
function clearResultsArray() {
  searchResultsArr = [];
}

function loadDrinkCards() {
  var drinks = searchResultsArr[0].drinks;
  searchResultsContainer.innerHTML = "";
  console.log(drinks);
  //loop through data/drinks array
  for (var i = 0; i < 3; i++) {
    // quick fix so no code breaking for drinks less than 3
    if (drinks.length < 3) {
      break;
    }
    let strMeasureArr = [];
    let strIngredientArr = [];
    let formulaHTML = "";
    var drinkId = drinks[i].idDrink;
    var instructions = drinks[i].strInstructions;
    //find all measure properties, if they have a value not equal to null push them to their respective array
    for (var x = 1; x < 15; x++) {
      var measure = drinks[i]["strMeasure" + [x]];
      if (measure != null) {
        strMeasureArr.push(measure);
      }
    }
    //find all ingredient properties, if they have a value not equal to null push them to their respective array
    for (var y = 1; y < 15; y++) {
      var ingredient = drinks[i]["strIngredient" + [y]];
      if (ingredient != null) {
        strIngredientArr.push(ingredient);
      }
    }
    //generate recipe HTML from the ingredients and measure arrays
    for (var z = 0; z < strIngredientArr.length; z++) {
      if (strMeasureArr[z] == undefined) {
        strMeasureArr[z] = "As much as you'd like!";
      }

      // gets rid of the extra : if null
      strMeasureArr = strMeasureArr.filter((item) => item);
      strIngredientArr = strIngredientArr.filter((item) => item);

      formulaHTML += `
      <p>
      ${strIngredientArr[z]} : ${strMeasureArr[z]}
      </p>
      `;
    }
    //write html for drink cards and append them to the search container
    searchResultsContainer.innerHTML += `
    
    <div class="card is-shady column is-4">
      <div class="card-image has-text-centered">
        <i class="fa-solid fa-utensils"></i>
      </div>
        <div class="card-content" data-drinkid="${drinkId}">
          <div class="content">
            <img src="${drinks[i].strDrinkThumb}"/>
            <h4>${drinks[i].strDrink}</h4>
            ${formulaHTML}
            <p>
            ${instructions}
            </p>
          </div>
          <button>Save Drink</button>
        </div>
    </div>
      `;
  }
  searchResultsArr = [];
}

//change dropdown to say search drinks
document.getElementById("sort").onchange = function () {
  dropDownChange();
};
function dropDownChange() {
  var selector = document.getElementById("sort").value;
  if (selector === "recipe") {
    document.getElementById("searchInput").placeholder = "Search Recipes";
  } else if (selector === "drink") {
    document.getElementById("searchInput").placeholder = "Search Drinks";
  } else {
    console.log("nothing gets called");
  }
}

//advanced search function used to be here. It has been moved to its own JS file.


// dynamically generates recipe cards based on the search parameters the user selects.
function loadFoodCards(resultsArr) {
  //for loop generates each card and then appends it to the searchResultsContainer
  for (var i = 0; i < resultsArr.length; i++) {
    // replace the innerHTML of the cards container with a dynamically generated template literal
    searchResultsContainer.innerHTML += `
    <div class="card is-shady column is-4">
      <div class="card-image has-text-centered">
        <i class="fa-solid fa-utensils"></i>
      </div>
      <div class="card-content" data-recipeid="${resultsArr[i]}">
        <div class="content">
          <img src="${resultsArr[i].image}"/>
          <h4>${resultsArr[i].title}</h4>
          <img src="${resultsArr[i].ingredients}" alt="Ingredients Image" />
          <p> 
          Instructions: <br/>
            ${resultsArr[i].fullInfo.instructions}
          </p>
          <p><a href="${resultsArr[i].fullInfo.sourceUrl}">See Full Recipe</a></p>
          <p>
            <label for="favorite">Click to save favorite: </label>
          </p>
        </div>
        <button>Save Recipe</button>
      </div>
    </div>`;
  }
  // this may be redundant but since the drinks functions use this global variable it will clear the array after the food cards are generated and loaded.
  // clearResultsArray();
}

//clears the search results array.
function clearResultsArray() {
  searchResultsArr = [];
}

//makes another get request to find the complete recipe information for a particular recipe based on its ID, then it appends that object to the corresponding recipe in the resultsArr
function getFullRecipeInfo(resultsArr) {
  for (let i = 0; i < resultsArr.length; i++) {
    // debugger;
    let id = resultsArr[i].id;

    let apiURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${spoonacularKey}`;
    // fetch the generated url
    fetch(apiURL)
      // convert the response
      .then(function (response) {
        var data = response.json();
        return data;
      })
      //append the response object to the corresponding index of the resultsArr
      .then(function (data) {
        resultsArr[i].fullInfo = data;
      })
      //once all promises are fufilled and the loop completes its last run, pass the updated resultsArr into loadFoodCards
      .then(function () {
        if (i === resultsArr.length - 1) {
          //one last time, a patch to the current problem, not a solution.
          setTimeout(function () {
            loadFoodCards(resultsArr);
          }, 1000);
        }
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }
}
// local storage is experimental for now, plans to use this information in the future. Ideally we would like the information stored on a server where it can be permanently saved to a user profile.
// save favorite recipe function

var drinkIdArr = [];

function saveDrinksId(drinkId) {

  console.log(drinkId)
  let id = drinkId;
  let key = "drinkId"
  drinkIdArr.push(id);
  localStorage.setItem(key, JSON.stringify(drinkIdArr));
  
  loadDrinksId();
}

loadDrinksId => {
  idArr = JSON.parse(localStorage.getItem("drinkId"))
  drinkIdArr = idSearchURL;
}

var recipeIdArr = [];

function saveRecipeId(recipeId) {

  console.log(recipeId)
  let id = recipeId;
  let key = "recipeId"
  recipeIdArr.push(id);
  localStorage.setItem(key, JSON.stringify(recipeIdArr));
  
  loadrecipesId();
}

loadRecipesId => {
  idArr = JSON.parse(localStorage.getItem("recipeId"))
  recipeIdArr = idSearchURL;
}


//event listener for the advanced search form (food only)
$("#adv-search-btn").click(function () {
  var data = $(this);
  advSearchFunction(data);
});

// event listener for the quick search
$("#submit-btn").click(function () {
  searchInput = $(this).siblings("#searchInput").val().toLowerCase();
  var selector = $(this).siblings("#sort").val();

  if (selector === "recipe") {
    let advSearchURL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&number=3&apiKey=${spoonacularKey}`;
    searchResultsContainer.innerHTML = "";
    // spoonacularAdvSearch(advSearchURL);
    spoonacularAdvSearch(advSearchURL);
  } else if (selector === "drink") {
    getCocktail();
  } else {
    console.log("nothing gets called");
  }
  $("#searchInput").val("");
});

// ability to press enter for function
var input = document.getElementById("searchInput");
input.addEventListener("keyup", function (event) {
  // 13 is enter || return on keyboard
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submit-btn").click();
  }
});

// food save favorite click listener
$("#searchResults").click(function (event) {
  // debugger;
  let target = event.target.parentElement;
  // if statement to determine if the data-set attribute is for a food or a drink card, this way the id#'s can be stored in different arrays
  if ("drinkid" in target.dataset === true) {
    let drinkId = target.dataset.drinkid;
    saveDrinksId(drinkId);
    // console.log(target.dataset.drinkid)
  } else if ("recipeid" in target.dataset === true) {
    let recipeId = target.dataset.recipeid;
    saveRecipeId(recipeId);
    // console.log(target.dataset.recipeid)
  } else {
    console.log("nothing is logged");
  }
});

//event listener for the advanced search form (food only)
$("adv-search-btn").click(function () {
  advSearchFunction();
});
//clears the search resultsArr and sets the results container innerHTML to an empty string. This was added in the event of a function failure bricking the page but has proved handy outside of that specific purpose.
$("#clear").click(function () {
  searchResultsContainer.innerHTML = "";
  searchResultsArr = [];
});