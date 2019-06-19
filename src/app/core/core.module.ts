import { CommonModule } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule } from 'angular-oauth2-oidc';

import { environment } from '../../environments/environment';
import { ConfigService } from '../configs/config.service';
import { ApiService } from './http/api.service';
import { StartupService } from './http/startup/startup.service';
import { CustomOAuthInterceptorService } from './interceptors/custom-oauth-interceptor.service';
import { AlertService } from './services/alert.service';
import { StorageService } from './services/storage.service';

/**
 * Creates the translate HTTP loader
 * This is necessary for AoT loading
 * @param http HTTP Client
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `.${environment.baseHref}/assets/i18n/`, '.json');
}

/**
 * The startup service factory. This will be ran upon application startup
 * @param startupService The startup service
 */
export function startupServiceFactory(startupService: StartupService) {
  return async () => startupService.load();
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.apiBaseUri],
        sendAccessToken: true
      }
    })
  ],
  providers: [
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    ConfigService,
    StorageService,
    AlertService,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomOAuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
