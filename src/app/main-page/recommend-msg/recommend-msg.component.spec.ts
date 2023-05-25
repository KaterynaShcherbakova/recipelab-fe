import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendMsgComponent } from './recommend-msg.component';

describe('RecommendMsgComponent', () => {
  let component: RecommendMsgComponent;
  let fixture: ComponentFixture<RecommendMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
