function displaySavedRecipe(recipe) {
    //display saved recipe content from local storage
  var retrievedObject = JSON.parse(localStorage.getItem('Recipe')) || [];
  var savedRecipeContainer = document.getElementById("savedContainer");
 
  console.log('retrievedObject: ', JSON.parse(retrievedObject));

retrievedObject.forEach((recipe) => {
    var savedRecipe = document.createElement("div");
    savedRecipe.classList.add("savedRecipe");
    savedRecipe.innerHTML = `
      <div class="saved-recipe-img">
        <img src="assets/images/recipe.png" alt="recipe">
      </div>
      <div class="saved-recipe-info">
        <h3>${recipe}</h3>
        <button class="delete-recipe">Delete</button>
      </div>
    `;
    savedRecipeContainer.appendChild(savedRecipe);
  });

}

displaySavedRecipe(recipeid);