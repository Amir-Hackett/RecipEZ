var searchInput = "";
const submitRecipe = document.getElementById("submit-btn");
const recipeContainer = document.querySelector('#recipeContainer'); 
const searchResultsContainer = document.getElementById("recipeSearchResults");
var recipeSearchArr = [];

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
          loadCards();
        }) 
    })
}


// loads cards based on the search parameters the user selects.
function loadCards(){

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
            <label for="favorite">Favorite Recipe</label>
          </p>
        </div>
        <button>save</button>
      </div>
    </div>
    `
  }
 recipeSearchArr = [];
}
// function for building the fetch request from the advanced search
    // collect all variables that have an input or true value and declare them all as local variables
    // concatenate all the variables into a fetch request
    // return results to the recipe array that displays search results

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

function saveRecipes(target) {
  console.log(target.innerHTML)
}


// event listener for the quick search
$("#submit-btn").click(function () {
  searchInput = $(this).siblings("#searchInput").val().toLowerCase();
  var selector = $(this).siblings('#sort').val();
  if (selector === 'recipe'){
    spoontacularAPI();
    console.log(searchInput)
  } else if (selector === 'drink'){
    console.log('call the drink API')
  } else {
    console.log('nothing gets called')
  }
});

//event listener for the advanced search form (food only)
$("#adv-search-btn").click(function(){
  var data = $(this);
  advSearchFunction(data);
 
});

// event listener for save button
$("#recipeSearchResults").click(function(event){
  let target = event.target.parentElement;
  console.log(target.dataset.recipeid)
  // saveRecipes(target);

});

//event listener for checkboxes


