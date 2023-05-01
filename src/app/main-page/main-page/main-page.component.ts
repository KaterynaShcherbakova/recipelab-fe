import { Component, Input } from '@angular/core';
import { RequestService } from '../../core/services/request.service';
import { MainPageStateService } from 'src/app/core/services/main-page-state.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {

  recipesList:BehaviorSubject<any[]> =new BehaviorSubject<any[]>([]);
  optionList = [];
  currCategory = 'Pasta';
  currArea = '';
  errorType = '';
  showLoader: boolean = true;
  noResults: boolean = false;
  showPageNum: boolean = true;

  handleError(type: string) {
    this.showLoader = false;
    this.state.setErrorType(type);
    this.showPageNum = false;
  }

  handleRecipes(e: any) {
    
    this.recipesList.next(e.meals);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.state.moreElems = e.moreElems;
    this.showLoader = false;
    this.showPageNum = true;
  }

  ngOnInit() {

    this.state.currArea.subscribe((data) => {
      if (data !== '') {
        this.showLoader = true;
        this.request.getByArea(data, this.state.mealsPage, this.state.pageOffset).then((recipes) => {
          this.handleRecipes(recipes);

        }).catch(() => { this.handleError('noConnection'); })
      }

    });

    this.state.errorType.subscribe((data) => {
      this.errorType = data;
      if (data) {
        this.recipesList.next([]);
      }

    });

    this.state.currCategory.subscribe((data) => {
      if (data !== '') {
        this.showLoader = true;
        this.request.getByCategory(data, this.state.mealsPage, this.state.pageOffset).then((recipes) => {
          this.handleRecipes(recipes);

        }).catch(() => { this.handleError('noConnection'); });

      }
    });

    this.state.setCurrCategory(this.currCategory);

    this.state.searchOption.subscribe((data) => {
      if (data !== '') {
        this.showLoader = true;
        this.request.getSearchResults(data, this.state.mealsPage, this.state.pageOffset).then((recipes) => {
          this.recipesList.next(recipes.meals);

          if (recipes.meals.length === 0) {
            this.showPageNum = false;
            this.noResults = true;
            this.errorType = 'noResults'
          } else {
            setTimeout(() => {
              this.showPageNum = true;
            }, 300)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.state.moreElems = recipes.moreElems;
            this.noResults = false;
          }

          this.showLoader = false;

        }).catch(() => {
          this.handleError('noConnection');

        });
      }
    })

  }


  constructor(private request: RequestService, public state: MainPageStateService) { }
}
