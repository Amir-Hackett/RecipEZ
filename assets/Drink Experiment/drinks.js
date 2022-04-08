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

function loadDrinkCards(data){
    for(var i = 0; i < data.drinks.length; i+=4){
      var cocktail = data;

   searchResultsContainer.innerHTML += `
    
      <div class="card-content">
        <div class="content">
          <img src="${cocktail.drinks[i].strDrinkThumb}"/>
          <h4>${cocktail.drinks[i].strDrink}</h4>
          <p>
            ${data.drinks[i]['strIngredient' + "1" ]} : ${data.drinks[i]['strMeasure1']}
          </p>
          <p>
          ${data.drinks[i]['strIngredient' + "2"]} : ${data.drinks[i]['strMeasure2']}
        </p>
        <p>
        ${data.drinks[i]['strIngredient' + "3"]} : ${data.drinks[i]['strMeasure3']}
      </p>
      <p>
      ${data.drinks[i]['strIngredient' + "4"]} : ${data.drinks[i]['strMeasure4']}
    </p>
    <p>
    ${data.drinks[i]['strInstructions']}
  </p>
        </div>
      </div>
    </div>
  
    `
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