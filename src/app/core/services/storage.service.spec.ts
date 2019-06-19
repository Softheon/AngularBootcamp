import { TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;
  let translateService: TranslateService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        StorageService, TranslateService
      ]
    });
    storageService = TestBed.get(StorageService);
    translateService = TestBed.get(TranslateService);
  });

  it('should be created', () => {
    expect(storageService)
      .toBeTruthy();
  });

  it('should watch for the change in language', () => {
    localStorage.setItem('language', 'en');
    storageService.watchLanguage();
    translateService.currentLang = 'en';
    expect(translateService.currentLang)
      .toBe('en');

    localStorage.setItem('language', 'es');
    storageService.watchLanguage();
    translateService.currentLang = 'es';
    expect(translateService.currentLang)
      .toBe('es');
  });

});
