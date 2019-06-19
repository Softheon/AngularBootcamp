import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  let activatedRouteStub: {
    snapshot: {
      paramMap: { get(): string }
    }
  }

  beforeEach(async(() => {
    activatedRouteStub = {
      snapshot: {
        paramMap: {
          get(): string {
            return '123';
          }
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should create with a 404 error', () => {
    // Arrange
    const activatedRoute: ActivatedRoute = TestBed.get(ActivatedRoute);
    spyOn(activatedRoute.snapshot.paramMap, 'get').and
      .returnValue('404');

    // Act
    component.ngOnInit();

    // Assert
    expect(component.error.statusCode)
      .toBe(404);
  });
});
