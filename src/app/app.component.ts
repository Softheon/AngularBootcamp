import { Component, OnInit } from '@angular/core';

import { StorageService } from './core/services/storage.service';

/**
 * The app component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * constructs the component
   * @param storageService The storage service
   */
  constructor(
    private storageService: StorageService
    ) { }

  /**
   * Initializes the component
   */
  public ngOnInit(): void {
    // watches for a language change
    this.storageService.watchLanguage();
  }
}
