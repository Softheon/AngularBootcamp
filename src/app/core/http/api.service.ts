import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

/**
 * The API service is used to access API's
 */
@Injectable()
export class ApiService {

  /**
   * Observable that keeps track of when web service calls are being requested
   */
  public doingWorkSpy: Observable<boolean>;

  /**
   * Keeps track of when web service calls are being requested
   */
  public doingWork: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * The error page
   */
  private internalServerErrorPage: string = '/error/500';

  /**
   * The error message
   */
  private errorMessage: string = 'An error has occurred.';

  /**
   * Constructs the service
   * @param http The HTTP client
   * @param router The router service
   */
  constructor(private http: HttpClient, private router: Router) {
    this.doingWorkSpy = this.doingWork.asObservable();
  }

  /**
   * Performs HTTP Get request using the provided URI. Good for getting a single set of data.
   * @param uri The URI to GET from
   * @param showLoadingAnimation Whether to show the loading animation
   * @param redirectOnError Whether should redirect to error page on web service call fail
   */
  public async get<T>(uri: string, showLoadingAnimation: boolean = true, redirectOnError: boolean = true): Promise<T> {
    const headers = this.getHeader();
    const fullUri = this.getFullUri(uri);

    if (showLoadingAnimation) {
      this.doingWork.next(true);
    }

    return this.http.get<T>(fullUri, { headers })
      .toPromise()
      .then((value: T) => {
        if (showLoadingAnimation) {
          this.doingWork.next(false);
        }

        return value;
      })
      .catch(async error => {
        if (showLoadingAnimation) {
          this.doingWork.next(false);
        }
        console.error(error);
        if (redirectOnError) {
          this.router.navigateByUrl(this.internalServerErrorPage);
        }

        return Promise.reject(this.errorMessage);
      });
  }

  /**
   * Performs HTTP Post request using the provided URI
   * @param uri The URI to PUT to
   * @param content The content to PUT to the server
   * @param redirectOnError Whether should redirect to error page on web service call fail
   */
  public async post<T>(uri: string, content: any, redirectOnError: boolean = true): Promise<T> {
    const headers = this.getHeader();
    const fullUri = this.getFullUri(uri);
    this.doingWork.next(true);

    return this.http.post<T>(fullUri, content, { headers })
      .toPromise()
      .then((value: T) => {
        this.doingWork.next(false);

        return value;
      })
      .catch(async error => {
        this.doingWork.next(false);
        console.error(error);
        if (redirectOnError) {
          this.router.navigateByUrl(this.internalServerErrorPage);
        }

        return Promise.reject(this.errorMessage);
      });
  }

  /**
   * Performs HTTP Put request using the provided URI
   * @param uri The uri
   * @param content The Content
   * @param redirectOnError Whether should redirect to error page on web service call fail
   */
  public async put<T>(uri: string, content: any, redirectOnError: boolean = true): Promise<T> {
    const headers = this.getHeader();
    const fullUri = this.getFullUri(uri);
    this.doingWork.next(true);

    return this.http.put<T>(fullUri, content, { headers })
      .toPromise()
      .then((value: T) => {
        this.doingWork.next(false);

        return value;
      })
      .catch(async error => {
        this.doingWork.next(false);
        console.error(error);
        if (redirectOnError) {
          this.router.navigateByUrl(this.internalServerErrorPage);
        }

        return Promise.reject(this.errorMessage);
      });
  }

  /**
   * Performs HTTP Delete request using the provided URI
   * @param uri The uri
   * @param content The content to delete
   * @param redirectOnError Whether should redirect to error page on web service call fail
   */
  public async delete<T>(uri: string, content: any, redirectOnError: boolean = true): Promise<T> {
    const headers = this.getHeader();
    const fullUri = this.getFullUri(uri);
    this.doingWork.next(true);

    return this.http.request<T>('delete', fullUri, { body: content, headers })
      .toPromise()
      .then((value: T) => {
        this.doingWork.next(false);

        return value;
      })
      .catch(async error => {
        this.doingWork.next(false);

        if (redirectOnError) {
          this.router.navigateByUrl(this.internalServerErrorPage);
        }

        return Promise.reject(this.errorMessage);
      });
  }

  /**
   * Gets the full URI for an API request
   * @param uri The partial URI
   */
  public getFullUri(uri: string): string {
    return environment.apiBaseUri + environment.baseHref + uri;
  }

  /**
   * Returns a new http header with content type set to application/json
   */
  private getHeader = (): HttpHeaders => new HttpHeaders({ 'Content-Type': 'application/json' });
}
