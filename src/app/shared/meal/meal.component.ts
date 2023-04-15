import { Component, Input } from '@angular/core';

import {
  RequestService
} from 'src/app/core/services/request.service';
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {
  @Input() id = '';
  @Input() title = '';
  @Input() img = '';
  @Input() area = '';
  @Input() category = '';
  @Input() link = '';
  ngOnInit() {
    if (!this.link || !this.area || !this.category) {
      this.request.getMealById(this.id).then((data) => {
        this.area = data.strArea;
        this.category = data.strCategory;
        this.link = data.strYoutube;
      });
    }
  }

  constructor(private request: RequestService) {

  }

}
