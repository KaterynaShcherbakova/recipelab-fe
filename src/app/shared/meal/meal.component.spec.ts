import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestService } from 'src/app/core/services/request.service';
import { MealComponent } from './meal.component';
import { SharedModule } from '../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
describe('MealComponent', () => {
  let component: MealComponent;
  let fixture: ComponentFixture<MealComponent>;
  let debug: DebugElement;
  let RequestServiceStub: any;

  beforeEach(async () => {
    RequestServiceStub = {
      getMealById: (id: number | string) => {
        const data = {
          strArea: "Italian",
          strCategory: "Pasta",
          strYoutube: "https://www.youtube.com//watch?v=4aZr5hZXP_s",
        }
        return new Promise((resolve, reject) => {
          resolve(data);
        })
      }
    }

    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [MealComponent],
      providers: [{ provide: RequestService, useValue: RequestServiceStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MealComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    component.id = "2345";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
