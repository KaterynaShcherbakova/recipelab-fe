import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendMealBtnComponent } from './recommend-meal-btn.component';

describe('RecommendMealBtnComponent', () => {
  let component: RecommendMealBtnComponent;
  let fixture: ComponentFixture<RecommendMealBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendMealBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendMealBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
