import recipe from "./recipe.js";

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
  // 1- récupérer l'input
  const inputSearch = document.getElementById("search");
  //2- Déclarer une variable pour récupérer les données
  let searchValue = "";
  //3- récupérer les données passées dans l'input (e.target.value) avec un eventListener + algo pour vérifier SI des noms correspondent entre le recipe et le champ recherche
  inputSearch.addEventListener("input", (e) => {
    searchValue = e.target.value.toLowerCase();
    let filteredRecipe = [];

    //Lancer la boucle uniquement si la recherche fait au moins 3 caractères
    if (searchValue.length < 3) return;

    for (let i = 0; i < recipe.length; i++) {
      let nameMatch = recipe[i].name.toLowerCase().includes(searchValue);
      let descriptionMatch = recipe[i].description
        .toLowerCase()
        .includes(searchValue);
      let ingredientMatch = recipe[i].ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchValue)
      );

      //S'il y a un match, on push les match dans le nouveau tableau
      if (nameMatch || descriptionMatch || ingredientMatch) {
        filteredRecipe.push(recipe[i]);
      }
    }
    // enfin, on affiche le contenu du nouveau tableau avec la même logique d'affichage
    displayRecipe(filteredRecipe);
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
    ingredientContainer.innerHTML += `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]">${uniqueIngredients[i]}</li>`;
  }
};

const displayDropdownAppliance = (uniqueAppliance) => {
  applianceContainer.innerHTML = "";
  for (let i = 0; i < uniqueAppliance.length && i < 10; i++) {
    applianceContainer.innerHTML += `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]">${uniqueAppliance[i]}</li>`;
  }
};

const displayDropdownUstensil = (uniqueUstensils) => {
  ustensilsContainer.innerHTML = "";
  for (let i = 0; i < uniqueUstensils.length && i < 10; i++) {
    ustensilsContainer.innerHTML += `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]">${uniqueUstensils[i]}</li>`;
  }
};

displayDropdownIngredient(uniqueIngredients);
displayDropdownAppliance(uniqueAppliance);
displayDropdownUstensil(uniqueUstensils);

const onInputChangeApplyFilterIngredientSearch = () => {
  ingredientInputSearch.addEventListener("input", (e) => {
    let searchIngredient = e.target.value.toLowerCase();
    let filteredIngredient = [];
    let filteredRecipes = [];

    for (let ingredient of uniqueIngredients) {
      if (ingredient.includes(searchIngredient)) {
        filteredIngredient.push(ingredient);
      }
    }

    for (let rec of recipe) {
      for (let ingredient of rec.ingredients) {
        if (ingredient.ingredient.toLowerCase().includes(searchIngredient)) {
          filteredRecipes.push(rec);
          break;
        }
      }
    }

    const uniqueFilteredIngredient = [...new Set(filteredIngredient)];
    displayDropdownIngredient(uniqueFilteredIngredient);
    displayRecipe(filteredRecipes);
  });
};

const onInputChangeApplyFilterApplianceSearch = () => {
  applianceInputSearch.addEventListener("input", (e) => {
    let searchAppliance = e.target.value.toLowerCase();
    let filteredAppliance = [];
    let filteredRecipes = [];

    for (let appliance of uniqueAppliance) {
      if (appliance.includes(searchAppliance)) {
        filteredAppliance.push(appliance);
      }
    }

    for (let rec of recipe) {
      if (rec.appliance.toLowerCase().includes(searchAppliance)) {
        filteredRecipes.push(rec);
      }
    }

    const uniqueFilteredAppliance = [...new Set(filteredAppliance)];
    displayDropdownAppliance(uniqueFilteredAppliance);
    displayRecipe(filteredRecipes);
  });
};

const onInputChangeApplyFilterUstensilsSearch = () => {
  ustensilInputSearch.addEventListener("input", (e) => {
    let searchUstensils = e.target.value.toLowerCase();
    let filteredUstensils = [];
    let filteredRecipes = [];

    for (let ustensil of uniqueUstensils) {
      if (ustensil.includes(searchUstensils)) {
        filteredUstensils.push(ustensil);
      }
    }

    for (let rec of recipe) {
      for (let ustensil of rec.ustensils) {
        if (ustensil.toLowerCase().includes(searchUstensils)) {
          filteredRecipes.push(rec);
          break;
        }
      }
    }

    const uniqueFilteredUstensils = [...new Set(filteredUstensils)];
    displayDropdownUstensil(uniqueFilteredUstensils);
    displayRecipe(filteredRecipes);
  });
};

onInputChangeApplyFilterIngredientSearch();
onInputChangeApplyFilterApplianceSearch();
onInputChangeApplyFilterUstensilsSearch();
