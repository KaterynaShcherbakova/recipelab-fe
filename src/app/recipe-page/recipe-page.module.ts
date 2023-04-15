import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { InstructionComponent } from './instruction/instruction.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { SafePipe } from '../safeUrl.pipe';
// import { nl2brPipe } from '../nl2br.pipe';


@NgModule({
  declarations: [
    RecipePageComponent,
    InstructionComponent,
    SafePipe
    // nl2brPipe 
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ],
  exports:[RecipePageComponent]
})
export class RecipePageModule { }
