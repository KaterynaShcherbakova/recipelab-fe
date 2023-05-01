import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MainPageComponent } from './main-page.component';
import { MainPageModule } from '../main-page.module';
import { MainPageStateService } from 'src/app/core/services/main-page-state.service';
import { tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestService } from 'src/app/core/services/request.service';
import { RouterTestingModule } from '@angular/router/testing';
describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let MainPageStateStub: any;
  let RequestServiceStub: any;
  let debug: DebugElement;
  const recipes = {
    meals: [{ 'idMeal': "12345" }, { "idMeal": "4567" }]
  }
  const areaData = {
    meals: [{ "idMeal": "123" }, { "idMeal": "234" }, { "idMeal": "345" }]
  }

  const categoryData = {
    meals: [{ "idMeal": "01" }, { "idMeal": "02" }, { "idMeal": "03" }]
  }

  const meal = {
    meals: [{ "idMeal": "52772", "strMeal": "Teriyaki Chicken Casserole", "strDrinkAlternate": null, "strCategory": "Chicken", "strArea": "Japanese" }]
  }
  beforeEach(async () => {

    RequestServiceStub = {
      getByArea: () => {
        return new Promise((resolve, reject) => { resolve(areaData) });
      },
      getByCategory: () => {
        return new Promise((resolve, reject) => { resolve(categoryData) });
      },
      getMealById: (id: number) => {
        return new Promise((resolve, reject) => { resolve(meal) });
      },
      getSearchResults: (meal: string) => {
        if(meal=="test123") return new Promise((resolve, reject) => { resolve({meals:[]}) });
        return new Promise((resolve, reject) => { resolve(recipes) });
      },


      getAllAreas: () => {
        const data = {
          meals: [{ "strArea": "American" }, { "strArea": "British" }, { "strArea": "Canadian" }]
        }
        return new Promise((resolve, reject) => { resolve(data) });
      }
    }
    MainPageStateStub = {
      errorType: new BehaviorSubject<string>(''),
      currArea: new BehaviorSubject<string>(''),
      currCategory: new BehaviorSubject<string>(''),
      searchOption: new BehaviorSubject<string>(''),


      setErrorType(type: string) {
        this.errorType.next(type);
      },
      setCurrCategory(c: string) {
        this.currCategory.next(c);
      },
      setCurrArea(a: string) {
        this.currArea.next(a);
      }

    }



    await TestBed.configureTestingModule({
      imports: [MainPageModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [{ provide: MainPageStateService, useValue: MainPageStateStub }, { provide: RequestService, useValue: RequestServiceStub }],

      declarations: [MainPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set new error on main page', fakeAsync(() => {
    tick(500);
    component.errorType = ""
    fixture.detectChanges();
    component.handleError("noConnection");
    expect(component.errorType).toBe("noConnection");
  }));


  it('should set new recipes list', () => {
    component.recipesList.next([]);
    component.handleRecipes(recipes);
    expect(component.recipesList.value).toBe(recipes.meals);
  });



  it('should set new recipes list after filtering by area', fakeAsync(() => {
    component.recipesList.next([]);
    MainPageStateStub.currArea.next("Italian");
    tick(500);
    expect(component.recipesList.value).toEqual(areaData.meals);

  }));

  it('should set new recipes list after filtering by category', fakeAsync(() => {
    component.recipesList.next([]);
    MainPageStateStub.currCategory.next("Pasta");
    tick(500);
    expect(component.recipesList.value).toEqual(categoryData.meals);

  }));

  it('should clear recipes list when error occured', fakeAsync(() => {
    component.recipesList.next(recipes.meals);
    MainPageStateStub.errorType.next("noConnection");
    tick(500);
    expect(component.recipesList.value).toEqual([]);

  }));


  it('should not clear recipes list when there is no error', fakeAsync(() => {
    component.recipesList.next(recipes.meals);
    MainPageStateStub.errorType.next("");
    tick(500);
    expect(component.recipesList.value).toEqual(recipes.meals);

  }));

  it('should set new recipes list after search query', fakeAsync(() => {
    component.recipesList.next([]);
    MainPageStateStub.searchOption.next("Pasta");
    tick(500);
    expect(component.recipesList.value).toEqual(recipes.meals);

  }));

  it('should not set new recipes list after empty search query', fakeAsync(() => {
    component.recipesList.next([]);
    MainPageStateStub.searchOption.next("");
    tick(500);
    expect(component.recipesList.value).toEqual([]);

  }));

  it('should show error message if there are no results after search query', fakeAsync(() => {
    MainPageStateStub.searchOption.next("test123");
    tick(500);
    expect(component.errorType).toBe("noResults");

  }));
});

