import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHeaderComponent } from './filter-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterHeaderComponent', () => {
  let component: FilterHeaderComponent;
  let fixture: ComponentFixture<FilterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[BrowserAnimationsModule],
      declarations: [ FilterHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
