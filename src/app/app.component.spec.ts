import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { StorageService } from './core/services/storage.service';

describe('AppComponent', () => {

  /**
   * The mock storage service
   */
  let storageServiceStub: {
    watchLanguage(): void
  }

  beforeEach(async(() => {

    storageServiceStub = {
      watchLanguage(): void { }
    }

    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: StorageService, useValue: storageServiceStub },
      ]
    })
      .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });

  it('should watch for a language change', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();

    localStorage.setItem('language', 'en');
    expect(localStorage.getItem('language'))
      .toBe('en');

    storageServiceStub.watchLanguage();

    localStorage.setItem('language', 'es');
    expect(localStorage.getItem('language'))
      .toBe('es');

  });
});
