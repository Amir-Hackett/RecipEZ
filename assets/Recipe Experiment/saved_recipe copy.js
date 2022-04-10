function displaySavedRecipe() {
    //display saved recipe content from local storage
  var retrievedObject = localStorage.getItem('Recipe') || [];
  var savedRecipeContainer = document.getElementById("savedContainer");
 
  console.log('retrievedObject: ', JSON.parse(retrievedObject));

  retrievedObject.forEach(function(recipe) {
    savedRecipeContainer.innerHTML =+
    `
    <div class="card is-shady column is-4">
    <div class="card-image has-text-centered">
      <i class="fa-solid fa-utensils"></i>
    </div>
    <div class="card-content" data-recipeid="${recipe[i].id}">
      <div class="content">
        <img src="${recipe[i].image}"/>
        <h4>${recipe[i].name}</h4>
        <p>
          ${recipe[i].content}
        </p>
        <p><a href="${recipe[i].link}">See Full Recipe</a></p>
        <p>
          <label for="favorite">Click to save favorite: </label>
        </p>
      </div>
      <button>Save Recipe</button>
    </div>
  </div>
  `
  })
}

displaySavedRecipe();