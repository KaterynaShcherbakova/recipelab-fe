import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class MainPageStateService {
    lastRequest = '';
    lastData = '';
    mealsPage = 1;
    moreElems = true;
    pageOffset = 24;

    clearPage() {
        this.mealsPage = 1;
    }
    handlePageNum() {
        if (this.lastRequest === 'category') {
            this.setCurrCategory(this.lastData);
        }
        else if (this.lastRequest === 'area') {
            this.setCurrArea(this.lastData);
        }
        else if (this.lastRequest === 'search') {
            this.setSearchOption(this.lastData);
        }
    }
    nextPage() {
        if (this.moreElems) {
            this.mealsPage += 1;
            this.handlePageNum();
        }
    }
    previousPage() {
        if (this.mealsPage > 1) {
            this.mealsPage -= 1;
            this.handlePageNum();
        }
    }
    
    currCategory = new BehaviorSubject<string>('');
    setCurrCategory(category: string) {
        if (this.lastRequest !== 'category' || this.lastData != category) this.clearPage();
        this.currCategory.next(category);
        this.lastRequest = 'category'
        this.lastData = category;


    }

    currArea = new BehaviorSubject<string>('');
    setCurrArea(area: string) {
        if (this.lastRequest !== 'area' || this.lastData != area) this.clearPage();
        this.currArea.next(area);
        this.lastRequest = 'area'
        this.lastData = area;
    }

    errorType = new BehaviorSubject<string>('');
    setErrorType(error: string) {
        this.errorType.next(error);
        if (error !== '') this.lastRequest = 'error';

    }

    searchOption = new BehaviorSubject<string>('');
    setSearchOption(option: string) {
        if (this.lastRequest !== 'search' || this.lastData != option) this.clearPage();

        this.searchOption.next(option);
        this.lastData = option;
        this.lastRequest = 'search'

    }
}