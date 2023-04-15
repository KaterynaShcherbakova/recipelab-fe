import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRecipeBtnComponent } from './detailed-recipe-btn.component';

describe('DetailedRecipeBtnComponent', () => {
  let component: DetailedRecipeBtnComponent;
  let fixture: ComponentFixture<DetailedRecipeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedRecipeBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedRecipeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
