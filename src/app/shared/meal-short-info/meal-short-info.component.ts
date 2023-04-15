import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-meal-short-info',
  templateUrl: './meal-short-info.component.html',
  styleUrls: ['./meal-short-info.component.scss', '../../random-meal-page/meal-gnr-block/meal-gnr-block.component.scss']
})
export class MealShortInfoComponent {
  @Input() id: string = '';
  @Input() img: string = '';
  @Input() title: string = '';
  @Input() category: string = '';
  @Input() area: string = '';
  @Input() ingrList: any[] = [];
  @Input() idTitle: string = '';
  @Input() type: string = '';

  ingredientsList: Observable<any[]> = new Observable();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ingrList']) {
      this.ingredientsList = of(changes['ingrList'].currentValue);
    }
  }
}
