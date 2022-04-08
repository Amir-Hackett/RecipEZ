var userInput = "";
const submitDrink = document.getElementById("submit-btn");
const submitRecipe = document.getElementById("submit-btn");
const drinkContainer = document.querySelector('#drinkContainer'); 
const searchDrinkResultsContainer = document.getElementById("drinkSearchResults");
const recipeContainer = document.querySelector('#recipeContainer'); 
const searchResultsContainer = document.getElementById("searchResults");
var searchResultsArr = [];
var spoontacularApiKey = "33e1a2adb44145efa8cd514a15f3d98c"
var apiURL = '';


// calls spoontacular recipe api
function spoontacularAPI(apiURL){
console.log(apiURL);
  fetch(apiURL)
  .then(function(response){
      response.json().then(function(data){
        searchResultsArr.push(data);
      }).then(function() {
        loadFoodCards();
      }) 
  })
}

// call cocktail api
function getCocktail(){
  var drinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchInput;
  fetch(drinkAPI)
  .then(
  function(response) {
      if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
          response.status);
      return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
      searchResultsArr.push(data);
      }).then(function() {
        loadDrinkCards()
      });
  })
  .catch(function(err){
  console.log('Fetch Error :-S', err);
  }); 
}
    

// loads cards based on the search parameters the user selects.
function loadFoodCards(){
  // console.log(searchResultsArr[0].searchResults);
  if (searchResultsArr[0].searchResults){
    var recipe = searchResultsArr[0].searchResults[0].results;
  } else {
    recipe = searchResultsArr[0].results;
  };

 console.log(recipe);
  
  
  searchResultsContainer.innerHTML = '';
  for (var i = 0; i < 3; i++) {
  
   searchResultsContainer.innerHTML += 
   `
    <div class="card is-shady column is-4">
      <div class="card-image has-text-centered">
        <i class="fa-solid fa-utensils"></i>
      </div>
      <div class="card-content" data-recipeid="${recipe[i].id}">
        <div class="content">
          <img src="${recipe[i].image}"/>
          <h4>${recipe[i].name}</h4>
          <p>
            ${recipe[i].content}
          </p>
          <p><a href="${recipe[i].link}">See Full Recipe</a></p>
          <p>
            <label for="favorite">Click to save favorite: </label>
          </p>
        </div>
        <button>Save Recipe</button>
      </div>
    </div>
    `
  }
 clearResultsArray();
}

function clearResultsArray(){
  searchResultsArr = [];
}

