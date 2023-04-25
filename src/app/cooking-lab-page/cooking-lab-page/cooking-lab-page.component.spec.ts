import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingLabPageComponent } from './cooking-lab-page.component';
import { CoreModule } from 'src/app/core/core.module';
import { CookingLabPageModule } from '../cooking-lab-page.module';

describe('CookingLabPageComponent', () => {
  let component: CookingLabPageComponent;
  let fixture: ComponentFixture<CookingLabPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[CoreModule, CookingLabPageModule],
      declarations: [ CookingLabPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookingLabPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
