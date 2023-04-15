import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent {
  @Input() link: string = '';
  @Input() video: string = '';
  @Input() instruct: string = '';
}
