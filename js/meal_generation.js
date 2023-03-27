import {
    getIngrItem, timeout, getRandomMeal,
} from './request.js';
// import { getIngrItem } from "./recipe.js";
const generateButton = document.getElementsByClassName('meal-gnr-btn')[0];
const recipeTitle = document.getElementById('meal-gnr-recipe-title');
const recipeArea = document.getElementById('recipe-area-text');
const recipeCategory = document.getElementById('recipe-category-text');
const img = document.getElementById('full-recipe-img');
const ingredients = document.getElementsByClassName('ingredients-block')[0];
const loader = document.getElementsByClassName('loader')[0];
const ingrDiv = document.getElementById('meal-gnr-recipes');
const detailedRecipe = document.getElementById('meal-gnr-detailed-recipe');

const randomRecipe = async () => {
    getRandomMeal().then((data) => {
        data = data.meals[0];
        recipeTitle.innerHTML = `${data.strMeal}`;
        recipeArea.innerHTML = `${data.strArea}`;
        recipeCategory.innerHTML = `${data.strCategory}`;
        img.setAttribute('src', `${data.strMealThumb}`);

        for (let i = 1; i <= 20; i += 1) {
            const ingr = data[`strIngredient${i}`];
            if (!ingr) {
                break;
            }
            const measure = data[`strMeasure${i}`];
            ingredients.appendChild(getIngrItem(ingr, measure));
        }
        detailedRecipe.setAttribute('href', `./recipe.html?idMeal=${data.idMeal}`);
    });
};
generateButton.addEventListener('click', () => {
    randomRecipe();
    ingredients.innerHTML = '';
});

const loadFunc = async () => {
    document.body.classList.remove('preload');

    await randomRecipe();
    await timeout(1000);
    loader.style.display = 'none';
    recipeTitle.style.display = 'block';
    ingrDiv.style.display = 'flex';
};
document.addEventListener('DOMContentLoaded', () => {
    loadFunc();
});
