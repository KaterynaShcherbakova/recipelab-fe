import { Injectable } from "@angular/core";
import { MainPageStateService } from "./main-page-state.service";

const KEY = '1';
const categoryUrl = (category: string) => `https://www.themealdb.com/api/json/v1/${KEY}/filter.php?c=${category}`;
const searchUrl = (meal: string) => `https://www.themealdb.com/api/json/v1/${KEY}/search.php?s=${meal}`;
const searchByIdUrl = (id: string | number) => `https://www.themealdb.com/api/json/v1/${KEY}/lookup.php?i=${id}`;
const areaUrl = (area: string) => `https://www.themealdb.com/api/json/v1/${KEY}/filter.php?a=${area}`;
const areaListUrl = () => `https://www.themealdb.com/api/json/v1/${KEY}/list.php?a=list`;
const randomUrl = () => `https://www.themealdb.com/api/json/v1/${KEY}/random.php`;

@Injectable({
    providedIn: "root"
})
export class RequestService {

    constructor(private state : MainPageStateService) {}
    
    private newRequest = async (endpoint: string) => {
        this.state.setErrorType('');
        return (await fetch(endpoint, { method: 'GET' }).catch(()=>{throw new Error('No connection')})).json();
    }

    public getAllAreas = async () => {
        const request = await this.newRequest(areaListUrl()).then(
            (data) => data,
        );
        return request;
    };

    public getMealById = async (id:number|string) => {
        const request = await this.newRequest(searchByIdUrl(id)).then(
            (data) => data.meals[0],
        );
        return request;
    };  

    public getRandomMeal = async () => {
        const request = await this.newRequest(randomUrl()).then(
            (data) => data,
        );
        return request;
    };

    public getByCategory = async (category:string, page:number, offset:number) => {
        const request = await this.newRequest(categoryUrl(category)).then(
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


    public getByArea = async (area:string, page:number, offset:number) => {
        const request = await this.newRequest(areaUrl(area)).then(
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


     public getSearchOptions = async (meal:string) => {
        const request = await this.newRequest(searchUrl(meal)).then(
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
  

   public getSearchResults = async (meal:string, page:number, offset:number) => {
        const request = await this.newRequest(searchUrl(meal)).then(
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
 
}