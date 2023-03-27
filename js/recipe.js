import { getIngrItem, getMealById, timeout } from './request.js';

const recipeTitle = document.getElementById('recipe-main-title-text');
const recipeArea = document.getElementById('recipe-area-text');
const recipeCategory = document.getElementById('recipe-category-text');
const img = document.getElementById('full-recipe-img');
const ingredients = document.getElementsByClassName('ingredients-block')[0];
const recipeLink = document.getElementsByClassName('recipe-link')[0];
const recipeVideo = document.getElementsByClassName('recipe-video')[0];
const recipeInstruct = document.getElementById('recipe-instruction-text');
const loader = document.getElementsByClassName('loader')[0];

const pageTitle = document.getElementById('recipe-main-title');
const ingrDiv = document.getElementById('recipe-page');
const instrDiv = document.getElementById('recipe-instruct-block');

const loadFunc = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('idMeal')) {
        window.location.href = './index.html';
    }

    const idMeal = urlParams.get('idMeal');
    await getMealById(idMeal).then((data) => {
        recipeTitle.innerHTML = `${data.strMeal}`;
        recipeArea.innerHTML = `${data.strArea}`;
        recipeCategory.innerHTML = `${data.strCategory}`;
        img.setAttribute('src', `${data.strMealThumb}`);
        let dataInstr = data.strInstructions.replaceAll('\r\n\r\n', '\r\n');
        dataInstr = dataInstr.replaceAll(/(STEP \d+)(\r\n)/g, '<span style="font-weight:500;">$1</span><br>');
        dataInstr = dataInstr.replaceAll('\r\n', '<br><br>');
        recipeInstruct.innerHTML = `${dataInstr}`;
        if (data.strSource) {
            recipeLink.innerHTML = 'Recipe Source';
            recipeLink.setAttribute('href', `${data.strSource}`);
        }
        if (data.strYoutube) {
            const videoStr = document.getElementById('video-tutorial-text');
            videoStr.innerHTML = 'Video tutorial';
            const ytParams = new URLSearchParams(data.strYoutube.split('?')[1]);
            recipeVideo.setAttribute('src', `https://www.youtube.com/embed/${ytParams.get('v')}`);
        } else {
            recipeVideo.style.display = 'none';
        }
        for (let i = 1; i <= 20; i += 1) {
            const ingr = data[`strIngredient${i}`];
            if (!ingr) {
                break;
            }
            const measure = data[`strMeasure${i}`];
            ingredients.appendChild(getIngrItem(ingr, measure));
        }
    });

    await timeout(600);

    loader.style.display = 'none';
    pageTitle.style.display = 'flex';
    ingrDiv.style.display = 'flex';
    instrDiv.style.display = 'flex';
};

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('preload');
    loadFunc();
});
