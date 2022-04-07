var searchInput = "";
var submitRecipe = document.getElementById("submit-btn");
var recipeContainer = document.querySelector('#recipeContainer') 
var searchResultsContainer = document.querySelector('#recipeSearchResults')
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
          loadCards();
        }) 
    })
}

function loadCards(){

  console.log(recipeSearchArr);
  var recipe = recipeSearchArr[0].searchResults[0].results;
  console.log(recipe);
  

  for (var i = 0; i < 3; i++) {
    
   searchResultsContainer.innerHTML += 
   `
    <div class="card is-shady column is-4">
      <div class="card-image has-text-centered">
        <i class="fa-solid fa-utensils"></i>
      </div>
      <div class="card-content">
        <div class="content">
          <img src="${recipe[i].image}"/>
          <h4>${recipe[i].name}</h4>
          <p>
            ${recipe[i].content}
          </p>
          <p><a href="${recipe[i].link}">See Full Recipe</a></p>
        </div>
      </div>
    </div>
    `
  }
}
    

$("#submit-btn").click(function () {
  searchInput = $(this).siblings("#searchInput").val().toLowerCase();
  var selector = $(this).siblings('#sort').val();
  if (selector === 'recipe'){
    spoontacularAPI();
  } else if (selector === 'drink'){
    console.log('call the drink API')
  } else {
    console.log('nothing gets called')
  }
    
    
});





// spoontacularAPI();
// loadRecipeCards();