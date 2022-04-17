function advSearchFunction(data) {
  //input data from advanced search form
  var searchInput = data;
  //array to store valid search parameters, this array will be used to generate the URL for the fetch request
  var searchParamArr = [];
  //search parameter input field values
  var keyword = searchInput.siblings("#key-word").val().toLowerCase();
  //options returns all the array objects that are radio buttons, then the cuisine for loop pulls the user selected objects from this array and pushes them to cuisineSting
  var cuisineOptions = searchInput.siblings("#cuisine")[0].children;
  var cuisineString = "";
  //options returns all the array objects that are radio buttons, then the intolerance for loop pulls the user selected objects from this array and pushes them to intoleranceSting
  var intoleranceOptions = searchInput.siblings("#intolerance")[0].children;
  var intoleranceString = "";
  //checks for values in the include/exclude input fields
  var includeIngredients = searchInput
    .siblings("#include-ingredients")
    .val()
    .toLowerCase();
  var excludeIngredients = searchInput
    .siblings("#exclude-ingredients")
    .val()
    .toLowerCase();
  //options returns all the array objects that are radio buttons, then the mealOptions for loop pulls the user selected objects from this array and pushes them to mealTypeSting
  var mealTypeOptions = searchInput.siblings("#meal-type")[0].children;
  var mealTypeString = "";
  //checks for values in all remaining input fields
  var maxPrepTime = parseInt(searchInput.siblings("#max-prep").val());
  var maxCalories = parseInt(searchInput.siblings("#max-cal").val());
  var maxSugar = parseInt(searchInput.siblings("#max-sugar").val());
  var maxCarbs = parseInt(searchInput.siblings("#max-carbs").val());
  var maxResults = parseInt(searchInput.siblings("#max-results").val());
  var sortBy = searchInput.siblings("#sort").val();

  //cuisineOptions for loop
  for (let i = 0; i < cuisineOptions.length; i++) {
    if (cuisineOptions[i].checked) {
      let checkedOption = cuisineOptions[i].previousElementSibling.innerHTML;
      cuisineString = `${checkedOption}`;
    }
  }
  // intoleranceOptions for loop
  for (let i = 0; i < intoleranceOptions.length; i++) {
    if (intoleranceOptions[i].checked) {
      let checkedOption =
        intoleranceOptions[i].previousElementSibling.innerHTML;
      intoleranceString += `${checkedOption},`;
    }
  }
  //mealOptions types for loop
  for (let i = 0; i < mealTypeOptions.length; i++) {
    if (mealTypeOptions[i].checked) {
      let checkedOption = mealTypeOptions[i].previousElementSibling.innerHTML;
      mealTypeString = `${checkedOption}`;
    }
  }

  buildParamArray();

  function buildParamArray() {
    //Input field variable value check, if they have a valid value then push the variable in the form of an object with the parameter name used by the spootacular API to the search parameters array
    if (keyword.length > 0) {
      let obj = {};
      obj["parameter"] = `&query=${keyword}`;
      searchParamArr.push(obj);
    }

    if (cuisineString.length > 0) {
      let obj = {};
      obj["parameter"] = `&cuisine=${cuisineString}`;
      searchParamArr.push(obj);
    }

    if (intoleranceString.length > 0) {
      let obj = {};
      obj["parameter"] = `&intolerances=${intoleranceString}`;
      searchParamArr.push(obj);
    }

    if (includeIngredients.length > 0) {
      let obj = {};
      obj["parameter"] = `&includeIngredients=${includeIngredients}`;
      searchParamArr.push(obj);
    }

    if (excludeIngredients.length > 0) {
      let obj = {};
      obj["parameter"] = `&excludeIngredients=${excludeIngredients}`;
      searchParamArr.push(obj);
    }

    if (mealTypeString.length > 0) {
      let obj = {};
      obj["parameter"] = `&type=${mealTypeString}`;
      searchParamArr.push(obj);
    }

    if (maxPrepTime > 0) {
      let obj = {};
      obj["parameter"] = `&maxReadyTime=${maxPrepTime}`;
      searchParamArr.push(obj);
    }

    if (sortBy) {
      let obj = {};
      obj["parameter"] = `&sort=${sortBy}`;
      searchParamArr.push(obj);
    }

    if (maxCarbs > 0) {
      let obj = {};
      obj["parameter"] = `&maxCarbs=${maxCarbs}`;
      searchParamArr.push(obj);
    }

    if (maxCalories > 0) {
      let obj = {};
      obj["parameter"] = `&maxCalories=${maxCalories}`;
      searchParamArr.push(obj);
    }

    if (maxSugar > 0) {
      let obj = {};
      obj["parameter"] = `&maxSugar=${maxSugar}`;
      searchParamArr.push(obj);
    }

    if (isNaN(maxResults)) {
      let obj = {};
      maxResults = 3;
      obj["parameter"] = `&number=${maxResults}`;
      searchParamArr.push(obj);
    } else if (maxResults > 0 && maxResults < 100) {
      let obj = {};
      obj["parameter"] = `&number=${maxResults}`;
      searchParamArr.push(obj);
    }
  
  buildAdvSearchURL(searchParamArr);
  }
}

