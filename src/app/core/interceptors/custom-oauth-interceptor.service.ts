import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';

import { OAuthModuleConfig, OAuthResourceServerErrorHandler, OAuthStorage } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/**
 * Intercept http requests and adds access tokens to the request header
 */
@Injectable({
  providedIn: 'root'
})
export class CustomOAuthInterceptorService {
  /** The total number of requests */
  private totalRequests = 0;

  /**
   * The Constructor
   * @param router The router
   * @param authStorage: The Auth Storage
   * @param window The window
   * @param errorHandler The error handler
   * @param moduleConfig: The module configuration
   */
  constructor(
    private router: Router,
    private authStorage: OAuthStorage,
    @Optional() private moduleConfig: OAuthModuleConfig
  ) { }

  /**
   * Intercepts the HTTP Requests and starts the loading animation. Redirects any 500 errors automatically to the error page
   * @param req HTTP Request
   * @param next Next HTTP Handler
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request url
    const url = req.url.toLowerCase();
    // checks the url and determines if sending the access token is allowed
    if (this.checkUrl(url) && this.moduleConfig.resourceServer.sendAccessToken) {
      const token = this.authStorage.getItem('access_token');
      const header = 'Bearer ' + token;
      let headers = req.headers;
      if (token) {
        headers = headers.set('Authorization', header);
      }

      req = req.clone({ headers });
    }

    this.totalRequests++;

    return next.handle(req)
      .pipe(
        tap(res => {
          if (res instanceof HttpResponse) {
            this.decreaseRequests();
          }
        }),
        catchError(err => {
          this.decreaseRequests();
          this.router.navigateByUrl('/error');
          throw err;
        })
      );
  }

  /**
   * Checks if the given url starts with the current website url
   * @param url The url
   */
  private checkUrl(url: string): boolean {

    if (!this.moduleConfig.resourceServer
      || !this.moduleConfig.resourceServer.allowedUrls
      || !this.moduleConfig.resourceServer.sendAccessToken) {
      return false;
    }
    const currentUrl = `${window.location.protocol}//${window.location.hostname}`;

    return !!url.startsWith(currentUrl);
  }

  /** Decreases the number of requests */
  private decreaseRequests(): void {
    this.totalRequests--;
  }
}
