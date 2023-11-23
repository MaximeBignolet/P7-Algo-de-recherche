import recipe from "./recipe.js";


function displayRecipe(recipe) {
  const recipeContainer = document.getElementById("recipe-container");
  recipeContainer.innerHTML = '';

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
        <p class="font-manrope pt-5 line-clamp-4 mb-[29px] pr-5">${
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
};

displayRecipe(recipe)



const searchFilter = () => {
const inputSearch = document.getElementById('search');
let searchValue = '';

inputSearch.addEventListener('input', (e) => {
    searchValue = e.target.value.toLowerCase();
    if(searchValue.length >= 3){
    const filteredRecipe = recipe.filter((rec) => {
        return rec.name.toLowerCase().includes(searchValue) ||
            rec.description.toLowerCase().includes(searchValue) ||
            rec.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue));
        });
    displayRecipe(filteredRecipe);
    } else {
        displayRecipe(recipe)
    }
});
}

searchFilter();