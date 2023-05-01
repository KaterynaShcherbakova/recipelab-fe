import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormComponent } from './form.component';
import { DebugElement } from '@angular/core';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not validate empty title', () => {
    debug.query(By.css('#title')).nativeElement.value = "";

    // component.titleInput.nativeElement.value = "";
    fixture.detectChanges();
    component.handleTitle();
    expect(component.titleErr).toBeTruthy();

  });


  it('should not validate incorrect title', () => {
    debug.query(By.css('#title')).nativeElement.value = "---";

    fixture.detectChanges();
    component.handleTitle();
    expect(component.titleErr).toBeTruthy();

  });


  it('should validate correct title', () => {
    debug.query(By.css('#title')).nativeElement.value = "Pizza";

    fixture.detectChanges();
    component.handleTitle();
    expect(component.titleErr).toBeFalsy();

  });




  it('should not validate empty category', () => {
    debug.query(By.css('#category')).nativeElement.value = "";
    fixture.detectChanges();
    component.handleCategory();
    expect(component.categoryErr).toBeTruthy();

  });


  
  it('should validate empty category', () => {
    debug.query(By.css('#category')).nativeElement.value = "pasta";
    fixture.detectChanges();
    component.handleCategory();
    expect(component.categoryErr).toBeFalsy();

  });




  it('should not validate empty recipe', () => {
    component.recipeInput.nativeElement.value = "";
    fixture.detectChanges();
    component.handleRecipe();
    expect(component.recipeErr).toBeTruthy();

  });


  it('should validate not empty recipe', () => {
    const myFile = new File(['Test'], 'myFile.txt', {
      type: 'text/plain',
      lastModified: new Date().getTime(),
    });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myFile);
    component.recipeInput.nativeElement.files = dataTransfer.files;

    fixture.detectChanges();
    component.handleRecipe();
    expect(component.recipeErr).toBeFalsy();

  });


  it('should not validate empty photo', () => {
    component.photoInput.nativeElement.value = "";
    fixture.detectChanges();
    component.handlePhoto();
    expect(component.photoErr).toBeTruthy();

  });


  it('should validate not empty photo', () => {
    const myFile = new File(['Test'], 'myFile.png', {
      type: 'image/png',
      lastModified: new Date().getTime(),
    });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myFile);
    component.photoInput.nativeElement.files = dataTransfer.files;
    fixture.detectChanges();
    component.handlePhoto();
    expect(component.photoErr).toBeFalsy();

  });



  it('should clear form', () => {
    component.titleInput.nativeElement.value = "Pizza";
    component.categoryInput.nativeElement.value = "Seafood";
    component.linkInput.nativeElement.value = "/myLink"
    const myPhoto = new File(['Test'], 'myFile.png', {
      type: 'image/png',
      lastModified: new Date().getTime(),
    });
    const dataTransfer1 = new DataTransfer();
    dataTransfer1.items.add(myPhoto);
    component.photoInput.nativeElement.files = dataTransfer1.files;

    const myFile = new File(['Test'], 'myFile.txt', {
      type: 'text/plain',
      lastModified: new Date().getTime(),
    });
    component.toBase64(myPhoto);
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myFile);
    component.recipeInput.nativeElement.files = dataTransfer.files;
    fixture.detectChanges();
    component.cancelOnClick();
    expect(component.titleInput.nativeElement.value).toBe("");
    expect(component.categoryInput.nativeElement.value).toBe("");
    expect(component.linkInput.nativeElement.value).toBe("");
    expect(component.photoInput.nativeElement.value).toBe("");
    expect(component.recipeInput.nativeElement.value).toBe("");

  });


  it('should disable button when form has title error', () => {
    component.titleErr = true;
    component.categoryErr = false;

    fixture.detectChanges();
    component.handleFormChange();
    expect(component.disabledSend).toBeTruthy();
  });

  it('should disable button when form has category error', () => {
    component.categoryErr = true;
    component.titleErr = false;
    fixture.detectChanges();
    component.handleFormChange();
    expect(component.disabledSend).toBeTruthy();
  });


  it('should disable button when form has photo error', () => {
    component.photoErr = true;
    component.titleErr = false;
    component.categoryErr = false;
    fixture.detectChanges();
    component.handleFormChange();
    expect(component.disabledSend).toBeTruthy();
  });

  it('should disable button when form has recipe error', () => {
    component.recipeErr = true;
    component.photoErr = false;
    component.titleErr = false;
    component.categoryErr = false;
    fixture.detectChanges();
    component.handleFormChange();
    expect(component.disabledSend).toBeTruthy();
  });


  it('should enable button when form does not have recipe error', () => {
    component.recipeErr = false;
    component.photoErr = false;
    component.titleErr = false;
    component.categoryErr = false;
    fixture.detectChanges();
    component.handleFormChange();
    expect(component.disabledSend).toBeFalsy();
  });
});