function buildAdvSearchURL(searchParamArr) {
  let searchArr = searchParamArr;
  var searchParameters = "";

  for (let i = 0; i < searchArr.length; i++) {
    searchParameters += searchArr[i].parameter;
  }

  let advSearchURL = `https://api.spoonacular.com/recipes/complexSearch?${searchParameters}&apiKey=${spoonacularKey}`;

  spoonacularAdvSearch(advSearchURL);
}

const spoonacularAdvSearch = async (advSearchURL) => {
  try {
    let response = await fetch(advSearchURL);
    let data = await response.json();
    let resultsArr = data.results;
    console.log("made it to new adv search arr");
    spoonacularIngredientsImg(resultsArr);
  } catch (err) {
    console.error(`Error in adv search: ${err}`);
  }
};
//get the ingredients image using the ingredientWidget from spoontacular API
const spoonacularIngredientsImg = async (resultsArr) => {
  try {
    console.log("made it into new image function");
    let ingredientsArr = [];
    for (let i = 0; i < resultsArr.length; i++) {
      // console.log('made it into image loop')
      var id = resultsArr[i].id;
      let apiURL = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.png?defaultCss=true&measure=us&apiKey=${spoonacularKey}`;
      let response = await fetch(apiURL);
      let data = await response;
      ingredientsArr.push(data.url);
      resultsArr[i].ingredients = ingredientsArr[i];
      // Once all promises are resolved and the for loop reaches its end, pass the resultsArr into getFullRecipeInfo() to capture the remaining details needed to generate the recipe cards.
      if (i === resultsArr.length - 1) {
        // console.log('made it to the end of new image function')
        spoonacularGetInfo(resultsArr);
      }
    }
  } catch (err) {
    console.error(`Error in IngredientsImg: ${err}`);
  }
};

// retrieves detailed information about the recipe using its ID number that was retrieved in the first API call spoonacularAdvSearch
const spoonacularGetInfo = async (resultsArr) => {
  console.log("made it into get info function");
  try {
    for (let i = 0; i < resultsArr.length; i++) {
      let id = resultsArr[i].id;
      let apiURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${spoonacularKey}`;
      let response = await fetch(apiURL);
      let data = await response.json();
      console.log(data);
      resultsArr[i].fullInfo = data;
      // once all promises are resolved and the above for loop completes, load the final version of the resultsArr into the load food cards function.
      if (i === resultsArr.length - 1) {
        loadFoodCards(resultsArr);
      }
    }
  } catch (err) {
    console.error(`Error in get info function: ${err}`);
  }
};
