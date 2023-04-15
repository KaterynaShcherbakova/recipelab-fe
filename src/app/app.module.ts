import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MainPageModule } from './main-page/main-page.module';
import { RandomMealPageModule } from './random-meal-page/random-meal-page.module';
import { CookingLabPageModule } from './cooking-lab-page/cooking-lab-page.module';
import { RouterModule, Routes } from '@angular/router';
import { CookingLabPageComponent } from './cooking-lab-page/cooking-lab-page/cooking-lab-page.component';
import { RandomMealPageComponent } from './random-meal-page/random-meal-page/random-meal-page.component';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { CreateRecipePageComponent } from './create-recipe-page/create-recipe-page/create-recipe-page.component';
import { CreateRecipePageModule } from './create-recipe-page/create-recipe-page.module';
import { SharedModule } from './shared/shared.module';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { RecipePageComponent } from './recipe-page/recipe-page/recipe-page.component';
// import { nl2brPipe } from './nl2br.pipe';
const routes: Routes = [
  {
    path: 'cooking-lab',
    component: CookingLabPageComponent
  },
  {
    path: 'random-meal',
    component: RandomMealPageComponent
  },
  {
    path:'recipe',
    component:RecipePageComponent
  },
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'create-recipe',
    component: CreateRecipePageComponent
  },
  {
    path: "**",
    component: ErrorPageComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    FormsModule,
    MainPageModule,
    RandomMealPageModule,
    CookingLabPageModule,
    CreateRecipePageModule,
    SharedModule

  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
