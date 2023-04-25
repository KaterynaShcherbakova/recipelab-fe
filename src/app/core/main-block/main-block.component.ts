import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-block',
  templateUrl: './main-block.component.html',
  styleUrls: ['./main-block.component.scss']
})
export class MainBlockComponent {
  @Input() idStyle = '';
 
}
