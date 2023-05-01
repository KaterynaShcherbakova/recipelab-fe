import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RecipePageComponent } from './recipe-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipePageModule } from '../recipe-page.module';
import { RequestService } from 'src/app/core/services/request.service';


describe('RecipePageComponent', () => {
  const meal = {
    meals: [{ "idMeal": "52772", "strMeal": "Teriyaki Chicken Casserole", "strCategory": "Chicken", "strArea": "Japanese", "strYoutube": "https://www.youtube.com/watch?v=4aZr5hZXP_s" }]
  }
  
  const mealWithouLink = {
    meals: [{ "idMeal": "52772", "strMeal": "Teriyaki Chicken Casserole", "strCategory": "Chicken", "strArea": "Japanese"}]
  }
  let component: RecipePageComponent;
  let fixture: ComponentFixture<RecipePageComponent>;
  let RequestServiceStub: any;
  RequestServiceStub = {
    getMealById: (id: string | number) => {
      if (id == "testNoYouTube")  return new Promise((resolve, reject) => { resolve(mealWithouLink.meals[0]) });
        return new Promise((resolve, reject) => { resolve(meal.meals[0]) });
    },
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, RecipePageModule],
      providers: [{ provide: RequestService, useValue: RequestServiceStub }],
      declarations: [RecipePageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get recipe info', fakeAsync(() => {
    component.recipeTitle = "";
    component.recipeArea = "";
    component.recipeCategory = "";
    fixture.detectChanges();
    component.getFullRecipe("52772")
    tick(100);
    expect(component.recipeTitle).toBe("Teriyaki Chicken Casserole");
    expect(component.recipeCategory).toBe("Chicken");
    expect(component.recipeArea).toBe("Japanese");

  }));



  it('should show video when we have link on YouTube', fakeAsync(() => {
    component.video = "";
    fixture.detectChanges();
    component.getFullRecipe("52772")
    tick(100);
    expect(component.video).toBeDefined();
  }));

  it('should hide video when we have do not link on YouTube', fakeAsync(() => {

    fixture.detectChanges();
    component.getFullRecipe("testNoYouTube")
    tick(100);
    expect(component.video).toBe("");
  }));
});
