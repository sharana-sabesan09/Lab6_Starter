// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	let recipes = localStorage.getItem('recipes');
	if (recipes) {
		return JSON.parse(recipes);
	} else {
		return [];
	}
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	let main = document.querySelector('main');
	for (let i = 0; i < recipes.length; i++) {
		let card = document.createElement('recipe-card');
		card.data = recipes[i];
		main.append(card);
	}
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	let form = document.querySelector('#new-recipe');

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let formData = new FormData(form);
		let recipeData = {};
		formData.forEach((value, key) => {
			recipeData[key] = value;
		});

		let card = document.createElement('recipe-card');
		card.data = recipeData;
		document.querySelector('main').append(card);

		let recipes = getRecipesFromStorage();
		recipes.push(recipeData);
		saveRecipesToStorage(recipes);
	});

	let clearBtn = document.querySelector('button.danger');
	clearBtn.addEventListener('click', () => {
		localStorage.clear();
		document.querySelector('main').innerHTML = '';
	});
}
