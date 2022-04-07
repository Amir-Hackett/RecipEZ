//var drinkName = document.querySelector(".content")
var searchResultsContainer = document.querySelector('.content')

function getCocktail(){
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
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
      loadCards(data)
      });
  }
  )
  .catch(function(err) {
  console.log('Fetch Error :-S', err);
  }); 
}

getCocktail()


function displayCocktail(cocktail){
  for(i = 0; i < cocktail.drinks.length; i++){


  console.log(cocktail.drinks[i].strDrink)
  console.log(cocktail.drinks[i].strIngredient1)
  console.log(cocktail.drinks[i].strMeasure1)
  console.log(cocktail.drinks[i].strIngredient2)
  console.log(cocktail.drinks[i].strMeasure2)
  console.log(cocktail.drinks[i].strIngredient3)
  console.log(cocktail.drinks[i].strMeasure3)
  console.log(cocktail.drinks[i].strIngredient4)
  console.log(cocktail.drinks[i].strInstructions)
  }
}

function loadCards(data){
  // for (var i = 0; i < 3; i++){
  //   var drinkName = document.createElement("h4")
  //   drinkName.innerHTML = data.drinks[i].strDrink
  //   searchResultsContainer.append(drinkName)
  // }

  for (var i = 1; i < 3; i++) {
    for(var x = 0; x < data.drinks.length; x++){
      var cocktailIngredient = data.drinks[x]['strIngredient' + i]
     var drinkName = document.getElementsByTagName("h4")
     var ingredient = document.createElement("p")
     ingredient.innerHTML = cocktailIngredient
     drinkName.appendChild(ingredient)
    var cocktail = data;
      console.log(cocktailIngredient)
    if(!cocktailIngredient){
      break
    }
    console.log(cocktailIngredient)
   searchResultsContainer.innerHTML += `
    
    <div class="card is-shady column is-3">
      <div class="card-image has-text-centered">
        <i class="fa-solid fa-utensils"></i>
      </div>
      
      <div class="card-content">
        <div class="content">
          <img src="${cocktail.drinks[x].strDrinkThumb}"/>
          <h4>${cocktail.drinks[x].strDrink}</h4>
          <p>
            ${data.drinks[x]['strIngredient' + i]}
          </p>
          <!--<p><a href="${cocktail.drinks[x].strMeasure1}">See Full Recipe</a></p>-->
        </div>
      </div>

    </div>
  
    `
  }
  }
}
