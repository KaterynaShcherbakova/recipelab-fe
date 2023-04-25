import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOptionComponent } from './search-option.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchOptionComponent', () => {
  let component: SearchOptionComponent;
  let fixture: ComponentFixture<SearchOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ SearchOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
