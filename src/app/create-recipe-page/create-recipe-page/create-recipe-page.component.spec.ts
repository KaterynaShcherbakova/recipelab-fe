import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipePageComponent } from './create-recipe-page.component';

describe('CreateRecipePageComponent', () => {
  let component: CreateRecipePageComponent;
  let fixture: ComponentFixture<CreateRecipePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRecipePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
