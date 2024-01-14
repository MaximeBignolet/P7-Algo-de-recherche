import recipe from "./recipe.js";

const totalRecipeContainer = document.querySelector(".total_recette_container");
const changeDynamicallyTotalRecipe = (totalRecipe) => {
  totalRecipeContainer.innerHTML = "";

  totalRecipeContainer.innerHTML += `${totalRecipe} recettes`;
  if (totalRecipe.length === 0) {
    totalRecipeContainer.innerHTML += `Aucune recettes`;
  }
};

changeDynamicallyTotalRecipe(recipe.length);

function displayRecipe(recipe) {
  const recipeContainer = document.getElementById("recipe-container");
  recipeContainer.innerHTML = "";
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
}

displayRecipe(recipe);

const searchFilter = () => {
  const inputSearch = document.getElementById("search");
  let searchValue = "";

  inputSearch.addEventListener("input", (e) => {
    searchValue = e.target.value.toLowerCase();
    let filteredRecipe = [];

    // Si l'input est vide, afficher toutes les recettes
    if (searchValue === "") {
      displayRecipe(recipe);
      changeDynamicallyTotalRecipe(recipe.length);

      return;
    }

    // Votre code existant pour filtrer les recettes
    if (searchValue.length < 3) return;

    for (let i = 0; i < recipe.length; i++) {
      let nameMatch = recipe[i].name.toLowerCase().includes(searchValue);
      let descriptionMatch = recipe[i].description
        .toLowerCase()
        .includes(searchValue);
      let ingredientMatch = recipe[i].ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchValue)
      );

      if (nameMatch || descriptionMatch || ingredientMatch) {
        filteredRecipe.push(recipe[i]);
      }
    }

    // Afficher les recettes filtrées
    displayRecipe(filteredRecipe);
    changeDynamicallyTotalRecipe(filteredRecipe.length);
  });
};

searchFilter();

const dropDownIngredients = document.getElementById(
  "ingredients-filter-button"
);
const hiddenIngredient = document.getElementById("hidden-ingredients-dropdown");
const ingredientContainer = document.getElementById(
  "ingredient-dropdown-container"
);
const ingredientInputSearch = document.getElementById(
  "ingredient-dropdown-search-1"
);

let uniqueIngredientsSet = new Set();
for (let i = 0; i < recipe.length; i++) {
  for (let j = 0; j < recipe[i].ingredients.length; j++) {
    uniqueIngredientsSet.add(recipe[i].ingredients[j].ingredient.toLowerCase());
  }
}
const uniqueIngredients = [...uniqueIngredientsSet];
let toggleDropdownIngredient = false;

const onClickOpenDropdownIngredients = () => {
  toggleDropdownIngredient = !toggleDropdownIngredient;
  if (toggleDropdownIngredient) {
    hiddenIngredient.classList.remove("hidden");
  } else {
    hiddenIngredient.classList.add("hidden");
  }
};

dropDownIngredients.addEventListener("click", onClickOpenDropdownIngredients);

const dropdownAppliance = document.getElementById("appareils-filter-button");
const hiddenAppliance = document.getElementById("hidden-appareils-dropdown");
const applianceContainer = document.getElementById(
  "appareils-dropdown-container"
);
const applianceInputSearch = document.getElementById(
  "appareils-dropdown-search-1"
);

let uniqueApplianceSet = new Set();
for (let i = 0; i < recipe.length; i++) {
  uniqueApplianceSet.add(recipe[i].appliance.toLowerCase());
}
const uniqueAppliance = [...uniqueApplianceSet];
let toggleDropdownAppliance = false;

const onClickOpenDropdownAppliances = () => {
  toggleDropdownAppliance = !toggleDropdownAppliance;

  if (toggleDropdownAppliance) {
    hiddenAppliance.classList.remove("hidden");
  } else {
    hiddenAppliance.classList.add("hidden");
  }
};

dropdownAppliance.addEventListener("click", onClickOpenDropdownAppliances);

const dropdownUstensils = document.getElementById("ustensiles-filter-button");
const hiddenUstensils = document.getElementById("hidden-ustensiles-dropdown");
const ustensilsContainer = document.getElementById(
  "ustensiles-dropdown-container"
);
const ustensilInputSearch = document.getElementById(
  "ustensiles-dropdown-search-1"
);
let uniqueUstensilsSets = new Set();
for (let i = 0; i < recipe.length; i++) {
  for (let j = 0; j < recipe[i].ustensils.length; j++) {
    uniqueUstensilsSets.add(recipe[i].ustensils[j].toLowerCase());
  }
}
const uniqueUstensils = [...uniqueUstensilsSets];

let toggleDropdownUstensils = false;

const onClickOpenDropdownUstenstils = () => {
  toggleDropdownUstensils = !toggleDropdownUstensils;
  if (toggleDropdownUstensils) {
    hiddenUstensils.classList.remove("hidden");
  } else {
    hiddenUstensils.classList.add("hidden");
  }
};

dropdownUstensils.addEventListener("click", onClickOpenDropdownUstenstils);

