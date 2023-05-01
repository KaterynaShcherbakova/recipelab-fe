import { RequestService } from './request.service';
import { TestBed } from '@angular/core/testing';
describe('RequestService', () => {
    let service: RequestService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RequestService);
    });

    afterEach(() => {
        /* clean up code if necessary */
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should return all areas', async () => {
        const areas = ['area1', 'area2', 'area3'];
        spyOn(service, 'newRequest').and.returnValue(Promise.resolve({ meals: areas }));

        const result = await service.getAllAreas();

        expect(service.newRequest).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        expect(result.meals).toEqual(areas);
    });

    it('should return meal by id', async () => {
        const meal = { idMeal: '123', strMeal: 'Meal 123' };
        spyOn(service, 'newRequest').and.returnValue(Promise.resolve({ meals: [meal] }));

        const result = await service.getMealById('123');

        expect(service.newRequest).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=123');
        expect(result).toEqual(meal);
    });

    it('should return a random meal', async () => {
        const meal = { idMeal: '123', strMeal: 'Random Meal' };
        spyOn(service, 'newRequest').and.returnValue(Promise.resolve({ meals: [meal] }));

        const result = await service.getRandomMeal();

        expect(service.newRequest).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');
        expect(result.meals[0]).toEqual(meal);
    });

    it('should return recipes by category', async () => {
        const recipes = {
            meals: [{ idMeal: '1', strMeal: 'Meal 1' }, { idMeal: '2', strMeal: 'Meal 2' }],
            moreElems: true
        };
        spyOn(service, 'newRequest').and.returnValue(Promise.resolve(recipes));

        const result = await service.getByCategory('category1', 1, 2);

        expect(service.newRequest).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=category1');
        expect(result.meals).toEqual([{ idMeal: '1', strMeal: 'Meal 1' }, { idMeal: '2', strMeal: 'Meal 2' }]);
    });

    it('should return recipes by area', async () => {
        const recipes = {
            meals: [{ idMeal: '1', strMeal: 'Meal 1' }, { idMeal: '2', strMeal: 'Meal 2' }],
            moreElems: true
        };
        spyOn(service, 'newRequest').and.returnValue(Promise.resolve(recipes));

        const result = await service.getByArea('area1', 1, 2);

        expect(service.newRequest).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=area1');
        expect(result.meals).toEqual([{ idMeal: '1', strMeal: 'Meal 1' }, { idMeal: '2', strMeal: 'Meal 2' }]);
    })



    
    it('should return recipes by search', async () => {
        const recipes = {
            meals: [{ idMeal: '1', strMeal: 'Meal 1' }, { idMeal: '2', strMeal: 'Meal 2' }],
            moreElems: true
        };
        spyOn(service, 'newRequest').and.returnValue(Promise.resolve(recipes));

        const result = await service.getSearchResults('meal1', 1, 2);

        expect(service.newRequest).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=meal1');
        expect(result.meals).toEqual([{ idMeal: '1', strMeal: 'Meal 1' }, { idMeal: '2', strMeal: 'Meal 2' }]);
    });


    it('should return recipes while searching', async () => {
        const recipes = {
            meals: [{ idMeal: '1', strMeal: 'Meal 1' }, { idMeal: '2', strMeal: 'Meal 2' }],
            moreElems: true
        };
        spyOn(service, 'newRequest').and.returnValue(Promise.resolve(recipes));

        const result = await service.getSearchOptions('meal1');

        expect(service.newRequest).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=meal1');
        expect(result.meals).toEqual([{ idMeal: '1', strMeal: 'Meal 1' }, { idMeal: '2', strMeal: 'Meal 2' }]);
    });


})