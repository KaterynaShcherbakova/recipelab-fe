import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMealPageComponent } from './random-meal-page.component';

describe('RandomMealPageComponent', () => {
  let component: RandomMealPageComponent;
  let fixture: ComponentFixture<RandomMealPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomMealPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomMealPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
