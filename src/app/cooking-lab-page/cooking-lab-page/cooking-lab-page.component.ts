import { Component } from '@angular/core';

@Component({
  selector: 'app-cooking-lab-page',
  templateUrl: './cooking-lab-page.component.html',
  styleUrls: ['./cooking-lab-page.component.scss', '../../random-meal-page/meal-gnr-block/meal-gnr-block.component.scss',
    '../../main-page/filter-header/filter-header.component.scss']
})
export class CookingLabPageComponent {
  inputIngrArray = ['Spaghetti', 'Parmesan', 'Bacon', 'Olive oil'];
  recipesList = [];

}
