import { Component, ElementRef, ViewChild } from '@angular/core';

declare var Email: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  TITLE_REGEX = /^[\p{L}][\p{L} '-().]{1,64}$/u;

  disabledSend: boolean = true;
  titleErr: boolean = true;
  categoryErr: boolean = true;
  photoErr: boolean = true;
  recipeErr: boolean = true;
  photoData: any;
  recipeData: any;
  @ViewChild('titleInput') titleInput: ElementRef = {} as ElementRef;
  @ViewChild('recipeInput') recipeInput: ElementRef = {} as ElementRef;
  @ViewChild('photoInput') photoInput: ElementRef = {} as ElementRef;
  @ViewChild('categoryInput') categoryInput: ElementRef = {} as ElementRef;
  @ViewChild('linkInput') linkInput: ElementRef = {} as ElementRef;

  constructor() { }

  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    })
  }


  handleTitle() {

    if (!this.titleInput.nativeElement.value) this.titleErr = true;
    else if (!this.TITLE_REGEX.test(this.titleInput.nativeElement.value)) this.titleErr = true;
    else this.titleErr = false;
  }
  handleCategory() {
    if (!this.categoryInput.nativeElement.value) this.categoryErr = true;
    else this.categoryErr = false;
  }

  handleRecipe() {
    if (this.recipeInput.nativeElement.files.length === 0) this.recipeErr = true;
    else this.recipeErr = false;
  }
  handlePhoto() {
    if (this.photoInput.nativeElement.files.length === 0) this.photoErr = true;
    else this.photoErr = false;
  }


  cancelOnClick() {
    this.titleInput.nativeElement.value = '';
    this.categoryInput.nativeElement.value = '';
    this.photoInput.nativeElement.value = '';
    this.recipeInput.nativeElement.value = '';
    this.linkInput.nativeElement.value = '';
    this.disabledSend = true;
  };

  handleFormChange() {
    if (this.titleErr || this.categoryErr || this.photoErr || this.recipeErr) this.disabledSend = true;
    else this.disabledSend = false;

  }


  async handleFormSubmit(e: any) {
    e.preventDefault();
    await this.toBase64(this.photoInput.nativeElement.files[0]).then((result: any) => {
      this.photoData = result;
    });
    await this.toBase64(this.recipeInput.nativeElement.files[0]).then((result: any) => {
      this.recipeData = result;
    });
    Email.send({

      Host: 'smtp.elasticemail.com',
      Username: 'masha.an.0122@gmail.com',
      Password: 'AAFAFB74CE7B7DA9B1390D10925A4DB53A22',
      To: 'masha.an.0122@gmail.com',
      From: 'masha.an.0122@gmail.com',
      Subject: 'This is the subject',
      Body: `Title: ${this.titleInput.nativeElement.value}, Category: ${this.categoryInput.nativeElement.value}, Link: ${this.linkInput.nativeElement.value}`,
      Attachments: [
        {
          name: this.photoInput.nativeElement.files[0].name,
          data: this.photoData,
        },
        {
          name: this.recipeInput.nativeElement.files[0].name,
          data: this.recipeData,
        }],
    });

    this.cancelOnClick();
  }

}
