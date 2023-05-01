import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageStateService } from './main-page-state.service';


describe('MainPageState', () => {
    let service: MainPageStateService;
    beforeEach(async () => {
        service = TestBed.inject(MainPageStateService);


    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should clear page', () => {
        service.mealsPage = 100;
        service.clearPage();
        expect(service.mealsPage).toBe(1);
    })

    it('should handle search page num', () => {
        service.lastRequest = 'search';
        service.lastData = 'Italian';
        service.handlePageNum();

        service.searchOption.subscribe((data) => { expect(data).toBe('Italian') });
    })

    it('should handle area page num', () => {
        service.lastRequest = 'area';
        service.lastData = 'Italian';
        service.handlePageNum();

        service.currArea.subscribe((data) => { expect(data).toBe('Italian') });
    })

    it('should handle category page num', () => {
        service.lastRequest = 'category';
        service.lastData = 'Italian';
        service.handlePageNum();
        service.currCategory.subscribe((data) => { expect(data).toBe('Italian') });
    })

    it('should handle next page', () => {
        service.mealsPage = 2;
        service.nextPage();

        expect(service.mealsPage).toBe(3)


    })

    it('should not go to next page', () => {
        service.mealsPage = 2;
        service.moreElems = false;
        service.nextPage();

        expect(service.mealsPage).toBe(2)

    })

    it('should handle prev page', () => {
        service.mealsPage = 2;
        service.previousPage();
        expect(service.mealsPage).toBe(1)
        service.previousPage();
        expect(service.mealsPage).toBe(1)

    })

    it('should not go to prev page', () => {
        service.mealsPage = 1;
        service.previousPage();
        expect(service.mealsPage).toBe(1)

    })

    it('should set new category', () => {
        service.setCurrCategory('Pasta');
        expect(service.lastData).toBe('Pasta');
        expect(service.lastRequest).toBe('category');

    })

    it('should set new area', () => {

        service.setCurrArea('Italian');
        expect(service.lastData).toBe('Italian');
        expect(service.lastRequest).toBe('area');
    })


    it('should set new search', () => {
        service.setSearchOption('Italian');
        expect(service.lastData).toBe('Italian');
        expect(service.lastRequest).toBe('search');
    })

    it('should set new error', () => {
        service.lastRequest = "search";
        service.setErrorType('noConnection')
        expect(service.lastRequest).toBe('error');
    })

    it('should not set error', () => {
        service.lastRequest = "search";
        service.setErrorType('')
        expect(service.lastRequest).toBe('search');
    })
});
