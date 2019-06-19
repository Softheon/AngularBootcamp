import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';

describe('ApiService', () => {

  /** get uri  */
  const uri: string = '/test/uri';

  /** The full uri */
  const fullUri: string = `${environment.apiBaseUri}${environment.baseHref}${uri}`

  /** content to post */
  const content: any = {};

  /** router stub */
  let routerStub: {};

  /** The mock http testing controller */
  let httpMock: HttpTestingController;

  beforeEach(() => {
    routerStub = {
      navigateByUrl(url: string): void {
        return;
      }
    };

    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: Router, useValue: routerStub }
      ],
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service)
      .toBeTruthy();
  }));

  it('should call get method', inject([ApiService], async (service: ApiService) => {
    let res: any;
    let prom = service.get(uri);
    let req = httpMock.expectOne(fullUri);
    req.flush({ data: 'value' });
    res = await prom;
    expect(res.data)
      .toEqual('value');

    prom = service.get(uri, false);
    req = httpMock.expectOne(fullUri);
    req.flush({ data: 'value' });
    res = await prom;
    expect(res.data)
      .toEqual('value');

    prom = service.get(uri, false, false);
    req = httpMock.expectOne(fullUri);
    req.flush({ data: 'value' });
    res = await prom;
    expect(res.data)
      .toEqual('value');
  }));

  it('should reject get method', inject([ApiService, Router], async (service: ApiService, router: Router) => {
    // Arrange
    spyOn(router, 'navigateByUrl').and
      .callThrough();
    const prom = service.get(uri);
    httpMock.expectOne(fullUri)
      .error(new ErrorEvent('Bad Request'), { status: 400, statusText: 'Bad Request' });

    // Act
    try {
      await prom;
      fail('unwanted promise resolution');
    }
    // Assert
    catch (error) {
      expect(error)
        .toBe('An error has occurred.');
      expect(router.navigateByUrl)
        .toHaveBeenCalledTimes(1);
    }
  }));

  it('should reject get method with false optional params', inject([ApiService, Router], async (service: ApiService, router: Router) => {
    // Arrange
    spyOn(router, 'navigateByUrl').and
      .callThrough();
    const prom = service.get(uri, false, false);
    httpMock.expectOne(fullUri)
      .error(new ErrorEvent('Bad Request'), { status: 400, statusText: 'Bad Request' });

    // Act
    try {
      await prom;
      fail('unwanted promise resolution');
    }
    // Assert
    catch (error) {
      expect(error)
        .toBe('An error has occurred.');
      expect(router.navigateByUrl)
        .toHaveBeenCalledTimes(0);
    }
  }));

  it('should call post method', inject([ApiService], async (service: ApiService) => {
    let res: any;
    let prom = service.post(uri, content);
    let req = httpMock.expectOne(fullUri);
    req.flush({ data: 'value' });
    res = await prom;
    expect(res.data)
      .toEqual('value');

    prom = service.post(uri, content, false);
    req = httpMock.expectOne(fullUri);
    req.flush({ data: 'value' });
    res = await prom;
    expect(res.data)
      .toEqual('value');
  }));

  it('should reject post method', inject([ApiService, Router], async (service: ApiService, router: Router) => {
    // Arrange
    spyOn(router, 'navigateByUrl').and
      .callThrough();
    const prom = service.post(uri, content);
    httpMock.expectOne(fullUri)
      .error(new ErrorEvent('Bad Request'), { status: 400, statusText: 'Bad Request' });

    // Act
    try {
      await prom;
      fail('unwanted promise resolution');
    }
    // Assert
    catch (error) {
      expect(error)
        .toBe('An error has occurred.');
      expect(router.navigateByUrl)
        .toHaveBeenCalledTimes(1);
    }
  }));

  it('should reject post method with false optional params', inject([ApiService, Router], async (service: ApiService, router: Router) => {
    // Arrange
    spyOn(router, 'navigateByUrl').and
      .callThrough();
    const prom = service.post(uri, content, false);
    httpMock.expectOne(fullUri)
      .error(new ErrorEvent('Bad Request'), { status: 400, statusText: 'Bad Request' });

    // Act
    try {
      await prom;
      fail('unwanted promise resolution');
    }
    // Assert
    catch (error) {
      expect(error)
        .toBe('An error has occurred.');
      expect(router.navigateByUrl)
        .toHaveBeenCalledTimes(0);
    }
  }));

  it('should call put method', inject([ApiService], async (service: ApiService) => {
    let res: any;
    let prom = service.put(uri, content);
    let req = httpMock.expectOne(fullUri);
    req.flush({ data: 'value' });
    res = await prom;
    expect(res.data)
      .toEqual('value');

    prom = service.put(uri, content, false);
    req = httpMock.expectOne(fullUri);
    req.flush({ data: 'value' });
    res = await prom;
    expect(res.data)
      .toEqual('value');
  }));

  it('should reject put method', inject([ApiService, Router], async (service: ApiService, router: Router) => {
    // Arrange
    spyOn(router, 'navigateByUrl').and
      .callThrough();
    const prom = service.put(uri, content);
    httpMock.expectOne(fullUri)
      .error(new ErrorEvent('Bad Request'), { status: 400, statusText: 'Bad Request' });

    // Act
    try {
      await prom;
      fail('unwanted promise resolution');
    }
    // Assert
    catch (error) {
      expect(error)
        .toBe('An error has occurred.');
      expect(router.navigateByUrl)
        .toHaveBeenCalledTimes(1);
    }
  }));

  it('should reject put method with false optional params', inject([ApiService, Router], async (service: ApiService, router: Router) => {
    // Arrange
    spyOn(router, 'navigateByUrl').and
      .callThrough();
    const prom = service.put(uri, content, false);
    httpMock.expectOne(fullUri)
      .error(new ErrorEvent('Bad Request'), { status: 400, statusText: 'Bad Request' });

    // Act
    try {
      await prom;
      fail('unwanted promise resolution');
    }
    // Assert
    catch (error) {
      expect(error)
        .toBe('An error has occurred.');
      expect(router.navigateByUrl)
        .toHaveBeenCalledTimes(0);
    }
  }));

  it('should call delete method', inject([ApiService], async (service: ApiService) => {
    let res: any;
    let prom = service.delete(uri, content);
    let req = httpMock.expectOne(fullUri);
    req.flush({ data: 'value' });
    res = await prom;
    expect(res.data)
      .toEqual('value');

    prom = service.delete(uri, content, false);
    req = httpMock.expectOne(fullUri);
    req.flush({ data: 'value' });
    res = await prom;
    expect(res.data)
      .toEqual('value');
  }));

  it('should reject delete method', inject([ApiService, Router], async (service: ApiService, router: Router) => {
    // Arrange
    spyOn(router, 'navigateByUrl').and
      .callThrough();
    const prom = service.delete(uri, content);
    httpMock.expectOne(fullUri)
      .error(new ErrorEvent('Bad Request'), { status: 400, statusText: 'Bad Request' });

    // Act
    try {
      await prom;
      fail('unwanted promise resolution');
    }
    // Assert
    catch (error) {
      expect(error)
        .toBe('An error has occurred.');
      expect(router.navigateByUrl)
        .toHaveBeenCalledTimes(1);
    }
  }));

  it('should reject delete method with false optional params', inject([ApiService, Router], async (service: ApiService, router: Router) => {
    // Arrange
    spyOn(router, 'navigateByUrl').and
      .callThrough();
    const prom = service.delete(uri, content, false);
    httpMock.expectOne(fullUri)
      .error(new ErrorEvent('Bad Request'), { status: 400, statusText: 'Bad Request' });

    // Act
    try {
      await prom;
      fail('unwanted promise resolution');
    }
    // Assert
    catch (error) {
      expect(error)
        .toBe('An error has occurred.');
      expect(router.navigateByUrl)
        .toHaveBeenCalledTimes(0);
    }
  }));

});
