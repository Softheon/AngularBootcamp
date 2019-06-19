import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';

import { OAuthModuleConfig, OAuthResourceServerConfig } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

/**
 * Mock OAuth service config
 */
export const mockOAuthResourceServerConfig: OAuthResourceServerConfig = {
    allowedUrls: [environment.apiBaseUri],
    sendAccessToken: true
};

/**
 * Mock OAuth module config
 */
export const mockOAuthModuleConfig: OAuthModuleConfig = {
    resourceServer: mockOAuthResourceServerConfig
};

/**
 * Mock OAuth storage
 */
export const mockOAuthStorage: any = {
    getItem(_: string): string {
        return 'test';
    }
};

/**
 * Mock OAuth Service
 */
export const mockOauthService: any = {
    configure(_: OAuthModuleConfig): void { },
    setupAutomaticSilentRefresh(): void { },
    loadDiscoveryDocument(): Promise<object> {
        return Promise.resolve({});
    },
    tryLogin(): Promise<boolean> {
        return Promise.resolve(true);
    },
    initImplicitFlow(): void {
        return;
    }
};

/** Mock error handler */
export const mockErrorHandler: any = {
    handleError(error: HttpResponse<any>): Observable<any> {
        return new Observable<any>();
    }
};