const displayDropdownIngredient = (uniqueIngredients) => {
  ingredientContainer.innerHTML = "";
  for (let i = 0; i < uniqueIngredients.length && i < 10; i++) {
    ingredientContainer.innerHTML += `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]" id="${uniqueIngredients[i]}">${uniqueIngredients[i]}</li>`;
  }
};

const displayDropdownAppliance = (uniqueAppliance) => {
  applianceContainer.innerHTML = "";
  for (let i = 0; i < uniqueAppliance.length && i < 10; i++) {
    applianceContainer.innerHTML += `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]" id="${uniqueAppliance[i]}">${uniqueAppliance[i]}</li>`;
  }
};

const displayDropdownUstensil = (uniqueUstensils) => {
  ustensilsContainer.innerHTML = "";
  for (let i = 0; i < uniqueUstensils.length && i < 10; i++) {
    ustensilsContainer.innerHTML += `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]" id="${uniqueUstensils[i]}">${uniqueUstensils[i]}</li>`;
  }
};

displayDropdownIngredient(uniqueIngredients);
displayDropdownAppliance(uniqueAppliance);
displayDropdownUstensil(uniqueUstensils);

const onInputChangeApplyFilterIngredientSearch = () => {
  let searchIngredient = "";
  ingredientInputSearch.addEventListener("input", (e) => {
    searchIngredient = e.target.value.toLowerCase();
    const filteredIngredient = [];

    for (const ingredient of uniqueIngredients) {
      if (ingredient.toLowerCase().includes(searchIngredient)) {
        filteredIngredient.push(ingredient);
      }
    }

    const uniqueFilteredIngredient = [...new Set(filteredIngredient)];
    displayDropdownIngredient(uniqueFilteredIngredient);
  });

  const ingredientTagContainer = document.querySelector(".ingredient-tag");

  ingredientContainer.addEventListener("click", (e) => {
    let filteredRecipes = [];
    let ingredientId = e.target.id;

    ingredientTagContainer.innerHTML = `
    <span class="absolute right-1 top-1 cursor-pointer" id="close-tags-ingredient">x</span>
      <p class="bg-[#FFD15B] p-2 my-2  text-xs rounded-md text-center" id="tags-ingredient">${ingredientId}</p>    
    `;
    for (const rec of recipe) {
      for (const ingredient of rec.ingredients) {
        if (
          ingredient.ingredient.toLowerCase() === ingredientId.toLowerCase()
        ) {
          filteredRecipes.push(rec);
          break; // Sortir de la boucle dès qu'un ingrédient correspondant est trouvé
        }
      }
    }

    let mappedFilteredRecipe = [];
    for (const rec of filteredRecipes) {
      const ingredients = [];
      for (const ingred of rec.ingredients) {
        ingredients.push(ingred.ingredient);
      }
      mappedFilteredRecipe.push(ingredients);
    }

    let allIngredients = mappedFilteredRecipe.flat();

    const mappedFilteredApplianceUstensils = [];
    for (const ust of filteredRecipes) {
      const ustensils = [];
      for (const ustensil of ust.ustensils) {
        ustensils.push(ustensil);
      }
      mappedFilteredApplianceUstensils.push(ustensils);
    }

    const allUstensilAfterIngredientFilter =
      mappedFilteredApplianceUstensils.flat();

    const mappedFilteredUstensilAppliance = [];
    for (const appliance of filteredRecipes) {
      mappedFilteredUstensilAppliance.push(appliance.appliance);
    }

    const allApplianceAfterIngredientFilter = [
      ...new Set(mappedFilteredUstensilAppliance),
    ];

    displayRecipe(filteredRecipes);
    displayDropdownIngredient(allIngredients);
    displayDropdownUstensil(allUstensilAfterIngredientFilter);
    displayDropdownAppliance(allApplianceAfterIngredientFilter);
    changeDynamicallyTotalRecipe(filteredRecipes.length);

    const closeTags = document.getElementById("close-tags-ingredient");
    const tag = document.getElementById("tags-ingredient");
    closeTags.addEventListener("click", () => {
      displayRecipe(recipe);
      changeDynamicallyTotalRecipe(recipe.length);
      displayDropdownUstensil(uniqueUstensils);
      displayDropdownAppliance(uniqueAppliance);
      displayDropdownIngredient(uniqueIngredients);
      tag.classList.add("hidden");
      closeTags.classList.add("hidden");
    });
  });
};

