var userInput = "";
const submitDrink = document.getElementById("submit-btn");
const submitRecipe = document.getElementById("submit-btn");
const drinkContainer = document.querySelector('#drinkContainer');
const searchDrinkResultsContainer = document.getElementById("drinkSearchResults");
const recipeContainer = document.querySelector('#recipeContainer');
const searchResultsContainer = document.getElementById("searchResults");
var searchResultsArr = [];
var advSearchResultsArr = [];
var idSearchURL = [];
var spoontacularApiKey = "2bb10ff172ca4ab1b575e13c4f01a5c6"
var apiURL = '';

// call cocktail api
function getCocktail() {
  var drinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchInput;
  fetch(drinkAPI)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function (data) {
          searchResultsArr.push(data);
        }).then(function () {
          loadDrinkCards()
        });
      })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}


// dynamically generates recipe cards based on the search parameters the user selects.
function loadFoodCards(resultsArr) {
  //for loop generates each card and then appends it to the searchResultsContainer
  for (var i = 0; i < resultsArr.length; i++) {
    console.log(resultsArr);

    let ingredients = resultsArr[i].ingredients;
    // let instructions = resultsArr[i].fullInfo.instructions;
    

    // replace the innerHTML of the cards container with a dynamically generated template literal
    searchResultsContainer.innerHTML +=
      `
    <div class="card is-shady column is-4">
      <div class="card-image has-text-centered">
        <i class="fa-solid fa-utensils"></i>
      </div>
      <div class="card-content" data-recipeobject="${resultsArr[i]}">
        <div class="content">
          <img src="${resultsArr[i].image}"/>
          <h4>${resultsArr[i].title}</h4>

          <img src="${ingredients}" alt="Ingredients Image" />
          <p> 
          Instructions: <br/>
            ${resultsArr[i].fullInfo.instructions}
          </p>

          <p><a href="${resultsArr[i].fullInfo.souceUrl}">See Full Recipe</a></p>
          <p>
            <label for="favorite">Click to save favorite: </label>
          </p>
        </div>
        <button>Save Recipe</button>
      </div>
    </div>`

  }
  // this may be redundant but since the drinks functions use this global variable it will clear the array after the food cards are generated and loaded.
  // clearResultsArray();
}

//clears the search results array.
function clearResultsArray() {
  searchResultsArr = [];
  
}

