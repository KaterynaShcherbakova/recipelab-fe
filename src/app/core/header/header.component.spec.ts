import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent } from './header.component';
import { CoreModule } from '../core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestService } from '../services/request.service';
import { MainPageStateService } from '../services/main-page-state.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let MainPageStateServiceStub: any;
  MainPageStateServiceStub = {
    currCategory: new BehaviorSubject<string>(''),
   
    setCurrCategory(c: string) {
      this.currCategory.next(c);
    },
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreModule, RouterTestingModule],
      providers: [{ provide: MainPageStateService, useValue: MainPageStateServiceStub }],
      declarations: [HeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set new category', () => {
    component.currCategory="";
    component.setCurrCategory("Seafood");
    expect(component.currCategory).toBe("Seafood");

  });
});
