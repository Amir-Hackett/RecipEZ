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
    var recipe = recipeArr[0].searchResults[0].results;
    console.log(recipeArr[0].searchResults[0].results[0]);

   recipeContainer.innerHTML = `
    <div class="column is-4">
    <div class="card is-shady">
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
  </div>
    `
  }
}
    







spoontacularAPI();
// loadRecipeCards();