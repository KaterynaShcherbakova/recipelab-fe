import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerMenuComponent } from './burger-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('BurgerMenuComponent', () => {
  let component: BurgerMenuComponent;
  let fixture: ComponentFixture<BurgerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ BurgerMenuComponent ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(BurgerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
