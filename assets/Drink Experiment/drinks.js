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
      displayCocktail(data)
      });
  }
  )
  .catch(function(err) {
  console.log('Fetch Error :-S', err);
  }); 
}

getCocktail()


function displayCocktail(cocktail){
  console.log(cocktail.drinks[0].strDrink)
  console.log(cocktail.drinks[0].strIngredient1)
  console.log(cocktail.drinks[0].strMeasure1)
  console.log(cocktail.drinks[0].strIngredient2)
  console.log(cocktail.drinks[0].strMeasure2)
  console.log(cocktail.drinks[0].strIngredient3)
  console.log(cocktail.drinks[0].strMeasure3)
  console.log(cocktail.drinks[0].strIngredient4)
  console.log(cocktail.drinks[0].strInstructions)
}

