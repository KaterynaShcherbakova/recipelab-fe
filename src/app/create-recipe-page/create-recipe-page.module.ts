import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructionBlockComponent } from './instruction-block/instruction-block.component';
import { CreateRecipePageComponent } from './create-recipe-page/create-recipe-page.component';
import { FormComponent } from './form/form.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    InstructionBlockComponent,
    CreateRecipePageComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class CreateRecipePageModule { }
