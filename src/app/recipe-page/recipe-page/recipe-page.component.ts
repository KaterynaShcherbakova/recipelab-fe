import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request.service';
@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss', '../../random-meal-page/meal-gnr-block/meal-gnr-block.component.scss',
    '../../main-page/main-page/main-page.component.scss']
})
export class RecipePageComponent {
  constructor(public route: ActivatedRoute, public router: Router, public request: RequestService) { }
  recipeTitle = '';
  recipeArea = '';
  recipeCategory = '';
  img = '';
  instruct = '';
  link = '';
  video = '';
  ingredientsList: { ingr: string, measure: string }[] = [];
  showLoader: boolean = true;
  connectionError: boolean = false;
  id: string = '';
  @Input() title: string = '';
  @Input() idTitle: string = '';
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.route.queryParams.subscribe((params) => {
      if (params['idMeal']) {
        this.getFullRecipe(params['idMeal']);
      }
      else {
        this.router.navigate(['/error']);
      }
    })
  }


  getFullRecipe(id: string | number) {
    this.showLoader = true;

    this.request.getMealById(id).then((data) => {
      this.id = data.idMeal;
      this.showLoader = false;
      this.recipeTitle = data.strMeal;
      this.recipeArea = data.strArea;
      this.recipeCategory = data.strCategory;
      this.img = data.strMealThumb;
      let dataInstr = data.strInstructions.replaceAll('\r\n\r\n', '\r\n');
      dataInstr = dataInstr.replaceAll(/(STEP \d+)(\r\n)/g, '<span style="font-weight:500;">$1</span><br>');
      dataInstr = dataInstr.replaceAll('\r\n', '<br><br>');
      this.instruct = dataInstr;

      this.link = data.strSource;

      if (data.strYoutube) {
        const ytParams = new URLSearchParams(data.strYoutube.split('?')[1]);
        this.video = `https://www.youtube.com/embed/${ytParams.get('v')}`;
      } else {
        this.video = '';
      }
      for (let i = 1; i <= 20; i += 1) {
        const ingr = data[`strIngredient${i}`];
        if (!ingr) {
          break;
        }
        const measure = data[`strMeasure${i}`];
        this.ingredientsList.push({ ingr: ingr, measure: measure });
      }
    }).catch(() => {
      this.showLoader = false;
      this.connectionError = true;

    });

  }
}
