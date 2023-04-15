import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-meal-gnr-block',
  templateUrl: './meal-gnr-block.component.html',
  styleUrls: ['./meal-gnr-block.component.scss']
})
export class MealGnrBlockComponent {
  // @Input() generateBtnOnClick: () => void = () => {};
  @Output() handleClick: EventEmitter<any> = new EventEmitter();
  generateBtnOnClick() {
    this.handleClick.emit();
  }
}
