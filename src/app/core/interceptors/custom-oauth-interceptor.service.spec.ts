import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { OAuthModuleConfig, OAuthResourceServerErrorHandler, OAuthStorage } from 'angular-oauth2-oidc';

import { environment } from '../../../environments/environment.prod';
import { mockErrorHandler, mockOAuthModuleConfig, mockOAuthStorage } from '../mocks/oauthMock.mock';
import { CustomOAuthInterceptorService } from './custom-oauth-interceptor.service';

describe('CustomOauthInterceptorService', () => {
  let service: CustomOAuthInterceptorService;
  let router: Router;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let oauthStorage: OAuthStorage;
  let oauthModuleConfig: OAuthModuleConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [
        CustomOAuthInterceptorService,
        { provide: OAuthStorage, useValue: mockOAuthStorage },
        { provide: OAuthModuleConfig, useValue: mockOAuthModuleConfig },
        { provide: OAuthResourceServerErrorHandler, useValue: mockErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: CustomOAuthInterceptorService, multi: true }
      ]
    });

    service = TestBed.get(CustomOAuthInterceptorService);
    router = TestBed.get(Router);
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    oauthStorage = TestBed.get(OAuthStorage);
    oauthModuleConfig = TestBed.get(OAuthModuleConfig);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });

  it('should intercept', () => {
    const url = `${environment.apiBaseUri}/v1/users`;

    httpClient.get(url)
      .subscribe(res => expect(res)
        .toBeTruthy());
    const req = httpMock.expectOne(url);

    req.flush({ data: 'test' });
  });

  it('should intercept and not send access token', () => {
    const url = `${environment.apiBaseUri}/v1/users`;

    oauthModuleConfig.resourceServer.sendAccessToken = false;

    httpClient.get(url)
      .subscribe(res => {
        expect(res)
          .toBeTruthy();
        oauthModuleConfig.resourceServer.sendAccessToken = true;
      });
    const req = httpMock.expectOne(url);

    req.flush({ data: 'test' });
  });

  it('should intercept and route on error', async () => {
    const url = `${environment.apiBaseUri}/v1/users`;

    spyOn(oauthStorage, 'getItem').and
      .returnValue('test');
    oauthModuleConfig.resourceServer.sendAccessToken = false;

    const routerSpy = spyOn(router, 'navigateByUrl');

    httpClient.get(url)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        expect(err)
          .toBeTruthy();
        expect(routerSpy)
          .toHaveBeenCalledWith('/error');
      });
    const req = httpMock.expectOne(url);

    req.flush({ data: 'test' }, { status: 500, statusText: 'Internal server error' });
  });

  it('should intercept with out a port', async () => {
    const url = `${environment.apiBaseUri}/v1/users`;

    httpClient.get(url)
      .subscribe(res => expect(res)
        .toBeTruthy());
    const req = httpMock.expectOne(url);

    req.flush({ data: 'test' });
  });

  it('should intercept and not append to headers with no token', async () => {
    spyOn(oauthStorage, 'getItem').and
      .returnValue(undefined);
    oauthModuleConfig.resourceServer.sendAccessToken = true;
    const url = `${environment.apiBaseUri}/v1/users`;

    httpClient.get(url)
      .subscribe(res => expect(res)
        .toBeTruthy());
    const req = httpMock.expectOne(url);

    req.flush({ data: 'test' });
  });

});
