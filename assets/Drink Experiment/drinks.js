var drinkRecipe = function(repo) {
    // format the github api url
    var apiUrl = "www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayDrinks(data);
  
          // check if api has paginated issues
          if (response.headers.get("Link")) {
            displayWarning(repo);
          }
        });
      } else {
        // if not successful, redirect to homepage
        document.location.replace("./index.html");
      }
    });
  };