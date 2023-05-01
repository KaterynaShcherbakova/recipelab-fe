import { Component, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { RequestService } from '../../core/services/request.service';
import { MainPageStateService } from 'src/app/core/services/main-page-state.service';


@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.scss', './checkbox.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0
      })),
      transition(':enter', animate('0ms', style({ opacity: 0 }))),
      transition('* => *', animate('500ms')),



    ]),
    trigger('showHide', [
      state('show', style({
        display: 'block',
      })),
      state('hide', style({
        display: 'none'
      })),

      transition('* => *', animate('100ms'))


    ]),
  ],
})
export class FilterHeaderComponent {

  areasList = [];
  optionList:any[] = [];
  ngOnInit() {

    this.request.getAllAreas().then((data) => {
      this.areasList = data.meals;
    })
  }
  constructor(private request: RequestService, private state: MainPageStateService) {

  }

  isFilterBlock = 'closed';
  isAreaInput = "hide";
  isAreaChecked: boolean = false;
  isLatestChecked: boolean = false;
  isSearchBlock: boolean = false;
  disabledApply: boolean = true;
  searchInterval: any = undefined;
  showOptionBlock: boolean = false;
  @ViewChild('areaselector') areaInput: ElementRef = {} as ElementRef;
  @ViewChild('recipeSearch') searchInput: ElementRef = {} as ElementRef;

  cancelFilterOnClick(): void {
    this.disabledApply = true;
    (this.isFilterBlock == "closed") ?
      this.isFilterBlock = "open" :

      (this.isFilterBlock = "closed", this.areaInputOnChange(false), this.latestInputOnChange(false), this.areaInput.nativeElement.value = '');
  }

  applyFilterOnClick(): void {

    this.state.setCurrArea(this.areaInput.nativeElement.value);
    this.cancelFilterOnClick();
  }


  setDisabledApply() {
    if ((this.isAreaChecked && !this.areaInput.nativeElement.value) || this.isLatestChecked) this.disabledApply = true;
    else this.disabledApply = false;
  }

  latestInputOnChange(value: boolean): void {
    this.isLatestChecked = value;
    this.isAreaInput = "hide";
    this.isAreaChecked = false;
  }

  areaInputOnChange(value: boolean): void {
    this.isAreaChecked = value;

    (this.isAreaChecked) ? this.isAreaInput = "show" : this.isAreaInput = "hide";
    this.isLatestChecked = false;

  }

  searchOnChange() {
    this.isSearchBlock = this.searchInput.nativeElement.value;
    clearTimeout(this.searchInterval);
    this.searchInterval = setTimeout(() => {
      this.request.getSearchOptions(this.searchInput.nativeElement.value).then((data) => {
        this.optionList = data.meals
      })
    }, 100)
  }


  searchBtnOnClick() {
    this.state.setSearchOption(this.searchInput.nativeElement.value);
    this.searchInput.nativeElement.value = ''
    this.isSearchBlock = false;
    setTimeout(() => {
      this.searchInput.nativeElement.blur();
    }, 0);
  }

  searchInputOnBlur() {
    setTimeout(() => {
      this.isSearchBlock = false;

    }, 100)

  }
}
