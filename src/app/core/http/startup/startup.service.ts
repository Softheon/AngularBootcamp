import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Config } from '../../../configs/config';
import { ConfigService } from '../../../configs/config.service';

/**
 * The startup service is used to call methods that should be run when initially loading the application
 */
@Injectable(
  {
    providedIn: 'root'
  }
)
export class StartupService {

  /** True if the startup was a success, false otherwise */
  private _startupSuccess: boolean;

  /** Returns true if the startup was a success, false otherwise */
  public get startupSuccess(): boolean {
    return this._startupSuccess;
  }
  /**
   * Constructs the startup service. Include any services that should be used during startup
   * @param http The HTTP Client
   * @param translateService The translate service
   * @param configService The configuration service
   */
  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private configService: ConfigService
  ) { }


  /**
   * Loads all data that is needed upon initial loading of the website
   */
  public async load(): Promise<any> {
    // reads the language from local storage set in the parent app
    localStorage.setItem('language', 'en'); //TODO remove once parent app is capable of toggling the language
    const language = localStorage.getItem('language');

    // Set languages for translation service
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);

    // Adapted from https://stackoverflow.com/a/41636880
    // Adapted from https://stackoverflow.com/a/41736293

    // A callback used to initialize the promise. This callback is passed two arguments:
    // a resolve callback used resolve the promise with a value or the result of another promise,
    // and a reject callback used to reject the promise with a provided reason or error.
    return new Promise(async (resolve, reject) => {
      // Go through all services and complete any API calls necessary.
      // At the end, if all works and loads as expected, resolve the promise and set startup success to true.
      // If an issue is encountered, you can call reject() to hit the catch() code below.

      // First, load the configurations
      let [configs, lang, staticLang] = [new Config(), JSON, JSON];
      try {
        [configs, lang, staticLang] = await Promise.all([this.setConfig(environment.moduleHref), this.setLanguageFile(environment.moduleHref), this.getStaticLang(language)]);
        this.configService.config = configs;
        const merged = this.createLanguageFile(staticLang, lang);
        this.translateService.setTranslation(language, merged);
      }
      catch (error) {
        // Catch any errors during the get configurations API call
        console.error('Error Loading Configurations or Languages');
        // Reject the promise
        reject('error');

        return throwError(error.error || 'Server error');
      }
      // now do stuff with the first two promises
      try {
        const oAuth = await this.setUpOAuth();
      }
      catch (error) {
        reject(error);

        return throwError(error);
      }

      this._startupSuccess = true;
      resolve();
    }).catch((error) => {
      // Catch the error
      console.error('There was an error loading the startup configurations.');
    });
  }

  /**
   * Sets the configuration value
   */
  public async setConfig(moduleHref: string): Promise<Config> {
    return this.get<Config>(`.${environment.baseHref}assets/appsettings.json`);
  }

  /**
   * Sets the language configuration value
   */
  public async setLanguageFile(moduleHref: string): Promise<JSON> {
    return this.get<JSON>(`.${environment.baseHref}assets/i18n/en.json`);
  }

  /**
   * Performs HTTP Get request using the provided URI. Good for getting a single set of data.
   * @param uri The URI to GET from
   */
  private async get<T>(uri: string): Promise<T> {
    // const fullUri = local ? uri : this.getFullUri(uri); use when getting configs or language files from a bcking api
    return this.http.get<T>(uri)
      .toPromise();
  }

  /**
   * Gets the full URI for an API request, use this for getting configs or language files from a backing api
   * @param uri The partial URI
   */
  // private getFullUri = (uri: string): string => environment.apiBaseUri + uri;

  /**
   * merges the common language json file with the switchboard language json file
   * @param switchboardJson The switchboard json
   * @param commonJson The common json
   */
  private createLanguageFile = (commonJson: JSON, switchboardJson: JSON): JSON => {
    const merged = _.merge(commonJson, switchboardJson);

    return merged;
  };

  /**
   * Gets the static language file
   * @param language The language
   */
  private async getStaticLang(language: string): Promise<JSON> {
    return this.http.get<JSON>(`${environment.languagePath}${language}.json`)
      .toPromise();
  }

  /**
   * Configure implicit flow
   */
  private async setUpOAuth(): Promise<boolean> {
    // TODO: MAY NEED TO REMOVE DEPENDING ON THE MODULE
    // const authConfig: AuthConfig = new AuthConfig();
    // authConfig.issuer = this.configService.config.issuer;
    // authConfig.redirectUri = window.location.origin + environment.baseHref;
    // authConfig.clientId = this.configService.config.clientId;
    // authConfig.scope = this.configService.config.scope;
    // authConfig.skipIssuerCheck = true;

    // this.oauthService.configure(authConfig);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // this.oauthService.setupAutomaticSilentRefresh();
    // return this.oauthService.loadDiscoveryDocumentAndLogin();

    return Promise.resolve(true);
  }
}
