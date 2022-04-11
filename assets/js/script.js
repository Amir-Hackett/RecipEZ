var userInput = "";
const submitDrink = document.getElementById("submit-btn");
const submitRecipe = document.getElementById("submit-btn");
const drinkContainer = document.querySelector('#drinkContainer'); 
const searchDrinkResultsContainer = document.getElementById("drinkSearchResults");
const recipeContainer = document.querySelector('#recipeContainer'); 
const searchResultsContainer = document.getElementById("recipeSearchResults");
var recipeSearchArr = [];

// calls spoontacular recipe api
function spoontacularAPI(){
  //spoontacularAPI Key
  var apiKey = "33e1a2adb44145efa8cd514a15f3d98c"
  var apiURL = `https://api.spoonacular.com/food/search?query=${searchInput}&number=3&apiKey=${apiKey}`

  fetch(apiURL)
  .then(function(response){
      response.json().then(function(data){
        recipeSearchArr.push(data);
      }).then(function() {
        console.log(recipeSearchArr)
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
      console.log(data);
      loadDrinkCards(data)
      });
  })
  .catch(function(err){
  console.log('Fetch Error :-S', err);
  }); 
}
    

// loads cards based on the search parameters the user selects.
function loadFoodCards(){

  var recipe = recipeSearchArr[0].searchResults[0].results;
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
 recipeSearchArr = [];
}

function loadDrinkCards(data){
  for(var i = 0; i < data.drinks.length; i+=4){
    var cocktail = data;

 searchResultsContainer.innerHTML += `
  
    <div class="card-content">
      <div class="content">
        <img src="${cocktail.drinks[i].strDrinkThumb}"/>
        <h4>${cocktail.drinks[i].strDrink}</h4>
        <p>
          ${data.drinks[i]['strIngredient' + "1" ]} : ${data.drinks[i]['strMeasure1']}
        </p>
        <p>
        ${data.drinks[i]['strIngredient' + "2"]} : ${data.drinks[i]['strMeasure2']}
      </p>
      <p>
      ${data.drinks[i]['strIngredient' + "3"]} : ${data.drinks[i]['strMeasure3']}
    </p>
    <p>
    ${data.drinks[i]['strIngredient' + "4"]} : ${data.drinks[i]['strMeasure4']}
  </p>
  <p>
  ${data.drinks[i]['strInstructions']}
</p>
      </div>
    </div>
  </div>

  `
}
}

//advanced search function
function advSearchFunction(data) {
  var searchInput = data;
  var keyWord = searchInput.siblings('#key-word').val().toLowerCase();
  var cuisineOptions = searchInput.siblings('#cuisine')[0].children;
  var cuisineString = '';

  for (var i = 0; i < cuisineOptions.length; i++){
    if (cuisineOptions[i].checked){
      let checkedOption = cuisineOptions[i].previousElementSibling.innerHTML;
      cuisineString += `${checkedOption},`;
      console.log(cuisineOptions[i].previousElementSibling.innerHTML);
    }
  }
  
  var excludeItems = '';

  

  // console.log(keyWord);
  console.log(data.siblings('#cuisine'));
}

// function callFavorites() {

//   var apiKey = "33e1a2adb44145efa8cd514a15f3d98c"
//   var apiURL = `https://api.spoonacular.com/food/search?query=${}&number=3&apiKey=${apiKey}`

//   fetch(apiURL)
//   .then(function(response){
//       response.json().then(function(data){
//         recipeSearchArr.push(data);
//       }).then(function() {
//         console.log(recipeSearchArr)
//         loadCards();
//       }) 
//   })
// }

var savedRecipeArr = [];

//save favorite recipe function
function saveRecipes(target) {
  //declare variable of saved recipe content
  var savedRecipe = target.dataset.recipeid;
  savedRecipeArr.push(savedRecipe);
  console.log(savedRecipeArr);

//save recipe content to local storage
  localStorage.setItem('Recipe', JSON.stringify(savedRecipeArr));

//display saved recipe content from local storage
  // var retrievedObject = localStorage.getItem('Recipe');

  // console.log('retrievedObject: ', JSON.parse(retrievedObject));

}

//event listener for the advanced search form (food only)
$("#adv-search-btn").click(function(){
  var data = $(this);
  advSearchFunction(data);
 
});

// event listener for the quick search
$("#submit-btn").click(function() {
  searchInput = $(this).siblings("#searchInput").val().toLowerCase();
  var selector = $(this).siblings('#sort').val();
  if (selector === 'recipe'){
    spoontacularAPI();
  } else if (selector === 'drink'){
    getCocktail();
  } else {
    console.log('nothing gets called')
  }
});

// save favorite click listener
$("#recipeSearchResults").click(function(event){
  let target = event.target.parentElement;
  console.log(target.dataset.recipeid)
  saveRecipes(target);
});

//event listener for the advanced search form (food only)
$("adv-search-btn").click(function(){
  advSearchFunction();
});