var userInput = "";
const submitDrink = document.getElementById("submit-btn");
const submitRecipe = document.getElementById("submit-btn");
const drinkContainer = document.querySelector('#drinkContainer'); 
const searchDrinkResultsContainer = document.getElementById("drinkSearchResults");
const recipeContainer = document.querySelector('#recipeContainer'); 
const searchResultsContainer = document.getElementById("searchResults");
var searchResultsArr = [];
var savedRecipeArr = [];


// calls spoontacular recipe api
function spoontacularAPI(){
  //spoontacularAPI Key
  var apiKey = "33e1a2adb44145efa8cd514a15f3d98c"
  var apiURL = `https://api.spoonacular.com/food/search?query=${userInput}&number=3&apiKey=${apiKey}`

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
  var drinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + userInput;
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

  var recipe = searchResultsArr[i].searchResults[i].results;
  // console.log(recipe);
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
        console.log(strMeasureArr)
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

//change dropdown to say search drinks
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
// function advSearchFunction(data) {
//   var searchInput = data;
//   var keyWord = searchInput.siblings('#key-word').val().toLowerCase();
//   var cuisineOptions = searchInput.siblings('#cuisine')[0].children;
//   var cuisineString = '';

//   for (var i = 0; i < cuisineOptions.length; i++){
//     if (cuisineOptions[i].checked){
//       let checkedOption = cuisineOptions[i].previousElementSibling.innerHTML;
//       cuisineString += `${checkedOption},`;
//       console.log(cuisineOptions[i].previousElementSibling.innerHTML);
//     }
//   }
  
//   var excludeItems = '';

  

//   // console.log(keyWord);
//   console.log(data.siblings('#cuisine'));
// }

function callFavorites() {

  var apiKey = "33e1a2adb44145efa8cd514a15f3d98c"
  var apiURL = `https://api.spoonacular.com/food/search?query=${userInput}&number=3&apiKey=${apiKey}`

  fetch(apiURL)
  .then(function(response){
      response.json().then(function(data){
        searchResultsArr.push(data);
      }).then(function() {
        console.log(searchResultsArr)
        loadCards();
      }) 
  })
}

//save favorite recipe function
function saveRecipes(recipeId, event) {
  // console.log(recipeId)

  //grab specific dataset recipe id
  let target = event.target.parentElement;

  //declare variable of saved recipe content
  var savedRecipe = target.dataset.recipeid;
  savedRecipeArr.push(savedRecipe);
  // console.log(savedRecipeArr);
 
  //save recipe content to local storage
  localStorage.setItem('Recipe', JSON.stringify(savedRecipeArr));
 
 //display saved recipe content from local storage
  var retrievedObject = localStorage.getItem('Recipe');
 
  console.log('retrievedObject: ', JSON.parse(retrievedObject));
}

function displaySavedRecipe(recipe) {
  //display saved recipe content from local storage
var retrievedObject = JSON.parse(localStorage.getItem('Recipe'));
var savedRecipeContainer = document.getElementById("savedContainer");

// console.log('retrievedObject: ', JSON.parse(retrievedObject));

for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  var value = localStorage.getItem(key);
  var recipe = JSON.parse(value);
  console.log(recipe);
  var recipeDiv = document.createElement("div");
  recipeDiv.className = "savedRecipe";
  var recipeTitle = document.createElement("h3");
  recipeTitle.innerHTML = recipe.title;
  var recipeImage = document.createElement("img");
  var recipeLink = recipe.link;
  recipeImage.src = recipe.image;
  recipeLink.innerHTML = "View Recipe";
  recipeDiv.appendChild(recipeTitle);
  recipeDiv.appendChild(recipeImage);
  recipeDiv.appendChild(recipeLink);
  savedRecipeContainer.appendChild(recipeDiv);
}
callFavorites();
}

function saveDrinks(drinkId, event) {
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
  userInput = $(this).siblings("#searchInput").val().toLowerCase();
  var selector = $(this).siblings('#sort').val();
  if (selector === 'recipe'){
    spoontacularAPI();
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
    saveRecipes(recipeId, event);
    // console.log(target.dataset.recipeid)

  } else {
    console.log('nothing is logged')
  }
});


//event listener for the advanced search form (food only)
$("adv-search-btn").click(function(){
  advSearchFunction();
});


