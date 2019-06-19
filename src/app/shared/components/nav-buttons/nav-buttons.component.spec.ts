import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { NavButtonsComponent } from './nav-buttons.component';

describe('NavButtonsComponent', () => {
  let component: NavButtonsComponent;
  let fixture: ComponentFixture<NavButtonsComponent>;

  // The mock nav service
  let navServiceStub: {
    navigateNext(): void,
    navigateBack(): void
  };

  beforeEach(async(() => {
    navServiceStub = {
      navigateNext(): void {
        return;
      },
      navigateBack(): void {
        return;
      }
    };
    TestBed.configureTestingModule({
      declarations: [NavButtonsComponent],
      imports: [
        TranslateModule.forRoot()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should call before next emit and navigate next', () => {
    // Arrange
    spyOn(component.beforeNavNext, 'emit');

    // Act
    component.next();

    // Assert
    expect(component.beforeNavNext.emit)
      .toHaveBeenCalled();
  });

  it('should call before back event emit and navigate back', () => {
    // Arrange
    spyOn(component.beforeNavBack, 'emit');

    // Act
    component.back();

    // Assert
    expect(component.beforeNavBack.emit)
      .toHaveBeenCalled();
  });

  it('should not navigate next when the form is invalid', () => {
    // Arrange
    spyOn(component.beforeNavNext, 'emit');

    component.parentForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });

    // Act
    component.next();

    // Assert
    expect(component.beforeNavNext.emit).toHaveBeenCalled();
  });
});
