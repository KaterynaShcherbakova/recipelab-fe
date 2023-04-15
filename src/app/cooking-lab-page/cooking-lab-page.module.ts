import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookingLabPageComponent } from './cooking-lab-page/cooking-lab-page.component';
import { CoreModule } from '../core/core.module';
import { InputIngrComponent } from './input-ingr/input-ingr.component';



@NgModule({
  declarations: [
    CookingLabPageComponent,
    InputIngrComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    CookingLabPageComponent
  ]
})
export class CookingLabPageModule { }
