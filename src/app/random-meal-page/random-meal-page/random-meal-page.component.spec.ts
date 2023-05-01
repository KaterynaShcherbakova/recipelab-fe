import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RandomMealPageComponent } from './random-meal-page.component';
import { RandomMealPageModule } from '../random-meal-page.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestService } from 'src/app/core/services/request.service';
const meal = {
  meals: [{ "idMeal": "52772", "strMeal": "Teriyaki Chicken Casserole", "strCategory": "Chicken", "strArea": "Japanese", "strIngredient1": "soy sauce", "strIngredient2": "water", "strIngredient3": "brown sugar", "strIngredient4": "ground ginger", "strIngredient5": "minced garlic", "strMealThumb": "myImg" }]
}
describe('RandomMealPageComponent', () => {
  let component: RandomMealPageComponent;
  let RequestServiceStub: any;
  let fixture: ComponentFixture<RandomMealPageComponent>;
  RequestServiceStub = {
    getRandomMeal: () => {
      return new Promise((resolve, reject) => { resolve(meal) });
    },
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomMealPageModule, RouterTestingModule],
      providers: [{ provide: RequestService, useValue: RequestServiceStub }],
      declarations: [RandomMealPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RandomMealPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set id of random meal', fakeAsync(() => {
    component.id = "";
    fixture.detectChanges();
    component.getRandomMeal();
    tick(200);
    expect(component.id).toBe("52772");
  }));

  it('should set ingredient of random meal', fakeAsync(() => {
    component.ingrList = [];
    fixture.detectChanges();
    component.getRandomMeal();
    tick(200);
    expect(component.ingrList).toBeDefined();
  }));


  it('should set img of random meal', fakeAsync(() => {
    component.img = "";
    fixture.detectChanges();
    component.getRandomMeal();
    tick(200);
    expect(component.img).toBe("myImg");
  }));

  it('should call getRandomMeal func', () => {
    const spy = spyOn(component, "getRandomMeal")
    component.generateBtnOnClick();
    expect(spy).toHaveBeenCalled();
  });
});
