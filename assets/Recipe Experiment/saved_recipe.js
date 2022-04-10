function displaySavedRecipe(recipe) {
    //display saved recipe content from local storage
  var retrievedObject = JSON.parse(localStorage.getItem('Recipe'));
  var savedRecipeContainer = document.getElementById("savedContainer");
 
  console.log('retrievedObject: ', JSON.parse(retrievedObject));

  for (var i=0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    var recipe = JSON.parse(value);
    console.log(recipe);
    var recipeDiv = document.createElement("div");
    recipeDiv.className = "savedRecipe";
    var recipeTitle = document.createElement("h3");
    recipeTitle.innerHTML = recipe.title;
    var recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeLink.innerHTML = "View Recipe";
    recipeDiv.appendChild(recipeTitle);
    recipeDiv.appendChild(recipeImage);
    recipeDiv.appendChild(recipeLink);
    savedRecipeContainer.appendChild(recipeDiv);
  }

}