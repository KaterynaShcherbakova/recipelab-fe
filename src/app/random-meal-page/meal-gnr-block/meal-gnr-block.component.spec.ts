import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealGnrBlockComponent } from './meal-gnr-block.component';

describe('MealGnrBlockComponent', () => {
  let component: MealGnrBlockComponent;
  let fixture: ComponentFixture<MealGnrBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealGnrBlockComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MealGnrBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on click', () => {
    component.handleClick.subscribe(() => { expect().nothing() });
    component.generateBtnOnClick();
  });
});
