import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChanges } from '@angular/core';
import { MealShortInfoComponent } from './meal-short-info.component';
import { CoreModule } from 'src/app/core/core.module';
import { SimpleChange } from '@angular/core';

describe('MealShortInfoComponent', () => {
  let component: MealShortInfoComponent;
  let fixture: ComponentFixture<MealShortInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [MealShortInfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MealShortInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change ingredient list', () => {
    const list = [{ "ingr": "Sugar", "measure": "1 ts" }];
    const changes: SimpleChanges = { ingrList: new SimpleChange([], list, false) };
    component.ingredientsList.subscribe((data: any) => { expect(data).toBe(list) })
    const spy = spyOn(component, "ngOnChanges")
    component.ngOnChanges(changes);
    expect(spy).toHaveBeenCalled();
  });
});