const onInputChangeApplyFilterApplianceSearch = () => {
  let searchAppliance = "";
  applianceInputSearch.addEventListener("input", (e) => {
    searchAppliance = e.target.value.toLowerCase();
    let filteredAppliance = [];

    for (const appliance of uniqueAppliance) {
      if (appliance.toLowerCase().includes(searchAppliance)) {
        filteredAppliance.push(appliance);
      }
    }

    const uniqueFilteredAppliance = [...new Set(filteredAppliance)];
    displayDropdownAppliance(uniqueFilteredAppliance);
  });

  const applianceTagContainer = document.querySelector(".appareils-tag");
  applianceContainer.addEventListener("click", (e) => {
    let filteredRecipesAppliance = [];
    hiddenAppliance.classList.add("hidden");
    let applianceId = e.target.id;
    console.log(applianceId);
    applianceTagContainer.innerHTML = `
      <span class="absolute right-1 top-1 cursor-pointer" id="close-tags-appliance">x</span>
      <p class="bg-[#FFD15B] p-2 my-2 text-xs rounded-md text-center" id="tags-appliance">${applianceId}</p>    
    `;

    for (let rec of recipe) {
      if (rec.appliance.toLowerCase().includes(applianceId)) {
        filteredRecipesAppliance.push(rec);
      }
    }
    let allIngredientAfterApplianceFilter = [];
    let allUstensilAfterApplianceFilter = [];
    for (let rec of filteredRecipesAppliance) {
      for (let ingred of rec.ingredients) {
        allIngredientAfterApplianceFilter.push(ingred.ingredient);
      }
      for (let ustensil of rec.ustensils) {
        allUstensilAfterApplianceFilter.push(ustensil);
      }
    }

    console.log(filteredRecipesAppliance);
    displayRecipe(filteredRecipesAppliance);
    changeDynamicallyTotalRecipe(filteredRecipesAppliance.length);
    displayDropdownIngredient(allIngredientAfterApplianceFilter);
    displayDropdownUstensil(allUstensilAfterApplianceFilter);

    // Gestion de la fermeture des tags
    const closeTags = document.getElementById("close-tags-appliance");
    const tag = document.getElementById("tags-appliance");
    closeTags.addEventListener("click", () => {
      // Réinitialisation des recettes et des dropdowns
      displayRecipe(recipe);
      changeDynamicallyTotalRecipe(recipe.length);
      displayDropdownUstensil(uniqueUstensils);
      displayDropdownAppliance(uniqueAppliance);
      displayDropdownIngredient(uniqueIngredients);
      tag.classList.add("hidden");
      closeTags.classList.add("hidden");
    });
  });
};

const onInputChangeApplyFilterUstensilSearch = () => {
  let searchUstensil = "";
  ustensilInputSearch.addEventListener("input", (e) => {
    searchUstensil = e.target.value.toLowerCase();
    let filteredUstensils = [];
    let filteredRecipes = [];

    // Filtrer les ustensiles
    for (let ustensil of uniqueUstensils) {
      if (ustensil.toLowerCase().includes(searchUstensil)) {
        filteredUstensils.push(ustensil);
      }
    }

    // Filtrer les recettes
    for (let rec of recipe) {
      for (let ustensil of rec.ustensils) {
        if (ustensil.toLowerCase().includes(searchUstensil)) {
          filteredRecipes.push(rec);
          break; // Éviter les doublons dans les recettes
        }
      }
    }

    const uniqueFilteredUstensils = [...new Set(filteredUstensils)];
    displayDropdownUstensil(uniqueFilteredUstensils);
    displayRecipe(filteredRecipes);
  });

  const ustensilTagContainer = document.querySelector(".ustensiles-tag");
  ustensilsContainer.addEventListener("click", (e) => {
    hiddenUstensils.classList.add("hidden");
    let ustensilId = e.target.id;
    ustensilTagContainer.innerHTML = `
    <span class="absolute right-1 top-1 cursor-pointer" id="close-tags-ustensil">x</span>
      <p class="bg-[#FFD15B] p-2 my-2  text-xs rounded-md text-center" id="tags-ustensil">${ustensilId}</p>    
    `;
    let filteredRecipesUstensil = [];

    for (let rec of recipe) {
      for (let ustensil of rec.ustensils) {
        if (ustensil.toLowerCase().includes(ustensilId)) {
          filteredRecipesUstensil.push(rec);
          break; // Éviter les doublons dans les recettes
        }
      }
    }

    let mappedFilteredUstensilIngredient = filteredRecipesUstensil.map((rec) =>
      rec.ingredients.map((ingred) => ingred.ingredient)
    );
    let mappedFilteredUstensilAppliance = filteredRecipesUstensil.map(
      (appliance) => appliance.appliance
    );
    let allIngredientAfterUstensilFilter =
      mappedFilteredUstensilIngredient.flat();
    let allApplianceAfterUstensilFilter = [
      ...new Set(mappedFilteredUstensilAppliance),
    ];

    displayRecipe(filteredRecipesUstensil);
    changeDynamicallyTotalRecipe(filteredRecipesUstensil.length);
    displayDropdownAppliance(allApplianceAfterUstensilFilter);
    displayDropdownIngredient(allIngredientAfterUstensilFilter);

    const closeTags = document.getElementById("close-tags-ustensil");
    const tag = document.getElementById("tags-ustensil");
    closeTags.addEventListener("click", () => {
      displayRecipe(recipe);
      displayDropdownUstensil(uniqueUstensils);
      displayDropdownAppliance(uniqueAppliance);
      displayDropdownIngredient(uniqueIngredients);

      changeDynamicallyTotalRecipe(recipe.length);
      tag.classList.add("hidden");
      closeTags.classList.add("hidden");
    });
  });
};

onInputChangeApplyFilterIngredientSearch();
onInputChangeApplyFilterApplianceSearch();
onInputChangeApplyFilterUstensilSearch();
