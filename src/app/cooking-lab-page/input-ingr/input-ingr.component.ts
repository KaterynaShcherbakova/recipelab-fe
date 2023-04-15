import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-ingr',
  templateUrl: './input-ingr.component.html',
  styleUrls: ['./input-ingr.component.scss']
})
export class InputIngrComponent {
@Input() title:string='';
}
