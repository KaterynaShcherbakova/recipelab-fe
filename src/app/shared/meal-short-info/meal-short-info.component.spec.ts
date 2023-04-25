import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealShortInfoComponent } from './meal-short-info.component';
import { CoreModule } from 'src/app/core/core.module';

describe('MealShortInfoComponent', () => {
  let component: MealShortInfoComponent;
  let fixture: ComponentFixture<MealShortInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[CoreModule],
      declarations: [ MealShortInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealShortInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
