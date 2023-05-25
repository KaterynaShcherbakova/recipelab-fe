import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { FilterHeaderComponent } from './filter-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestService } from 'src/app/core/services/request.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MainPageStateService } from 'src/app/core/services/main-page-state.service';


describe('FilterHeaderComponent', () => {
  let component: FilterHeaderComponent;
  let fixture: ComponentFixture<FilterHeaderComponent>;
  let RequestServiceStub: any;
  let MainPageStateStub: any;
  let debug: DebugElement;
  const optionsData = {
    meals: [{
      "idMeal": "52771",
      "strMeal": "Spicy Arrabiata Penne",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
    }]
  }
  beforeEach(async () => {

    RequestServiceStub = {
      getAllAreas: () => {
        const data = {
          meals: [{ "strArea": "American" }, { "strArea": "British" }, { "strArea": "Canadian" }]
        }
        return new Promise((resolve, reject) => { resolve(data) });
      },

      getSearchOptions: (input: string) => {

        return new Promise((resolve, reject) => { resolve(optionsData) });

      }
    }

    MainPageStateStub = {
      currArea: String,
      searchOption: new BehaviorSubject<string>(''),


      setSearchOption(o: string) {
        this.searchOption.next(o);
      },
      setCurrArea(area: string) {
        this.currArea = area;
      }
    }

    spyOn(MainPageStateStub, 'setCurrArea');



    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [{ provide: RequestService, useValue: RequestServiceStub }, { provide: MainPageStateService, useValue: MainPageStateStub }],
      declarations: [FilterHeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterHeaderComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load areas', () => {
    expect(component.areasList[0]['strArea']).toBe("American");
  })

  it('should get search option', fakeAsync(() => {
    component.searchInput.nativeElement.value = "Pizza";
    debug.query(By.css('#searchInput')).triggerEventHandler('input', { target: component.searchInput.nativeElement });
    fixture.detectChanges();
    tick(100);
    expect(component.optionList[0]['idMeal']).toBe('52771');
  }))

  it('should show filter block', () => {
    component.isFilterBlock = "closed";
    fixture.detectChanges();
    component.cancelFilterOnClick();
    expect(component.isFilterBlock).toBe('open');
  })


  it('should hide filter block', () => {
    component.isFilterBlock = "open";
    fixture.detectChanges();
    component.cancelFilterOnClick();
    expect(component.isFilterBlock).toBe('closed');
  })


  it('should apply new filter', fakeAsync(() => {
    tick(500);
    component.areaInput.nativeElement.value = "Italy";
    fixture.detectChanges();
    component.applyFilterOnClick();
    expect(MainPageStateStub.setCurrArea).toHaveBeenCalled();
  }))



  it('should disable apply when latest is chosen', () => {
    component.disabledApply = false;
    component.isLatestChecked = true;
    fixture.detectChanges();
    component.setDisabledApply();
    expect(component.disabledApply).toBe(true);

  })


  it('should disable apply when was not chosen area', () => {
    component.disabledApply = false;
    component.isAreaChecked = true;
    component.areaInput.nativeElement.value = ""
    fixture.detectChanges();
    component.setDisabledApply();
    expect(component.disabledApply).toBe(true);

  })

  it('should enable apply when area was chosen', () => {
    component.disabledApply = true;
    component.isAreaChecked = true;
    component.areaInput.nativeElement.value = "American"
    fixture.detectChanges();
    component.setDisabledApply();
    expect(component.disabledApply).toBe(false);

  })


  it('should show area selector', () => {

    component.isAreaChecked = false;
    fixture.detectChanges();
    component.areaInputOnChange(true);
    expect(component.isAreaInput).toBe("show");

  })

  it('should hide area selector', () => {
    component.isAreaChecked = true;
    fixture.detectChanges();
    component.areaInputOnChange(false);
    expect(component.isAreaInput).toBe("hide");

  })

  it('should hide area selector when filter latest was chosen', () => {
    component.isAreaChecked = true;
    component.isAreaInput = "show"
    fixture.detectChanges();
    component.latestInputOnChange(true);
    expect(component.isAreaInput).toBe("hide");
    expect(component.isAreaChecked).toBe(false);


  })

  it('should hide search block on blur', fakeAsync(() => {
    component.isSearchBlock = true;
    fixture.detectChanges();
    component.searchInputOnBlur();
    tick(200);
    expect(component.isSearchBlock).toBeFalsy();

  }))

  it('should hide search block after search query', () => {
    component.isSearchBlock = true;
    fixture.detectChanges();
    component.searchBtnOnClick();
    expect(component.isSearchBlock).toBeFalsy();

  })

  it('should show options due to search query', fakeAsync(() => {
    component.optionList = [];
    fixture.detectChanges();
    component.searchOnChange();
    tick(200);
    expect(component.optionList).toEqual(optionsData.meals);

  }))
});
