import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';
import { FilterHeaderComponent } from '../main-page/filter-header/filter-header.component';
import { FooterComponent } from './footer/footer.component';
import { MainBlockComponent } from './main-block/main-block.component';
import { LoaderComponent } from './loader/loader.component';
import { MealComponent } from '../shared/meal/meal.component';
import { Router, RouterModule } from '@angular/router';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ErrorPageComponent } from './error-page/error-page.component';



@NgModule({
  declarations: [
    HeaderComponent,
    BurgerMenuComponent,
    FooterComponent,
    MainBlockComponent,
    LoaderComponent,
    ErrorMessageComponent,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    MainBlockComponent,
    ErrorMessageComponent,
    LoaderComponent

  ]
})
export class CoreModule { }
