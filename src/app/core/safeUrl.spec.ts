import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChanges } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SimpleChange } from '@angular/core';
import { SafePipe } from '../safeUrl.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafePipe', () => {
    let pipe: SafePipe;
    let DomSanitizerStub: any;
   
    beforeEach(async () => {
        DomSanitizerStub = {
            bypassSecurityTrustResourceUrl : (url: string) => {
                return "safe-test" + url;
            }
        }
        TestBed.configureTestingModule({
            declarations:[SafePipe],
            providers: [SafePipe, { provide: DomSanitizer, useValue: DomSanitizerStub }]
        })
        pipe = TestBed.inject(SafePipe);

   
    });

    it('should create', () => {
        pipe.transform("test");
        expect(pipe).toBeTruthy();
    });


});