function loadDrinkCards(){
  var drinks = searchResultsArr[0].drinks;
  searchResultsContainer.innerHTML = '';
  console.log(drinks)
  //loop through data/drinks array 
  for(var i = 0; i < 3; i++){
    let strMeasureArr = [];
    let strIngredientArr = [];
    let formulaHTML = '';
    var drinkId = drinks[i].idDrink;
    var instructions = drinks[i].strInstructions;
    //find all measure properties, if they have a value not equal to null push them to their respective array
    for(var x = 1; x < 15; x++){
      var measure = drinks[i]['strMeasure'+[x]];
        if (measure != null) {
        strMeasureArr.push(measure);
      }
    } 
    //find all ingredient properties, if they have a value not equal to null push them to their respective array
    for(var y = 1; y < 15; y++){
      var ingredient = drinks[i]['strIngredient'+[y]];
      if(ingredient != null){
        strIngredientArr.push(ingredient);
      }
    }
    //generate recipe HTML from the ingredients and measure arrays
    for(var z = 0; z < strIngredientArr.length; z++){
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

document.getElementById("sort").onchange = function(){
  dropDownChange()
}
function dropDownChange(){
  var selector = document.getElementById("sort").value
  if (selector === 'recipe'){
    document.getElementById("searchInput").placeholder = "Search Recipes"
  } else if (selector === 'drink'){
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
  for (let i = 0; i < cuisineOptions.length; i++){
    if (cuisineOptions[i].checked){
      let checkedOption = cuisineOptions[i].previousElementSibling.innerHTML;
      cuisineString = `${checkedOption}`;
    }
  }
  // intoleranceOptions for loop
  for(let i = 0; i < intoleranceOptions.length; i++) {
    if(intoleranceOptions[i].checked) {
      let checkedOption = intoleranceOptions[i].previousElementSibling.innerHTML;
      intoleranceString += `${checkedOption},`;
    }
  }
  //mealOptions types for loop
  for(let i = 0; i < mealTypeOptions.length; i++) {
    if(mealTypeOptions[i].checked) {
      let checkedOption = mealTypeOptions[i].previousElementSibling.innerHTML;
      mealTypeString = `${checkedOption}`;
    }
  }
// this ones not working right now. Come back and fix this with a form validation function once all other variables and final string concatenation function is done
  if (maxPrepTime === NaN) {
    window.alert = ("Max Prep Time can only accept numbers. Please input the max prep time desired in minutes only.")
  }

  function buildParamArray(){
      //Input field variable value check, if they have a valid value then push the variable in the form of an object with the parameter name used by the spootacular API to the search parameters array
    if(keyword.length > 0) {
      let obj = {};
      obj['parameter'] = `&query=${keyword}`;
      searchParamArr.push(obj);
    }

    if (cuisineString.length > 0) {
      let obj = {};
      obj['parameter'] = `&cuisine=${cuisineString}`
      searchParamArr.push(obj);
    }

    if(intoleranceString.length > 0){
      let obj = {};
      obj['parameter'] = `&intolerances=${intoleranceString}`;
      searchParamArr.push(obj);
    }

    if(includeIngredients.length > 0) {
      let obj = {};
      obj['parameter'] = `&includeIngredients=${includeIngredients}`;
      searchParamArr.push(obj);
    }

    if(excludeIngredients.length > 0) {
      let obj = {};
      obj['parameter'] = `&excludeIngredients=${excludeIngredients}`;
      searchParamArr.push(obj);
    }

    if(mealTypeString.length > 0){
      let obj = {};
      obj['parameter'] = `&type=${mealTypeString}`
      searchParamArr.push(obj);
    }

    if(maxPrepTime > 0) {
      let obj = {};
      obj['parameter'] = `&maxReadyTime=${maxPrepTime}`;
      searchParamArr.push(obj);
    }

    if(sortBy) {
      let obj = {};
      obj['parameter'] = `&sort=${sortBy}`;
      searchParamArr.push(obj);
    }

    if( maxCarbs > 0) {
      let obj = {};
      obj['parameter'] = `&maxCarbs=${maxCarbs}`;
      searchParamArr.push(obj);
    }

    if(maxCalories > 0) {
      let obj = {};
      obj['parameter'] = `&maxCalories=${maxCalories}`;
      searchParamArr.push(obj);
    }

    if(maxSugar > 0) {
      let obj = {};
      obj['parameter'] = `&maxSugar=${maxSugar}`;
      searchParamArr.push(obj);
    }

    if( maxResults > 0 && maxResults < 100) {
      let obj = {};
      obj['parameter'] = `&number=${maxResults}`;
      searchParamArr.push(obj);
    }
  }
  
  buildParamArray()
  advancedSearchFetch(searchParamArr);

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
  // console.log(`max results: ${maxResults}`);
  // console.log(`sort by: ${sortBy}`);
}

function advancedSearchFetch(searchParamArr){
  let searchArr = searchParamArr;
  // console.log(searchArr);
  var searchParameters = '';
  let apiKey = "33e1a2adb44145efa8cd514a15f3d98c";

  for (let i = 0; i < searchArr.length; i++) {
    searchParameters += searchArr[i].parameter;
  }

  apiURL = `https://api.spoonacular.com/recipes/complexSearch?${searchParameters}&apiKey=${apiKey}`;
  spoontacularAPI(apiURL);
}

// function callFavorites() {

//   var apiKey = "33e1a2adb44145efa8cd514a15f3d98c"
//   var apiURL = `https://api.spoonacular.com/food/search?query=${}&number=3&apiKey=${apiKey}`

//   fetch(apiURL)
//   .then(function(response){
//       response.json().then(function(data){
//         searchResultsArr.push(data);
//       }).then(function() {
//         console.log(searchResultsArr)
//         loadCards();
//       }) 
//   })
// }

//save favorite recipe function
function saveRecipes(recipeId) {
  console.log(recipeId)
  console.log('made it into the save recipes function')

}

function saveDrinks(drinkId) {

  console.log(drinkId)
  console.log('made it into the save drinks function')

}

//event listener for the advanced search form (food only)
$("#adv-search-btn").click(function(){
  var data = $(this);
  advSearchFunction(data);
 
});

// event listener for the quick search
$("#submit-btn").click(function() {
  var searchInput = $(this).siblings("#searchInput").val().toLowerCase();
  var selector = $(this).siblings('#sort').val();

  if (selector === 'recipe'){
    apiURL = `https://api.spoonacular.com/food/search?query=${searchInput}&number=3&apiKey=${spoontacularApiKey}`
    spoontacularAPI(apiURL);
  } else if (selector === 'drink'){
    getCocktail();
  } else {
    console.log('nothing gets called')
  }
  $("#searchInput").val('')
});

// ability to press enter for function
var input = document.getElementById("searchInput")
input.addEventListener("keyup", function(event){
  // 13 is enter || return on keyboard
  if (event.keyCode === 13){
    event.preventDefault()
    document.getElementById("submit-btn").click()
  }
})

// food save favorite click listener
$("#searchResults").click(function(event){
  let target = event.target.parentElement;
  // if statement to determine if the data-set attribute is for a food or a drink card, this way the id#'s can be stored in different arrays
  if ('drinkid' in target.dataset === true){
    let drinkId = target.dataset.drinkid;
    saveDrinks(drinkId);
    // console.log(target.dataset.drinkid)

  } else if('recipeid' in target.dataset === true) {
    let recipeId = target.dataset.recipeid;
    saveRecipes(recipeId);
    // console.log(target.dataset.recipeid)

  } else {
    console.log('nothing is logged')
  }
});


//event listener for the advanced search form (food only)
$("adv-search-btn").click(function(){
  advSearchFunction();
});

$("#clear").click(function(){
  searchResultsContainer.innerHTML = '';
  searchResultsArr = [];
})