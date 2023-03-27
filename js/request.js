const KEY = '1';
const categoryUrl = (category) => `https://www.themealdb.com/api/json/v1/${KEY}/filter.php?c=${category}`;
const searchUrl = (meal) => `https://www.themealdb.com/api/json/v1/${KEY}/search.php?s=${meal}`;
const searchByIdUrl = (id) => `https://www.themealdb.com/api/json/v1/${KEY}/lookup.php?i=${id}`;
const areaUrl = (area) => `https://www.themealdb.com/api/json/v1/${KEY}/filter.php?a=${area}`;
const areaListUrl = () => `https://www.themealdb.com/api/json/v1/${KEY}/list.php?a=list`;
const randomUrl = () => `https://www.themealdb.com/api/json/v1/${KEY}/random.php`;

const newRequest = async (endpoint) => (await fetch(endpoint, { method: 'GET' })).json();
export function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getMeal = (id, title, area, category, img, link) => {
    const mealBox = document.createElement('div');
    mealBox.classList.add('recipe-box');
    mealBox.innerHTML = `
        <img src="${img}" alt="" class="food-img-small">

        <div class="meal-title">${title}</div>
        <div class="meal-info">
            <div class="meal-area ">
                <div class="meal-area-text">
                    ${area}
                </div>
            </div>
            <div class="meal-area">
                <div class="meal-area-text">
                    ${category}
                </div>
            </div>

        </div>
       
            <a class="meal-recipe-button btn-animation" href="./recipe.html?idMeal=${id}">
                    Detailed recipe
               
            </a>
        
        <a href="${link}" class="meal-recipe-link">
            Watch on Youtube
        </a>
    `;

    return mealBox;
};

export const getByCategory = async (category, page, offset) => {
    const request = await newRequest(categoryUrl(category)).then(
        (recipes) => {
            if (recipes.meals.length <= page * offset) {
                recipes.moreElems = false;
            } else {
                recipes.moreElems = true;
            }

            recipes.meals = recipes.meals.slice((page - 1) * offset, page * offset);
            return recipes;
        },
    );
    return request;
};

export const getByArea = async (area, page, offset) => {
    const request = await newRequest(areaUrl(area)).then(
        (recipes) => {
            if (recipes.meals.length <= page * offset) {
                recipes.moreElems = false;
            } else {
                recipes.moreElems = true;
            }

            recipes.meals = recipes.meals.slice((page - 1) * offset, page * offset);
            return recipes;
        },
    );
    return request;
};
export const getOption = (id, title, img) => {
    const optionBox = document.createElement('a');
    optionBox.style.all = 'unset';
    optionBox.setAttribute('href', `recipe.html?idMeal=${id}`);
    optionBox.innerHTML = `
        <div class="search-option-item">
            <img src="${img}" alt="" class="option-img">
            <p class="search-option-text">${title}</p>
        </div>
    `;

    return optionBox;
};

export const getSearchOptions = async (meal) => {
    const request = await newRequest(searchUrl(meal)).then(
        (data) => {
            if (data.meals) {
                data.meals = data.meals.slice(0, 5);
            } else {
                data.meals = [];
            }
            return data;
        },
    );
    return request;
};

export const getSearchResults = async (meal, page, offset) => {
    const request = await newRequest(searchUrl(meal)).then(
        (data) => {
            if (data.meals) {
                data.moreElems = data.meals.length > page * offset;
                data.meals = data.meals.slice((page - 1) * offset, page * offset);
            } else {
                data.meals = [];
                data.moreElems = false;
            }
            return data;
        },
    );
    return request;
};

export const getAllAreas = async () => {
    const request = await newRequest(areaListUrl()).then(
        (data) => data,
    );
    return request;
};

export const getRandomMeal = async () => {
    const request = await newRequest(randomUrl()).then(
        (data) => data,
    );
    return request;
};
export const getIngrItem = (ingr, measure) => {
    const ingrItem = document.createElement('div');
    ingrItem.classList.add('ingr-item');
    ingrItem.innerHTML = `
        <p class="ingr-title">${ingr}</p>
        <p class="ingr-measure">${measure}</p>
    `;
    return ingrItem;
};

export const getMealById = async (id) => {
    const request = await newRequest(searchByIdUrl(id)).then(
        (data) => data.meals[0],
    );
    return request;
};

export const getFullRecipe = () => {

};
