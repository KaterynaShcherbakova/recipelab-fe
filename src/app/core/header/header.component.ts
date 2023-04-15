import { Component, EventEmitter, Output } from '@angular/core';
import { MainPageStateService } from '../services/main-page-state.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public href: string = "";
  constructor(public state: MainPageStateService, public router: Router) { }

  categoryList = ['Pasta', 'Seafood', 'Vegetarian', 'Vegan', 'Breakfast', 'Dessert', 'Side', 'Starter'];

  currCategory: string = 'Pasta';
  async setCurrCategory(category: string) {
    this.state.setCurrCategory(category);
    this.currCategory = category;

  }

 
}
