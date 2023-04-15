import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionBlockComponent } from './instruction-block.component';

describe('InstructionBlockComponent', () => {
  let component: InstructionBlockComponent;
  let fixture: ComponentFixture<InstructionBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