function loadDrinkCards() {
  var drinks = searchResultsArr[0].drinks;
  searchResultsContainer.innerHTML = '';
  console.log(drinks)
  //loop through data/drinks array 
  for (var i = 0; i < 3; i++) {
    // quick fix so no code breaking for drinks less than 3
    if (drinks.length < 3) {
      break;
    }
    let strMeasureArr = [];
    let strIngredientArr = [];
    let formulaHTML = '';
    var drinkId = drinks[i].idDrink;
    var instructions = drinks[i].strInstructions;
    //find all measure properties, if they have a value not equal to null push them to their respective array
    for (var x = 1; x < 15; x++) {
      var measure = drinks[i]['strMeasure' + [x]];
      if (measure != null) {
        strMeasureArr.push(measure);
        console.log(strMeasureArr)
      }
    }
    //find all ingredient properties, if they have a value not equal to null push them to their respective array
    for (var y = 1; y < 15; y++) {
      var ingredient = drinks[i]['strIngredient' + [y]];
      if (ingredient != null) {
        strIngredientArr.push(ingredient);
      }
    }
    //generate recipe HTML from the ingredients and measure arrays
    for (var z = 0; z < strIngredientArr.length; z++) {
      if (strMeasureArr[z] == undefined) {
        strMeasureArr[z] = "As much as you'd like!"
      }

      // gets rid of the extra : if null
      strMeasureArr = strMeasureArr.filter(item => item)
      strIngredientArr = strIngredientArr.filter(item => item)

      formulaHTML += `
      <p>
      ${strIngredientArr[z]} : ${strMeasureArr[z]}
      </p>
      `
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
      `
  }
  searchResultsArr = [];
}

//change dropdown to say search drinks
document.getElementById("sort").onchange = function () {
  dropDownChange()
}
function dropDownChange() {
  var selector = document.getElementById("sort").value
  if (selector === 'recipe') {
    document.getElementById("searchInput").placeholder = "Search Recipes"
  } else if (selector === 'drink') {
    document.getElementById("searchInput").placeholder = "Search Drinks"
  } else {
    console.log('nothing gets called')
  }
}

//advanced search function

function advSearchFunction(data) {
  //input data from advanced search form
  var searchInput = data;
  //array to store valid search parameters, this array will be used to generate the URL for the fetch request
  var searchParamArr = [];
  //search parameter input field values
  var keyword = searchInput.siblings('#key-word').val().toLowerCase();
  //options returns all the array objects that are radio buttons, then the cuisine for loop pulls the user selected objects from this array and pushes them to cuisineSting
  var cuisineOptions = searchInput.siblings('#cuisine')[0].children;
  var cuisineString = '';
  //options returns all the array objects that are radio buttons, then the intolerance for loop pulls the user selected objects from this array and pushes them to intoleranceSting
  var intoleranceOptions = searchInput.siblings('#intolerance')[0].children;
  var intoleranceString = '';
  //checks for values in the include/exclude input fields
  var includeIngredients = searchInput.siblings('#include-ingredients').val().toLowerCase()
  var excludeIngredients = searchInput.siblings('#exclude-ingredients').val().toLowerCase()
  //options returns all the array objects that are radio buttons, then the mealOptions for loop pulls the user selected objects from this array and pushes them to mealTypeSting
  var mealTypeOptions = searchInput.siblings('#meal-type')[0].children;
  var mealTypeString = '';
  //checks for values in all remaining input fields
  var maxPrepTime = parseInt(searchInput.siblings('#max-prep').val());
  var maxCalories = parseInt(searchInput.siblings('#max-cal').val());
  var maxSugar = parseInt(searchInput.siblings('#max-sugar').val());
  var maxCarbs = parseInt(searchInput.siblings('#max-carbs').val());
  var maxResults = parseInt(searchInput.siblings('#max-results').val());
  var sortBy = searchInput.siblings('#sort').val();


  //cuisineOptions for loop
  for (let i = 0; i < cuisineOptions.length; i++) {
    if (cuisineOptions[i].checked) {
      let checkedOption = cuisineOptions[i].previousElementSibling.innerHTML;
      cuisineString = `${checkedOption}`;
    }
  }
  // intoleranceOptions for loop
  for (let i = 0; i < intoleranceOptions.length; i++) {
    if (intoleranceOptions[i].checked) {
      let checkedOption = intoleranceOptions[i].previousElementSibling.innerHTML;
      intoleranceString += `${checkedOption},`;
    }
  }
  //mealOptions types for loop
  for (let i = 0; i < mealTypeOptions.length; i++) {
    if (mealTypeOptions[i].checked) {
      let checkedOption = mealTypeOptions[i].previousElementSibling.innerHTML;
      mealTypeString = `${checkedOption}`;
    }
  }
  // this ones not working right now. Come back and fix this with a form validation function once all other variables and final string concatenation function is done
  if (maxPrepTime === NaN) {
    window.alert = ("Max Prep Time can only accept numbers. Please input the max prep time desired in minutes only.")
  }

  function buildParamArray() {
    //Input field variable value check, if they have a valid value then push the variable in the form of an object with the parameter name used by the spootacular API to the search parameters array
    if (keyword.length > 0) {
      let obj = {};
      obj['parameter'] = `&query=${keyword}`;
      searchParamArr.push(obj);
    }

    if (cuisineString.length > 0) {
      let obj = {};
      obj['parameter'] = `&cuisine=${cuisineString}`
      searchParamArr.push(obj);
    }

    if (intoleranceString.length > 0) {
      let obj = {};
      obj['parameter'] = `&intolerances=${intoleranceString}`;
      searchParamArr.push(obj);
    }

    if (includeIngredients.length > 0) {
      let obj = {};
      obj['parameter'] = `&includeIngredients=${includeIngredients}`;
      searchParamArr.push(obj);
    }

    if (excludeIngredients.length > 0) {
      let obj = {};
      obj['parameter'] = `&excludeIngredients=${excludeIngredients}`;
      searchParamArr.push(obj);
    }

    if (mealTypeString.length > 0) {
      let obj = {};
      obj['parameter'] = `&type=${mealTypeString}`
      searchParamArr.push(obj);
    }

    if (maxPrepTime > 0) {
      let obj = {};
      obj['parameter'] = `&maxReadyTime=${maxPrepTime}`;
      searchParamArr.push(obj);
    }

    if (sortBy) {
      let obj = {};
      obj['parameter'] = `&sort=${sortBy}`;
      searchParamArr.push(obj);
    }

    if (maxCarbs > 0) {
      let obj = {};
      obj['parameter'] = `&maxCarbs=${maxCarbs}`;
      searchParamArr.push(obj);
    }

    if (maxCalories > 0) {
      let obj = {};
      obj['parameter'] = `&maxCalories=${maxCalories}`;
      searchParamArr.push(obj);
    }

    if (maxSugar > 0) {
      let obj = {};
      obj['parameter'] = `&maxSugar=${maxSugar}`;
      searchParamArr.push(obj);
    }

    
    if(isNaN(maxResults)){
      let obj = {};
      maxResults = 3;
      obj['parameter'] = `&number=${maxResults}`;
      searchParamArr.push(obj);
    } else if (maxResults > 0 && maxResults < 100){
      let obj = {};
      obj['parameter'] = `&number=${maxResults}`;
      searchParamArr.push(obj);
    }
    
  
  }

  buildParamArray();
  buildAdvSearchURL(searchParamArr);

  // console logs for individual search values, used for debugging. 
  // console.log(`keyword: ${keyword}`)
  // console.log(`cuisine: ${cuisineString}`);
  // console.log(`intolerance: ${intoleranceString}`);
  // console.log(`include ingredients: ${includeIngredients}`);
  // console.log(`exclude: ${excludeIngredients}`);
  // console.log(`meal type: ${mealTypeString}`);
  // console.log(`max-prep ${maxPrepTime}`);
  // console.log(`max-calories: ${maxCalories}`);
  // console.log(`max-sugar: ${maxSugar}`);
  // console.log(`max carbs: ${maxCarbs}`);
  console.log(`max results: ${maxResults}`);
  // console.log(`sort by: ${sortBy}`);
}

function buildAdvSearchURL(searchParamArr) {
  let searchArr = searchParamArr;
  // console.log(searchArr);
  var searchParameters = '';

  for (let i = 0; i < searchArr.length; i++) {
    searchParameters += searchArr[i].parameter;
  }

  console.log(searchParameters)

  let advSearchURL = `https://api.spoonacular.com/recipes/complexSearch?${searchParameters}&apiKey=${spoontacularApiKey}`;

  spoontacularAdvSearch(advSearchURL);
}

function spoontacularAdvSearch(advSearchURL) {
  var resultsArr = [];
  fetch(advSearchURL)
    .then(function (response) {
      response.json()
      .then(function (data) {
        
        resultsArr = data.results;
      }) 
        .then(function () {
        // idSearch();
        ingredientsImg(resultsArr);
      })
    })
}

// idSearch currently not in use. it is still here for reference but has been replaced with ingredientsImg()

// function idSearch() {

//   let resultsArr = advSearchResultsArr[0].results;
//   var ingredientsArr = [];

//   for (let i = 0; i < resultsArr.length; i++) {
//     let id = resultsArr[i].id;
//     let apiURL = `https://api.spoonacular.com/recipes/${id}/ingredientWidget?defaultCss=true&measure=us&apiKey=${spoontacularApiKey}`;

//     fetch(apiURL)
//       .then(function (response) {
//         var data = response.text()
//         return data

//       }).then(function (data) {
//         //this is the HTML that needs to be appended to the recipe cards
//         console.log(data)
//         ingredientsArr.push(data);
//       })
//       // this function add the HTML string from the previous function to the results array as a parameter with the text string as a value
//       .then(function () {
//         resultsArr[i].ingredients = `${ingredientsArr[i]}`;
//       })
//       .then(function () {
//         // execute load cards function after the fetch request promises are resloved. 
//         if (i === resultsArr.length - 1) {
//           loadFoodCards(resultsArr);
//         }

//       });

//   }

// }

//get the ingredients image using the ingredientWidget from spoontacular API
function ingredientsImg(resultsArr) {

  var ingredientsArr = [];

  for (let i = 0; i < resultsArr.length; i++) {
    let id = resultsArr[i].id;
    let apiURL = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.png?defaultCss=true&measure=us&apiKey=${spoontacularApiKey}`;

    fetch(apiURL)
      .then(function (response) {
        data = response.url
        return data
      })
      .then(function (data) {
        //this is the url to the PNG of the ingredients that needs to be appended to the recipe cards
        ingredientsArr.push(data);
      })
      // this function adds the PNG image url from the previous function to the results array as a parameter with the text string as a value
      .then(function () {
        resultsArr[i].ingredients = ingredientsArr[i];
      })
      .then(function () {
        // Once all promises are resolved and the for loop reaches its end, pass the resultsArr into getFullRecipeInfo() to capture the remaining details needed to generate the recipe cards. 
        if (i === resultsArr.length - 1) {
          getFullRecipeInfo(resultsArr);
        }

      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });

  }

}

//makes another get request to find the complete recipe information for a particular recipe based on its ID, then it appends that object to the coresponding recipe in the resultsArr
function getFullRecipeInfo(resultsArr){

  for (let i = 0; i < resultsArr.length; i++) {
    let id = resultsArr[i].id;
    let apiURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${spoontacularApiKey}`;
    // fetch the generated url
      fetch(apiURL)
      // convert the response
        .then(function(response){
          var data = response.json();
          return data
        })
          //append the response object to the corresponding index of the resultsArr
          .then(function(data){
              resultsArr[i].fullInfo = data;
            })
              //once all promises are fufilled and the loop completes its last run, pass the updated resultsArr into loadFoodCards
              .then(function(){
                if (i === resultsArr.length - 1) {
                  loadFoodCards(resultsArr);
                }
              })
              .catch(function (err) {
                console.log('Fetch Error :-S', err);
              });
  }
} 


//save favorite recipe function
function saveRecipes(recipeObject) {
  console.log(recipeObject)

}

function saveDrinks(drinkId) {

  console.log(drinkId)
  console.log('made it into the save drinks function')

}

//event listener for the advanced search form (food only)
$("#adv-search-btn").click(function () {
  var data = $(this);
  advSearchFunction(data);

});

// event listener for the quick search
$("#submit-btn").click(function () {
  searchInput = $(this).siblings("#searchInput").val().toLowerCase();
  var selector = $(this).siblings('#sort').val();

  if (selector === 'recipe') {
    let advSearchURL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&number=3&apiKey=${spoontacularApiKey}`
    searchResultsContainer.innerHTML = '';
    spoontacularAdvSearch(advSearchURL);
  } else if (selector === 'drink') {
    getCocktail();
  } else {
    console.log('nothing gets called')
  }
  $("#searchInput").val('')
});

// ability to press enter for function
var input = document.getElementById("searchInput")
input.addEventListener("keyup", function (event) {
  // 13 is enter || return on keyboard
  if (event.keyCode === 13) {
    event.preventDefault()
    document.getElementById("submit-btn").click()
  }
})

// food save favorite click listener
$("#searchResults").click(function (event) {
  let target = event.target.parentElement;
  // if statement to determine if the data-set attribute is for a food or a drink card, this way the id#'s can be stored in different arrays
  if ('drinkid' in target.dataset === true) {
    let drinkId = target.dataset.drinkid;
    saveDrinks(drinkId);
    // console.log(target.dataset.drinkid)

  } else if ('recipeid' in target.dataset === true) {
    let recipeObject = target.dataset.recipeobject;
    saveRecipes(recipeObject);
    // console.log(target.dataset.recipeid)

  } else {
    console.log('nothing is logged')
  }
});


//event listener for the advanced search form (food only)
$("adv-search-btn").click(function () {
  advSearchFunction();
});
//clears the search resultsArr and sets the results container innerHTML to an empty string. This was added in the event of a function failure bricking the page but has proved handy outside of that specific purpose. 
$("#clear").click(function () {
  searchResultsContainer.innerHTML = '';
  searchResultsArr = [];
})