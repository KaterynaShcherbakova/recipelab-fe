import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePageComponent } from './recipe-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipePageModule } from '../recipe-page.module';

describe('RecipePageComponent', () => {
  let component: RecipePageComponent;
  let fixture: ComponentFixture<RecipePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, RecipePageModule],
      declarations: [ RecipePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
