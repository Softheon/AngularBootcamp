import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { StorageKeys } from '../../shared/constants/storage-keys';

/**
 * The storage service is used to keep track of local storage data
 */
@Injectable()
export class StorageService {

  /**
   * constructs the component
   * @param translateService The translate service
   */
  constructor(private translateService: TranslateService) { }

  /**
   * starts watching the language for a change
   */
  public watchLanguage(): void {
    let lastLanguage = localStorage.getItem(StorageKeys.LANGUAGE);
    let watcher: number;
    let watch = () => {
      cancelAnimationFrame(watcher);

      if (lastLanguage !== localStorage.getItem(StorageKeys.LANGUAGE)) {
        // change language
        lastLanguage = localStorage.getItem(StorageKeys.LANGUAGE);
        this.translateService.setDefaultLang(lastLanguage);
        this.translateService.use(lastLanguage);
      }
      else{
        lastLanguage = localStorage.getItem(StorageKeys.LANGUAGE);
      }
      watcher = requestAnimationFrame(watch);
    };
    watcher = window.requestAnimationFrame(watch);
  }
}
