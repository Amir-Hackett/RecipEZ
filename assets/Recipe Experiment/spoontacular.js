var userInput = "";
var submitRecipe = document.getElementById("submit-btn");
var recipeContainer = document.querySelector('#recipeContainer') 
var recipeArr = [];


var recipeArr = [];

function spoontacularAPI(recipe){
    //spoontacularAPI Key
    var apiKey = "33e1a2adb44145efa8cd514a15f3d98c"
    var apiURL = `https://api.spoonacular.com/food/search?query=${userInput}&number=3&apiKey=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            recipeArr.push(data)
        })
    })
}

$("#submit-btn").on("click", function () {
  loadCards();
  
  // console.log(recipeArr[0].searchResults[0].results);

})

function loadCards(){
  for (var i = 0; i < 3; i++) {
    let recipe = recipeArr[0].searchResults[0].results;
    console.log(recipe);

    $('#recipeContainer').innerHTML = `
    <div class="column is-4">
    <div class="card is-shady">
      <div class="card-image has-text-centered">
        <i class="fa-solid fa-utensils"></i>
      </div>
      
      <div class="card-content">
        <div class="content">
          <h4>Turkey Sandwich</h4>
          <p>
            A simple sandwich for the lazy person.
          </p>
          <p><a href="#">See Full Recipe</a></p>
        </div>
      </div>

    </div>
  </div>
    `
  }
}
    







spoontacularAPI();
// loadRecipeCards();