var userInput = "";
var submitRecipe = document.querySelector("submit-btn")

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
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayRecipe(data, recipe)
        })
    })
}

$(".saveBtn").on("click", function () {})
    

for (var i = 0; i < recipeArr.length; i++) {

`
<div class="card-content">
              <div class="content">
                <h4>${recipeArr[i].recipeTitle}</h4>
                <p>
                  
                </p>
                <p><a href="#">Learn more</a></p>
              </div>
            </div>`
}


spoontacularAPI()