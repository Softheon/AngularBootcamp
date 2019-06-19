import { async, inject, TestBed } from '@angular/core/testing';

import { OAuthService } from 'angular-oauth2-oidc';

import { ApiService } from '../api.service';
import { UserService } from './user.service';

describe('UserService', () => {

  const user = {
    name: 'name',
    upn: 'upn',
    sub: 'sub',
    folderId: '0'
  };

  /** The mock oauth service */
  let oauthServiceStub: {
    loadUserProfile(): Promise<object>;
  };

  /** The mock api service */
  let apiServiceStub: {
    get(): Promise<object>;
    put(): Promise<object>;
  };

  beforeEach(() => {

    oauthServiceStub = jasmine.createSpyObj({ loadUserProfile: Promise.resolve(user) });

    apiServiceStub = {
      async get(): Promise<object> {
        return Promise.resolve({});
      },
      async put(): Promise<object> {
        return Promise.resolve({});
      }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: OAuthService, useValue: oauthServiceStub },
        { provide: ApiService, useValue: apiServiceStub },
        UserService
      ]
    });
  });

  it('should be created', async(inject([UserService], (service: UserService) => {
    expect(service)
      .toBeTruthy();
  })));

  it('should get user', async(inject([UserService], (service: UserService) => {
    service.getUser()
      .then(result => {
        expect(result)
          .toBeTruthy();
      });
  })));

  it('should get user name', async(inject([UserService], (service: UserService) => {
    service.getUserName()
      .then(result => {
        expect(result)
          .toBe('name');
      });
  })));

  it('should get upn', async(inject([UserService], (service: UserService) => {
    service.getUPN()
      .then(result => {
        expect(result)
          .toBe('upn');
      });
  })));

  it('should assign role', async(inject([UserService, OAuthService], (service: UserService, oauthService: OAuthService) => {
    // Act
    service.assignRole();

    // Assert
    expect(oauthService.loadUserProfile)
      .toHaveBeenCalledTimes(1);
  })));

});
