import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { AuthConfig, LoginOptions, OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../../../../environments/environment';
import { Config } from '../../../configs/config';
import { ConfigService } from '../../../configs/config.service';
import { StartupService } from './startup.service';
import { CustomOAuthInterceptorService } from '../../interceptors/custom-oauth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('StartupService', () => {

  let oauthServiceStub: {
    loadDiscoveryDocumentAndLogin(options?: LoginOptions): Promise<boolean>,
    setupAutomaticSilentRefresh(params?: object): void,
    configure(config: AuthConfig): void
  };

  let configServiceStub: {
    config: Config
  };

  beforeEach((() => {
    // Mock the oauth service
    oauthServiceStub = {
      async loadDiscoveryDocumentAndLogin(options?: LoginOptions): Promise<boolean> {
        return Promise.resolve(true);
      },
      setupAutomaticSilentRefresh(params?: object): void {
        return;
      },
      configure(config: AuthConfig): void {
        return;
      }
    };

    configServiceStub = {
      config: new Config()
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        StartupService,
        { provide: ConfigService, useValue: configServiceStub },
        { provide: OAuthService, useValue: oauthServiceStub }
      ]
    });
  }));

  afterEach(() => {
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    httpMock.verify();
  });

  it('should be created', inject([StartupService], async (startupService: StartupService) => {
    expect(startupService)
      .toBeTruthy();
  }));

  it('should load and startup successfully', inject([StartupService], async (startupService: StartupService) => {
    // Arrange
    const configSpy = spyOn<any>(startupService, 'setConfig').and
      .returnValue(Promise.resolve(new Config()));
    const langSpy = spyOn<any>(startupService, 'setLanguageFile').and
      .returnValue(Promise.resolve({ data: 'item' }));
    const oAuthSpy = spyOn<any>(startupService, 'setUpOAuth').and
      .returnValue(Promise.resolve(true));
    const staticLangSpy = spyOn<any>(startupService, 'getStaticLang').and
      .returnValue(Promise.resolve());

    // Act
    await startupService.load();

    // Assert
    expect(configSpy)
      .toHaveBeenCalledTimes(1);
    expect(langSpy)
      .toHaveBeenCalledTimes(1);
    expect(oAuthSpy)
      .toHaveBeenCalledTimes(1);
    expect(staticLangSpy)
      .toHaveBeenCalledTimes(1);
    expect(startupService.startupSuccess)
      .toBeTruthy();
  }));

  it('should load configs', inject([StartupService, HttpTestingController], async (startupService: StartupService, httpMock: HttpTestingController) => {
    // Arrange
    const configSpy = spyOn<any>(startupService, 'setConfig').and
      .callThrough();
    const langSpy = spyOn<any>(startupService, 'setLanguageFile').and
      .returnValue(Promise.resolve({ data: 'item' }));
    const oAuthSpy = spyOn<any>(startupService, 'setUpOAuth').and
      .returnValue(Promise.resolve(true));
    const staticLangSpy = spyOn<any>(startupService, 'getStaticLang').and
      .returnValue(Promise.resolve());

    // Act
    const prom = startupService.load();
    const configRequest = httpMock.expectOne(`.${environment.baseHref}assets/appsettings.json`);
    configRequest.flush(new Config());
    await prom;

    // Assert
    expect(configSpy)
      .toHaveBeenCalledTimes(1);
    expect(langSpy)
      .toHaveBeenCalledTimes(1);
    expect(oAuthSpy)
      .toHaveBeenCalledTimes(1);
    expect(staticLangSpy)
      .toHaveBeenCalledTimes(1);
    expect(startupService.startupSuccess)
      .toBeTruthy();
  }));

  it('should fail to start with out configs', inject([StartupService, HttpTestingController], async (startupService: StartupService, httpMock: HttpTestingController) => {
    // Arrange
    const configSpy = spyOn<any>(startupService, 'setConfig').and
      .callThrough();
    const langSpy = spyOn<any>(startupService, 'setLanguageFile').and
      .returnValue(Promise.resolve({ data: 'item' }));
    const oAuthSpy = spyOn<any>(startupService, 'setUpOAuth').and
      .returnValue(Promise.resolve(true));
    const staticLangSpy = spyOn<any>(startupService, 'getStaticLang').and
      .returnValue(Promise.resolve());

    // Act
    const prom = startupService.load();
    const configRequest = httpMock.expectOne(`.${environment.baseHref}assets/appsettings.json`);
    configRequest.error(null, {status: 500, statusText: 'internal server error'});
    await prom;

    // Assert
    expect(configSpy)
      .toHaveBeenCalledTimes(1);
    expect(langSpy)
      .toHaveBeenCalledTimes(1);
    expect(oAuthSpy)
      .toHaveBeenCalledTimes(0);
    expect(staticLangSpy)
      .toHaveBeenCalledTimes(1);
    expect(startupService.startupSuccess)
      .toBeFalsy();
  }));

  it('should load configure oAuth', inject([StartupService, HttpTestingController], async (startupService: StartupService, httpMock: HttpTestingController) => {
    // Arrange
    const configSpy = spyOn<any>(startupService, 'setConfig').and
      .returnValue(Promise.resolve(new Config()));
    const langSpy = spyOn<any>(startupService, 'setLanguageFile').and
      .returnValue(Promise.resolve({ data: 'item' }));
    const oAuthSpy = spyOn<any>(startupService, 'setUpOAuth').and
      .callThrough();
    const staticLangSpy = spyOn<any>(startupService, 'getStaticLang').and
      .returnValue(Promise.resolve());

    // Act
    const prom = startupService.load();
    await prom;

    // Assert
    expect(configSpy)
      .toHaveBeenCalledTimes(1);
    expect(langSpy)
      .toHaveBeenCalledTimes(1);
    expect(oAuthSpy)
      .toHaveBeenCalledTimes(1);
    expect(staticLangSpy)
      .toHaveBeenCalledTimes(1);
    expect(startupService.startupSuccess)
      .toBeTruthy();
  }));

  it('should fail to start if oauth config fails', inject([StartupService, HttpTestingController], async (startupService: StartupService, httpMock: HttpTestingController) => {
    // Arrange
    const configSpy = spyOn<any>(startupService, 'setConfig').and
      .returnValue(Promise.resolve(new Config()));
    const langSpy = spyOn<any>(startupService, 'setLanguageFile').and
      .returnValue(Promise.resolve({ data: 'item' }));
    const oAuthSpy = spyOn<any>(startupService, 'setUpOAuth').and
      .returnValue(Promise.reject());
    const staticLangSpy = spyOn<any>(startupService, 'getStaticLang').and
      .returnValue(Promise.resolve());

    // Act
    const prom = startupService.load();
    await prom;

    // Assert
    expect(configSpy)
      .toHaveBeenCalledTimes(1);
    expect(langSpy)
      .toHaveBeenCalledTimes(1);
    expect(oAuthSpy)
      .toHaveBeenCalledTimes(1);
    expect(staticLangSpy)
      .toHaveBeenCalledTimes(1);
    expect(startupService.startupSuccess)
      .toBeFalsy();
  }));


  it('should load languages', inject([StartupService, HttpTestingController], async (startupService: StartupService, httpMock: HttpTestingController) => {
    // Arrange
    const configSpy = spyOn<any>(startupService, 'setConfig').and
      .returnValue(Promise.resolve(new Config()));
    const langSpy = spyOn<any>(startupService, 'setLanguageFile').and
      .callThrough();
    const oAuthSpy = spyOn<any>(startupService, 'setUpOAuth').and
      .returnValue(Promise.resolve(true));
    const staticLangSpy = spyOn<any>(startupService, 'getStaticLang').and
      .returnValue(Promise.resolve());

    // Act
    const prom = startupService.load();
    const setLangRequest = httpMock.expectOne(`.${environment.baseHref}assets/i18n/en.json`);
    setLangRequest.flush({ data: 'item' });
    await prom;

    // Assert
    expect(configSpy)
      .toHaveBeenCalledTimes(1);
    expect(langSpy)
      .toHaveBeenCalledTimes(1);
    expect(oAuthSpy)
      .toHaveBeenCalledTimes(1);
    expect(staticLangSpy)
      .toHaveBeenCalledTimes(1);
    expect(startupService.startupSuccess)
      .toBeTruthy();
  }));

  it('should merge languages', inject([StartupService, HttpTestingController], async (startupService: StartupService, httpMock: HttpTestingController) => {
    // Arrange
    const configSpy = spyOn<any>(startupService, 'setConfig').and
      .returnValue(Promise.resolve(new Config()));
    const langSpy = spyOn<any>(startupService, 'setLanguageFile').and
      .returnValue(Promise.resolve({ data: 'item' }));
    const oAuthSpy = spyOn<any>(startupService, 'setUpOAuth').and
      .returnValue(Promise.resolve(true));
    const staticLangSpy = spyOn<any>(startupService, 'getStaticLang').and
      .callThrough();

    // Act
    const prom = startupService.load();
    const staticLangRequest = httpMock.expectOne(`${environment.languagePath}en.json`);
    staticLangRequest.flush({ some: 'data' });
    await prom;

    // Assert
    expect(configSpy)
      .toHaveBeenCalledTimes(1);
    expect(langSpy)
      .toHaveBeenCalledTimes(1);
    expect(oAuthSpy)
      .toHaveBeenCalledTimes(1);
    expect(staticLangSpy)
      .toHaveBeenCalledTimes(1);
    expect(startupService.startupSuccess)
      .toBeTruthy();
  }));

});
