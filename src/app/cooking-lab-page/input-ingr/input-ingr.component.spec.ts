import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIngrComponent } from './input-ingr.component';

describe('InputIngrComponent', () => {
  let component: InputIngrComponent;
  let fixture: ComponentFixture<InputIngrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputIngrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputIngrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
