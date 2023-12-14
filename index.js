import recipe from "./recipe.js";

//TODO commenter le code pour plus de clarté

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
}

displayRecipe(recipe);

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const searchFilter = () => {
  const inputSearch = document.getElementById("search");
  let searchValue = "";

  const handleInput = debounce((e) => {
    searchValue = e.target.value.toLowerCase();
    if (searchValue.length >= 3) {
      const filteredRecipe = recipe.filter((rec) => {
        return (
          rec.lowerName.includes(searchValue) ||
          rec.lowerDescription.includes(searchValue) ||
          rec.lowerIngredients.some((ingredient) =>
            ingredient.includes(searchValue)
          )
        );
      });
      displayRecipe(filteredRecipe);
    } else {
      displayRecipe(recipe);
    }
  }, 300); // Définissez un délai de 300 ms

  inputSearch.addEventListener("input", handleInput);
};

// Prétraitement des données (à faire une seule fois, si les données ne changent pas fréquemment)
recipe.forEach((rec) => {
  rec.lowerName = rec.name.toLowerCase();
  rec.lowerDescription = rec.description.toLowerCase();
  rec.lowerIngredients = rec.ingredients.map((ing) =>
    ing.ingredient.toLowerCase()
  );
});

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

const uniqueIngredients = [
  ...new Set(
    recipe.flatMap((rec) =>
      rec.ingredients.map((ing) => ing.ingredient.toLowerCase())
    )
  ),
];

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

const uniqueAppliance = [...new Set(recipe.flatMap((rec) => rec.appliance))];

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
const uniqueUstensil = [
  ...new Set(
    recipe.flatMap((rec) =>
      rec.ustensils.map((ustensil) => ustensil.toLowerCase())
    )
  ),
];
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
  recipe.forEach(() => {
    ingredientContainer.innerHTML = `${uniqueIngredients
      .slice(0, 10)
      .map(
        (ingredient) =>
          `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]">${ingredient}</li>`
      )
      .join("")}`;
  });
};

const displayDropdownAppliance = (uniqueAppliance) => {
  applianceContainer.innerHTML = "";
  recipe.forEach(() => {
    applianceContainer.innerHTML = `${uniqueAppliance
      .slice(0, 10)
      .map(
        (appliance) =>
          `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]">${appliance}</li>`
      )
      .join("")}`;
  });
};

const displayDropdownUstensil = (uniqueUstensil) => {
  ustensilsContainer.innerHTML = "";
  recipe.forEach(() => {
    ustensilsContainer.innerHTML = `${uniqueUstensil
      .slice(0, 10)
      .map(
        (ustensil) =>
          `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]">${ustensil}</li>`
      )
      .join("")}`;
  });
};

displayDropdownIngredient(uniqueIngredients);
displayDropdownAppliance(uniqueAppliance);
displayDropdownUstensil(uniqueUstensil);

const onInputChangeApplyFilterIngredientSearch = () => {
  let searchIngredient = "";
  ingredientInputSearch.addEventListener("input", (e) => {
    searchIngredient = e.target.value.toLowerCase();
    const filteredIngredient = uniqueIngredients.filter((ingredient) => {
      return ingredient.toLowerCase().includes(searchIngredient);
    });
    const filteredRecipes = recipe.filter((rec) =>
      rec.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchIngredient)
      )
    );
    const uniqueFilteredIngredient = [...new Set(filteredIngredient)];
    displayDropdownIngredient(uniqueFilteredIngredient);
    displayRecipe(filteredRecipes);
  });
};

const onInputChangeApplyFilterApplianceSearch = () => {
  let searchAppliance = "";
  applianceInputSearch.addEventListener("input", (e) => {
    searchAppliance = e.target.value.toLowerCase();
    const filteredAppliance = uniqueAppliance.filter((appliance) => {
      return appliance.toLowerCase().includes(searchAppliance);
    });
    const filteredRecipes = recipe.filter((rec) =>
      rec.appliance.toLowerCase().includes(searchAppliance)
    );
    const uniqueFilteredAppliance = [...new Set(filteredAppliance)];
    displayDropdownAppliance(uniqueFilteredAppliance);
    displayRecipe(filteredRecipes);
  });
};

const onInputChangeApplyFilterUstensilSearch = () => {
  let searchUstensil = "";
  ustensilInputSearch.addEventListener("input", (e) => {
    searchUstensil = e.target.value.toLowerCase();
    const filteredUstensils = uniqueUstensil.filter((ustensil) => {
      return ustensil.toLowerCase().includes(searchUstensil);
    });
    const filteredRecipes = recipe.filter((rec) =>
      rec.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(searchUstensil)
      )
    );
    const uniqueFilteredUstensils = [...new Set(filteredUstensils)];
    displayDropdownUstensil(uniqueFilteredUstensils);
    console.log(filteredRecipes);
    displayRecipe(filteredRecipes);
  });
};

onInputChangeApplyFilterIngredientSearch();
onInputChangeApplyFilterApplianceSearch();
onInputChangeApplyFilterUstensilSearch();
