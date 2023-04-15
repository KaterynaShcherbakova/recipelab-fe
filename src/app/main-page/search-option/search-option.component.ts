import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-option',
  templateUrl: './search-option.component.html',
  styleUrls: ['./search-option.component.scss']
})
export class SearchOptionComponent {
  @Input() img: string = '';
  @Input() title: string = '';
  @Input() id = '';
}
