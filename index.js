import recipe from "./recipe.js";

(function displayRecipe() {
  const recipeContainer = document.getElementById("recipe-container");

  recipe.slice(0, 10).forEach((recette) => {
    recipeContainer.innerHTML += `
    <div class="card mt-10 bg-white rounded-xl shadow-cardShadow lg:w-[27%] md:w-[45%]">
        <img src="./assets/img/${recette.image}" alt="${
      recette.name
    }" class="rounded-t-lg h-[200px] md:h-[250px] w-full object-cover"/>
        <div class="pl-4">
        <h2 class="font-semibold font-anton pt-[32px] text-xl">${
          recette.name
        }</h2>
        <p class="text-[#7A7A7A] font-semibold font-manrope tracking-wide pt-[29px]">RECETTE</p>
        <p class="font-manrope pt-5 line-clamp-4 mb-[29px] pr-5 overflow-auto">${
          recette.description
        }</p>
        <p class="text-[#7A7A7A] font-semibold font-manrope tracking-wide">INGRÉDIENTS</p>
        <ul class="flex flex-wrap gap-10 justify-between w-4/5 mb-10 mt-5">
        ${recette.ingredients
          .map((ingredient) => {
            if (ingredient.unit === undefined) {
              ingredient.unit = "";
            }
            if (ingredient.quantity === undefined) {
              ingredient.quantity = "";
            }
            return `
            <li class="font-semibold w-[42%] md:text-sm">${ingredient.ingredient}<br/><span class="text-[#7A7A7A] md:text-xs">${ingredient.quantity} ${ingredient.unit}</span></li>
            `;
          })
          .join("")}
            </ul>
        </div>
    </div>
    `;
  });

  // 1- récupérer l'input
  const inputSearch = document.getElementById("search");

  //2- Déclarer une variable pour récupérer les données
  let searchValue = "";

  //3- récupérer les données passées dans l'input (e.target.value) avec un eventListener + algo pour vérifier SI des noms correspondent entre le recipe et le champ recherche

  inputSearch.addEventListener("input", (e) => {
    searchValue = e.target.value;
    for (let i = 0; i < recipe.length; i++) {
      //TODO trier aussi par ingrédients, description. Utiliser OU
      if (
        searchValue === recipe[i].name.substring(0, 3) ||
        searchValue === recipe[i].description.substring(0, 3)
      ) {
        console.log(recipe[i].name, recipe[i].description);
      }
    }
  });
})();

// searchValue === recipe[i].ingredients.substring(0, 3)
// recipe[i].name.forEach((name) => {
//   recipeContainer.innerHTML = `<p>${name}</p>`;
// });
