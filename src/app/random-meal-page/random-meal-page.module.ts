import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomMealPageComponent } from './random-meal-page/random-meal-page.component';
import { MealGnrBlockComponent } from './meal-gnr-block/meal-gnr-block.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    RandomMealPageComponent,
    MealGnrBlockComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ],
  exports:[
    RandomMealPageComponent,
    MealGnrBlockComponent
  ]
})
export class RandomMealPageModule { }
