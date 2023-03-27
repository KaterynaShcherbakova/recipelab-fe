import {
    timeout, getByArea, getSearchResults, getAllAreas,
    getByCategory, getMeal,
    getMealById, getOption, getSearchOptions,
} from './request.js';

let mealsPage = 1;
const pageOffset = 24;
let currCategory = 'Pasta';
let moreElems = true;
let area; let
    lastInput;
let currList;
const pageNumBlock = document.getElementsByClassName('main-page-num')[0];
const pageNumerationDiv = document.getElementsByClassName('main-page-numeration')[0];
const filterButton = document.getElementsByClassName('filter-icon')[0];
const filterBlock = document.getElementsByClassName('filter-block')[0];
const filterCancelBtn = document.getElementById('cancel-btn');
const filterApplyBtn = document.getElementById('apply-btn');
const latest = document.getElementById('latest-checkbox');
const byArea = document.getElementById('area-checkbox');
const areaInput = document.getElementById('select-filter-area');
const searchInput = document.getElementsByClassName('search-input')[0];
const searchOptions = document.getElementsByClassName('search-option-block')[0];
const searchBtn = document.getElementById('search-icon');
const mealsBlock = document.getElementById('main-meals');
const categoryList = document.getElementById('category-list').getElementsByClassName('lower-header-scrollbar-text');

const loader = document.getElementsByClassName('loader')[0];
const optionBlock = document.getElementsByClassName('search-option-block')[0];
const addOption = (block) => {
    optionBlock.appendChild(block);
};

const removeOption = () => {
    optionBlock.innerHTML = '';
};

const setPageNum = () => {
    pageNumBlock.innerHTML = mealsPage;
    currList();
};

const nextPage = document.getElementById('next-page');
const prevPage = document.getElementById('prev-page');
const cancelFilterChoice = () => {
    latest.checked = false;
    byArea.checked = false;
    areaInput.selectedIndex = 0;
    filterBlock.classList.remove('show-filter-box');
    areaInput.classList.remove('show-area-selection');
};

const addMeals = (block) => {
    mealsBlock.appendChild(block);
};

const removeMeals = () => {
    mealsBlock.innerHTML = '';
};

