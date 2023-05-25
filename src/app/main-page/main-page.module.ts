import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { CoreModule } from '../core/core.module';
import { FilterHeaderComponent } from './filter-header/filter-header.component';
import { SharedModule } from '../shared/shared.module';
import { SearchOptionComponent } from './search-option/search-option.component';
import { RecipePageModule } from '../recipe-page/recipe-page.module';
import { RouterModule } from '@angular/router';
import { RecommendMsgComponent } from './recommend-msg/recommend-msg.component';


@NgModule({
  declarations: [

    MainPageComponent,
    FilterHeaderComponent,
    SearchOptionComponent,
    RecommendMsgComponent

  ],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    RouterModule
    // RecipePageModule

  ],
  exports:[
   MainPageComponent,
   FilterHeaderComponent

  ]
})
export class MainPageModule { }
