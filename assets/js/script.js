var userInput = "";
var submitRecipe = document.getElementById("submit-btn");
var recipeContainer = document.querySelector('#recipeContainer') 


var recipeArr = [
{
recipeTitle: 'example',
ingredients: ['salt', 'pepper', 'water'],
directions: [
    {step1: ''},
    {step2: ''},
    {step3: ''},
]
},
];

function spoontacularAPI(recipe){
    //spoontacularAPI Key
    var apiKey = "33e1a2adb44145efa8cd514a15f3d98c"
    var apiURL = `${apiKey}`

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
    for (var i = 0; i < recipeArr[0].directions.length; i++) {
      
    }
  }
}




/* 
idea for recipe API
make 5 cards based on random search parameters to fill in the page
*/

/* idea for modal:
basically in an input form, 
include following fields:
recipe title,
recipe image,
ingredients -> make ingredients dynamic, in a way, make user input each ingredients separately into an additional field for now, 
    eventually we should finn an api like zestful that parses a string into ingredients. 
directions -> same as ingredients, add in ability for user to add an additional step, start with 5 steps

each ingredient and step should be dded to the recipe array object in the format in the default array defined at the top of the page. 

once a modal form is completed a new recipe card should be generated. 

*/


// spoontacularAPI();
loadRecipeCards();