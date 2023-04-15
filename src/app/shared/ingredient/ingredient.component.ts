import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent {
  @Input() title = '';
  @Input() measure = '';
}