const removeChosen = () => {
    [...categoryList].forEach(
        (elem) => elem.classList.remove('chosen-category'),
    );
};
const showCategoryList = async (category, isFirstPage = true) => {
    if (isFirstPage) { mealsPage = 1; pageNumBlock.innerHTML = mealsPage; }
    await getByCategory(category, mealsPage, pageOffset).then((recipes) => {
        removeMeals();
        moreElems = recipes.moreElems;
        recipes.meals.forEach(async (elem) => {
            getMealById(elem.idMeal).then(
                (el) => {
                    addMeals(getMeal(
                        el.idMeal,
                        el.strMeal,
                        el.strArea,
                        category,
                        el.strMealThumb,
                        el.strYoutube,
                    ));
                },
            );
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    currList = () => { showCategoryList(category, false); };
};

currList = () => { showCategoryList(currCategory, false); };

filterButton.addEventListener('click', () => {
    filterBlock.classList.add('show-filter-box');
});

filterCancelBtn.addEventListener('click', () => {
    cancelFilterChoice();
});

const showAreaList = async (listArea, isFirstPage = true) => {
    if (isFirstPage) { mealsPage = 1; pageNumBlock.innerHTML = mealsPage; }
    await getByArea(listArea, mealsPage, pageOffset).then((data) => {
        removeMeals();
        removeChosen();
        moreElems = data.moreElems;

        data.meals.forEach(async (elem) => {
            getMealById(elem.idMeal).then(
                (el) => {
                    addMeals(getMeal(
                        el.idMeal,
                        el.strMeal,
                        el.strArea,
                        el.strCategory,
                        el.strMealThumb,
                        el.strYoutube,
                    ));
                },
            );
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    currList = () => { showAreaList(area, false); };
};
filterApplyBtn.addEventListener('click', () => {
    area = areaInput.value;
    if (area) {
        showAreaList(areaInput.value);
    }
    cancelFilterChoice();
});

byArea.addEventListener('change', (e) => {
    if (e.target.checked) {
        latest.checked = false;
        areaInput.classList.add('show-area-selection');
    } else {
        areaInput.classList.remove('show-area-selection');
        areaInput.selectedIndex = 0;
    }
});
latest.addEventListener('change', (e) => {
    if (e.target.checked) {
        byArea.checked = false;
        areaInput.classList.remove('show-area-selection');
        areaInput.selectedIndex = 0;
        area = '';
    }
});

searchInput.addEventListener('focus', (e) => {
    if (e.target.value) {
        searchOptions.classList.add('show-search-options');
    } else {
        searchOptions.classList.remove('show-search-options');
    }
});

const hideSearchOptions = () => {
    setTimeout(() => {
        searchOptions.classList.remove('show-search-options');
    }, 100);
};

searchInput.addEventListener('input', (e) => {
    if (e.target.value) {
        searchOptions.classList.add('show-search-options');

        getSearchOptions(e.target.value).then(
            (data) => {
                removeOption();
                data.meals.forEach((el) => addOption(getOption(
                    el.idMeal,
                    el.strMeal,
                    el.strMealThumb,
                )));
            },
        );
    } else {
        hideSearchOptions();
    }
});

searchInput.addEventListener('blur', (e) => {
    hideSearchOptions();
    lastInput = e.target.value;
    setTimeout(() => { lastInput = ''; }, 1000);
    searchInput.value = '';
});

const showSearchResult = (value, isFirstPage = true) => {
    if (isFirstPage) { mealsPage = 1; pageNumBlock.innerHTML = mealsPage; }
    getSearchResults(value, mealsPage, pageOffset).then((data) => {
        if (data.meals.length === 0) {
            pageNumerationDiv.style.display = 'none';
            mealsBlock.innerHTML = `
            <p class="meals-block-no-results">No results by request</p>
            `;
            removeChosen();
        } else {
            pageNumerationDiv.style.display = 'flex';
            removeMeals();
            removeChosen();
            moreElems = data.moreElems;
            data.meals.forEach((e) => addMeals(getMeal(
                e.idMeal,
                e.strMeal,
                e.strArea,
                e.strCategory,
                e.strMealThumb,
                e.strYoutube,
            )));
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    currList = () => { showSearchResult(searchInput.value, false); };
};

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        showSearchResult(searchInput.value);
        searchInput.blur();
    }
});

searchBtn.addEventListener('click', () => {
    showSearchResult(lastInput);
});

const changePage = (deltaPage) => {
    mealsPage += deltaPage;
    if (mealsPage <= 0) {
        mealsPage = 1;
    } else {
        setPageNum();
    }
};

nextPage.addEventListener('click', () => {
    if (moreElems) {
        changePage(1);
    }
});

prevPage.addEventListener('click', () => {
    changePage(-1);
});

const loadFunc = async () => {
    getAllAreas().then(
        (data) => {
            data.meals.forEach((e) => {
                const option = document.createElement('option');
                option.innerHTML = `${e.strArea}`;
                option.setAttribute('value', e.strArea);
                areaInput.appendChild(option);
            });
        },
    );
    await timeout(600);
    await showCategoryList(currCategory);
    loader.style.display = 'none';
    await timeout(1000);
    pageNumerationDiv.style.display = 'flex';
};

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('preload');
    loadFunc();
});

[...categoryList].forEach(
    (elem) => elem.addEventListener(
        'click',
        async () => {
            removeChosen();
            currCategory = elem.getAttribute('category');

            await showCategoryList(elem.getAttribute('category'));
            elem.classList.add('chosen-category');
        },
    ),
);
