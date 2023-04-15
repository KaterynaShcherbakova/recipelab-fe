import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealComponent } from './meal/meal.component';
import { MealShortInfoComponent } from './meal-short-info/meal-short-info.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { CoreModule } from '../core/core.module';
import { Router, RouterModule } from '@angular/router';
import { DetailedRecipeBtnComponent } from './detailed-recipe-btn/detailed-recipe-btn.component';
import { MainPageModule } from '../main-page/main-page.module';




@NgModule({

  declarations: [MealComponent, MealShortInfoComponent, IngredientComponent, DetailedRecipeBtnComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,

  ],
  exports: [MealComponent, MealShortInfoComponent, IngredientComponent]
})
export class SharedModule { }
