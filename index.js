import recipe from "./recipe.js";

// Constantes
const recipeContainer = document.getElementById("recipe-container");
const totalRecipeContainer = document.querySelector(".total_recette_container");
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
const dropdownAppliance = document.getElementById("appareils-filter-button");
const hiddenAppliance = document.getElementById("hidden-appareils-dropdown");
const applianceContainer = document.getElementById(
  "appareils-dropdown-container"
);
const applianceInputSearch = document.getElementById(
  "appareils-dropdown-search-1"
);
const uniqueAppliance = [...new Set(recipe.flatMap((rec) => rec.appliance))];
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

// Variables
let toggleDropdownAppliance = false;
let toggleDropdownIngredient = false;
let toggleDropdownUstensils = false;
let filteredRecipes = [];
let allIngredients;
let mappedFilteredRecipe;

// Fonctions
function displayRecipe(recipe) {
  recipeContainer.innerHTML = "";
  recipe.slice(0, 10).forEach((recette) => {
    recipeContainer.innerHTML += `
      <div class="card mt-16 bg-white rounded-xl shadow-cardShadow lg:w-[27%] md:w-[45%]">
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

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const changeDynamicallyTotalRecipe = (totalRecipe) => {
  totalRecipeContainer.innerHTML = "";

  totalRecipeContainer.innerHTML += `${totalRecipe} recettes`;
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
      mappedFilteredRecipe = filteredRecipe.map((rec) =>
        rec.ingredients.map((ingred) => ingred.ingredient)
      );
      allIngredients = mappedFilteredRecipe.flat();
      const mappedFilteredApplianceUstensils = filteredRecipe.map((ust) =>
        ust.ustensils.map((ustensil) => ustensil)
      );
      const allUstensilAfterIngredientFilter =
        mappedFilteredApplianceUstensils.flat();

      const mappedFilteredUstensilAppliance = filteredRecipe.map(
        (appliance) => appliance.appliance
      );

      const allApplianceAfterIngredientFilter = [
        ...new Set(mappedFilteredUstensilAppliance),
      ];
      if (filteredRecipe.length) {
        console.log(filteredRecipe.length);
        displayRecipe(filteredRecipe);
        changeDynamicallyTotalRecipe(filteredRecipe.length);
        displayDropdownIngredient(allIngredients);
        displayDropdownUstensil(allUstensilAfterIngredientFilter);
        displayDropdownAppliance(allApplianceAfterIngredientFilter);
      } else {
        recipeContainer.innerHTML =
          "<h2 class='h-screen flex  items-center text-3xl text-[#FFD15B] font-anton uppercase'>Désolé, aucune recette ne correspond à votre recherche</h2>";
      }
    } else {
      displayRecipe(recipe);
      changeDynamicallyTotalRecipe(recipe.length);
      displayDropdownIngredient(uniqueIngredients);
      displayDropdownUstensil(uniqueUstensil);
      displayDropdownAppliance(uniqueAppliance);
    }
  }, 300);
  inputSearch.addEventListener("input", handleInput);
};

recipe.forEach((rec) => {
  rec.lowerName = rec.name.toLowerCase();
  rec.lowerDescription = rec.description.toLowerCase();
  rec.lowerIngredients = rec.ingredients.map((ing) =>
    ing.ingredient.toLowerCase()
  );
});

const onClickOpenDropdownIngredients = () => {
  toggleDropdownIngredient = !toggleDropdownIngredient;
  if (toggleDropdownIngredient) {
    hiddenIngredient.classList.remove("hidden");
  } else {
    hiddenIngredient.classList.add("hidden");
  }
};

const onClickOpenDropdownAppliances = () => {
  toggleDropdownAppliance = !toggleDropdownAppliance;

  if (toggleDropdownAppliance) {
    hiddenAppliance.classList.remove("hidden");
  } else {
    hiddenAppliance.classList.add("hidden");
  }
};

const onClickOpenDropdownUstenstils = () => {
  toggleDropdownUstensils = !toggleDropdownUstensils;
  if (toggleDropdownUstensils) {
    hiddenUstensils.classList.remove("hidden");
  } else {
    hiddenUstensils.classList.add("hidden");
  }
};

const displayDropdownIngredient = (uniqueIngredients) => {
  ingredientContainer.innerHTML = "";
  recipe.forEach(() => {
    if (uniqueIngredients.length) {
      ingredientContainer.innerHTML = `${uniqueIngredients
        .slice(0, 10)
        .map(
          (ingredient) =>
            `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]" id="${ingredient}">${ingredient}</li>`
        )
        .join("")}`;
    } else {
      ingredientContainer.innerHTML =
        "<p class='text-xs text-[#FFD15B] font-anton'>Aucun ingrédients trouvés.</p>";
    }
  });
};

const displayDropdownAppliance = (uniqueAppliance) => {
  applianceContainer.innerHTML = "";
  recipe.forEach(() => {
    if (uniqueAppliance.length) {
      applianceContainer.innerHTML = `${uniqueAppliance
        .slice(0, 10)
        .map(
          (appliance) =>
            `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]" id="${appliance}">${appliance}</li>`
        )
        .join("")}`;
    } else {
      applianceContainer.innerHTML =
        "<p class='text-xs text-[#FFD15B] font-anton'>Aucun appareils trouvés.</p>";
    }
  });
};

const displayDropdownUstensil = (uniqueUstensil) => {
  ustensilsContainer.innerHTML = "";
  recipe.forEach(() => {
    if (uniqueUstensil.length) {
      ustensilsContainer.innerHTML = `${uniqueUstensil
        .slice(0, 10)
        .map(
          (ustensil) =>
            `<li class="bg-white p-1 cursor-pointer list-none hover:bg-[#FFD15B]" id="${ustensil}">${ustensil}</li>`
        )
        .join("")}`;
    } else {
      ustensilsContainer.innerHTML =
        "<p class='text-xs text-[#FFD15B] font-anton'>Aucun ustensiles trouvés.</p>";
    }
  });
};

const onInputChangeApplyFilterIngredientSearch = () => {
  let searchIngredient = "";
  ingredientInputSearch.addEventListener("input", (e) => {
    searchIngredient = e.target.value.toLowerCase();
    const filteredIngredient = uniqueIngredients.filter((ingredient) => {
      return ingredient.toLowerCase().includes(searchIngredient);
    });
    const uniqueFilteredIngredient = [...new Set(filteredIngredient)];
    displayDropdownIngredient(uniqueFilteredIngredient);
  });
  const ingredientTagContainer = document.querySelector(".ingredient-tag");
  ingredientContainer.addEventListener("click", (e) => {
    hiddenIngredient.classList.add("hidden");
    let ingredientId = e.target.id;
    ingredientTagContainer.innerHTML = `
    <span class="absolute right-1 top-1 cursor-pointer" id="close-tags-ingredient">x</span>
      <p class="bg-[#FFD15B] p-2 my-2  text-xs rounded-md text-center" id="tags-ingredient">${ingredientId}</p>    
    `;
    filteredRecipes = recipe.filter((rec) =>
      rec.ingredients.some((ingredient) => {
        return ingredient.ingredient.toLowerCase().includes(ingredientId);
      })
    );
    mappedFilteredRecipe = filteredRecipes.map((rec) =>
      rec.ingredients.map((ingred) => ingred.ingredient)
    );
    allIngredients = mappedFilteredRecipe.flat();
    const mappedFilteredApplianceUstensils = filteredRecipes.map((ust) =>
      ust.ustensils.map((ustensil) => ustensil)
    );
    const allUstensilAfterIngredientFilter =
      mappedFilteredApplianceUstensils.flat();

    const mappedFilteredUstensilAppliance = filteredRecipes.map(
      (appliance) => appliance.appliance
    );

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
    const filteredAppliance = uniqueAppliance.filter((appliance) => {
      return appliance.toLowerCase().includes(searchAppliance);
    });
    const uniqueFilteredAppliance = [...new Set(filteredAppliance)];
    displayDropdownAppliance(uniqueFilteredAppliance);
  });
  const applianceTagContainer = document.querySelector(".appareils-tag");
  applianceContainer.addEventListener("click", (e) => {
    let filteredRecipesAppliance = [];
    hiddenAppliance.classList.add("hidden");
    let applianceId = e.target.id;
    applianceTagContainer.innerHTML = `
    <span class="absolute right-1 top-1 cursor-pointer" id="close-tags-appliance">x</span>
      <p class="bg-[#FFD15B] p-2 my-2  text-xs rounded-md text-center" id="tags-appliance">${applianceId}</p>    
    `;
    filteredRecipesAppliance = recipe.filter((rec) =>
      rec.appliance.includes(applianceId)
    );
    const mappedFilteredApplianceIngredient = filteredRecipesAppliance.map(
      (rec) => rec.ingredients.map((ingred) => ingred.ingredient)
    );
    const mappedFilteredApplianceUstensils = filteredRecipesAppliance.map(
      (ust) => ust.ustensils.map((ustensil) => ustensil)
    );
    const allIngredientAfterApplianceFilter =
      mappedFilteredApplianceIngredient.flat();
    const allUstensilAfterApplianceFilter =
      mappedFilteredApplianceUstensils.flat();
    displayRecipe(filteredRecipesAppliance);
    changeDynamicallyTotalRecipe(filteredRecipesAppliance.length);
    displayDropdownIngredient(allIngredientAfterApplianceFilter);
    displayDropdownUstensil(allUstensilAfterApplianceFilter);
    const closeTags = document.getElementById("close-tags-appliance");
    const tag = document.getElementById("tags-appliance");
    closeTags.addEventListener("click", () => {
      displayRecipe(recipe);
      changeDynamicallyTotalRecipe(recipe.length);
      displayDropdownAppliance(uniqueAppliance);
      tag.classList.add("hidden");
      closeTags.classList.add("hidden");
    });
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
    const filteredRecipesUstensil = recipe.filter((rec) =>
      rec.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(ustensilId)
      )
    );
    const mappedFilteredUstensilIngredient = filteredRecipesUstensil.map(
      (rec) => rec.ingredients.map((ingred) => ingred.ingredient)
    );
    const mappedFilteredUstensilAppliance = filteredRecipesUstensil.map(
      (appliance) => appliance.appliance
    );
    const allIngredientAfterUstensilFilter =
      mappedFilteredUstensilIngredient.flat();
    const allApplianceAfterUstensilFilter = [
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
      displayDropdownIngredient(uniqueUstensil);
      changeDynamicallyTotalRecipe(recipe.length);
      tag.classList.add("hidden");
      closeTags.classList.add("hidden");
    });
  });
};

//Event Listener
dropDownIngredients.addEventListener("click", onClickOpenDropdownIngredients);
dropdownAppliance.addEventListener("click", onClickOpenDropdownAppliances);
dropdownUstensils.addEventListener("click", onClickOpenDropdownUstenstils);

//Played function
displayDropdownIngredient(uniqueIngredients);
displayDropdownAppliance(uniqueAppliance);
displayDropdownUstensil(uniqueUstensil);
onInputChangeApplyFilterIngredientSearch();
onInputChangeApplyFilterApplianceSearch();
onInputChangeApplyFilterUstensilSearch();
searchFilter();
changeDynamicallyTotalRecipe(recipe.length);
displayRecipe(recipe);
