import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detailed-recipe-btn',
  templateUrl: './detailed-recipe-btn.component.html',
  styleUrls: ['./detailed-recipe-btn.component.scss']
})
export class DetailedRecipeBtnComponent {
  @Input() id = '';
}
