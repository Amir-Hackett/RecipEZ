var userInput = "";
var submitRecipe = document.getElementById("submit-btn");
var recipeContainer = document.querySelector('#recipeContainer') 


var recipeArr = [];

function spoontacularAPI(recipe){
    //spoontacularAPI Key
    var apiKey = "33e1a2adb44145efa8cd514a15f3d98c"
    var apiURL = `https://api.spoonacular.com/food/search?query=${userInput}&number=3&apiKey=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayRecipe(data, recipe)
        })
    })
}

// $(".saveBtn").on("click", function () {})
    
function loadRecipeCards () {
  console.log(recipeArr)
// build for loop to generate card

//build for lop to generate recipe instructions based on recipe directions array inside of each recipe object.
  for (var i = 0; i < recipeArr.length; i++) {

    recipeContainer.innerHTML +=
  `
      <div class="card-content">
          <div class="content">
            <h4>${recipeArr[i].recipeTitle}</h4>
            <p id="directions${i}>
              
            </p>
            <p><a href="#">Learn more</a></p>
          </div>
        </div>`
    for (var i = 0; i < recipeArr[i].directions.length; i++) {
      
    }
  }
}






// spoontacularAPI();
loadRecipeCards();