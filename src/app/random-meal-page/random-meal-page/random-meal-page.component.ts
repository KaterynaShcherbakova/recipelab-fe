import { Component } from '@angular/core';
import { RequestService } from 'src/app/core/services/request.service';

@Component({
  selector: 'app-random-meal-page',
  templateUrl: './random-meal-page.component.html',
  styleUrls: ['./random-meal-page.component.scss']
})
export class RandomMealPageComponent {
  id: string = '';
  img: string = '';
  title: string = '';
  category: string = '';
  area: string = '';
  ingrList: any[] = [];
  showLoader: boolean = true;


  constructor(private request: RequestService) { }

  getRandomMeal(): void {
    this.request.getRandomMeal().then((data) => {
      this.ingrList = [];
      const meal = data.meals[0];
      this.showLoader = false;

      this.id = meal.idMeal;
      this.img = meal.strMealThumb;
      this.title = meal.strMeal;
      this.category = meal.strCategory;
      this.area = meal.strArea;
      for (let i = 1; i <= 20; i += 1) {
        const ingr = meal[`strIngredient${i}`];
        if (!ingr) {
          break;
        }
        const measure = meal[`strMeasure${i}`];
        this.ingrList.push({ ingr: ingr, measure: measure });
      }

    })
  }
  ngOnInit() {
    this.showLoader = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.getRandomMeal();
  }

  generateBtnOnClick(): void {
    this.getRandomMeal();
  }
}
