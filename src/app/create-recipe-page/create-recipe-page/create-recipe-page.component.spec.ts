import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipePageComponent } from './create-recipe-page.component';
import { CoreModule } from 'src/app/core/core.module';
import { CreateRecipePageModule } from '../create-recipe-page.module';

describe('CreateRecipePageComponent', () => {
  let component: CreateRecipePageComponent;
  let fixture: ComponentFixture<CreateRecipePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[CoreModule, CreateRecipePageModule],
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
