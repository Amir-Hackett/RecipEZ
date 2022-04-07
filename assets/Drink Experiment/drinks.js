var searchInput = "";
const submitDrink = document.getElementById("submit-btn");
const drinkContainer = document.querySelector('#drinkContainer'); 
const searchDrinkResultsContainer = document.getElementById("drinkSearchResults");

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
      loadCards(data)
      });
  })
  .catch(function(err){
  console.log('Fetch Error :-S', err);
  }); 
}

function loadCards(data){

  for (var i = 3; i <= 3; i++) {
    for(var x = 0; x < data.drinks.length - 3; x++){
      var cocktailIngredient = data.drinks[x]['strIngredient' + i]

    var cocktail = data;
      
    if(!cocktailIngredient){
      break
    }

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
            ${data.drinks[x]['strIngredient' + "1" ]}
          </p>
          <p>
          ${data.drinks[x]['strIngredient' + "2"]}
        </p>
        <p>
        ${data.drinks[x]['strIngredient' + "3"]}
      </p>
      <p>
      ${data.drinks[x]['strIngredient' + "4"]}
    </p>
    <p>
    ${data.drinks[x]['strInstructions']}
  </p>
          <!--<p><a href="${cocktail.drinks[x].strInstructions}">See Full Recipe</a></p>-->
        </div>
      </div>

    </div>
  
    `
  }
  }
}

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

//event listener for the advanced search form (food only)
$("adv-search-btn").click(function(){
  advSearchFunction();
});
