import { ElementRef } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { AlertService } from './alert.service';

/** Mock Element Ref Class */
export class MockElementRef extends ElementRef {
  nativeElement = {
    querySelectorAll(): any {
      return Array<Node>();
    }
  };
  constructor() { super(undefined); }
}

// Valid Form Controls
const validFormControl = new FormControl('');

// Invalid Form Control
const invalidFormControl = new FormControl('', [Validators.required]);

// Valid Form Array with Form Controls
const validFormArrayWithFormControls = new FormArray([validFormControl, validFormControl]);

// Invalid Form Array with Form Controls
const invalidFormArrayWithFormControls = new FormArray([validFormControl, invalidFormControl]);

// Valid Form Group with Form Controls
const validFormGroupWithFormControls = new FormGroup({ validFormControl });

// Invalid Form Group with Form Controls
const invalidFormGroupWithFormControls = new FormGroup({ validFormControl, invalidFormControl });

// Invalid Form Array with Form Groups
const invalidFormArrayWithFormGroups = new FormArray([validFormGroupWithFormControls, invalidFormGroupWithFormControls]);

// Valid Form Group with Form Array
const validFormGroupWithFormGroup = new FormGroup({ validFormGroupWithFormControls });

// Invalid Form Group with Form Array
const invalidFormGroupWithFormGroup = new FormGroup({ invalidFormGroupWithFormControls });

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        FormBuilder,
        { provide: ElementRef, useClass: MockElementRef }
      ],
      imports: [
        MatSnackBarModule,
        TranslateModule.forRoot(),
      ]
    });
  });

  it('should be created', () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service)
      .toBeTruthy();
  });

  it('should open a custom snackbar with an error message (duration set)', inject([AlertService], (service: AlertService) => {
    // Arrange
    spyOn(service.snackBar, 'open');

    // Act
    service.openCustomSnackBarAlert('error.allFieldsRequired', 3000)

    // Assert
    expect(service.snackBar.open)
      .toHaveBeenCalledTimes(1);
  }));

  it('should open a custom snackbar with an error message (duration not set)', inject([AlertService], (service: AlertService) => {
    // Arrange
    spyOn(service.snackBar, 'open');

    // Act
    service.openCustomSnackBarAlert('error.allFieldsRequired')

    // Assert
    expect(service.snackBar.open)
      .toHaveBeenCalledTimes(1);
  }));

  it('should get error message for an invalid Form Control when first control is invalid', inject([AlertService, FormBuilder, ElementRef], (service: AlertService, formBuilder: FormBuilder, el: ElementRef) => {
    // Arrange
    spyOn(service, 'openCustomSnackBarAlert');

    const formGroup = formBuilder.group({
      formControl: invalidFormControl
    });

    // Act
    service.openFormInvalidSnackBarAlert(formGroup, el);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledTimes(1);
  }));

  it('should get error message for an invalid Form Control when control after first is invalid', inject([AlertService, FormBuilder, ElementRef], (service: AlertService, formBuilder: FormBuilder, el: ElementRef) => {
    // Arrange
    spyOn(service, 'openCustomSnackBarAlert');

    const formGroup = formBuilder.group({
      formControl1: validFormControl,
      formControl2: invalidFormControl
    });

    // Act
    service.openFormInvalidSnackBarAlert(formGroup, el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledTimes(1);
  }));

  it('should get error message for an invalid Form Array when first array is invalid', inject([AlertService, FormBuilder, ElementRef], (service: AlertService, formBuilder: FormBuilder, el: ElementRef) => {
    // Arrange
    spyOn(service, 'openCustomSnackBarAlert');

    const formGroup = formBuilder.group({
      formArray: invalidFormArrayWithFormControls
    });

    // Act
    service.openFormInvalidSnackBarAlert(formGroup, el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledTimes(1);
  }));

  it('should get error message for an invalid Form Array when array after the first is invalid', inject([AlertService, FormBuilder, ElementRef], (service: AlertService, formBuilder: FormBuilder, el: ElementRef) => {
    // Arrange
    spyOn(service, 'openCustomSnackBarAlert');

    const formGroup = formBuilder.group({
      formArray1: validFormArrayWithFormControls,
      formArray2: invalidFormArrayWithFormGroups
    });

    // Act
    service.openFormInvalidSnackBarAlert(formGroup, el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledTimes(1);
  }));

  it('should get error message for an invalid Form Group when the first group is invalid', inject([AlertService, FormBuilder, ElementRef], (service: AlertService, formBuilder: FormBuilder, el: ElementRef) => {
    // Arrange
    spyOn(service, 'openCustomSnackBarAlert');

    const formGroup = formBuilder.group({
      innerFormGroup: invalidFormGroupWithFormControls
    });

    // Act
    service.openFormInvalidSnackBarAlert(formGroup, el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledTimes(1);
  }));

  it('should get error message for an invalid Form Group when group after first is invalid', inject([AlertService, FormBuilder, ElementRef], (service: AlertService, formBuilder: FormBuilder, el: ElementRef) => {
    // Arrange
    spyOn(service, 'openCustomSnackBarAlert');

    const formGroup = formBuilder.group({
      innerFormGroup: validFormGroupWithFormGroup,
      innerFormGroup2: invalidFormGroupWithFormGroup
    });

    // Act
    service.openFormInvalidSnackBarAlert(formGroup, el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledTimes(1);
  }));

  it('should get required error message', inject([AlertService, ElementRef], (service: AlertService, el: ElementRef) => {
    // Arrange
    const requiredFormControl = new FormControl('', [Validators.required]);
    spyOn(service, 'openCustomSnackBarAlert');

    // Act
    service.getErrorMessage(requiredFormControl, 'field', el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledWith('error.requiredError', 3000);
  }));

  it('should get max length error message', inject([AlertService, ElementRef], (service: AlertService, el: ElementRef) => {
    // Arrange
    const requiredFormControl = new FormControl("12345", [Validators.maxLength(4)]);
    spyOn(service, 'openCustomSnackBarAlert');

    // Act
    service.getErrorMessage(requiredFormControl, 'field', el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledWith('error.maxLengthError', 3000);
  }));

  it('should get min length error message', inject([AlertService, ElementRef], (service: AlertService, el: ElementRef) => {
    // Arrange
    const requiredFormControl = new FormControl("123", [Validators.minLength(4)]);
    spyOn(service, 'openCustomSnackBarAlert');

    // Act
    service.getErrorMessage(requiredFormControl, 'field', el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledWith('error.minLengthError', 3000);
  }));

  it('should get email error message', inject([AlertService, ElementRef], (service: AlertService, el: ElementRef) => {
    // Arrange
    const requiredFormControl = new FormControl("123", [Validators.email]);
    spyOn(service, 'openCustomSnackBarAlert');

    // Act
    service.getErrorMessage(requiredFormControl, 'field', el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledWith('error.formatError', 3000);
  }));

  it('should get pattern error message', inject([AlertService, ElementRef], (service: AlertService, el: ElementRef) => {
    // Arrange
    const requiredFormControl = new FormControl("abc", [Validators.pattern(/^[0-9]*$/g)]);
    spyOn(service, 'openCustomSnackBarAlert');

    // Act
    service.getErrorMessage(requiredFormControl, 'field', el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledWith('error.formatError', 3000);
  }));

  it('should get default error message', inject([AlertService, ElementRef], (service: AlertService, el: ElementRef) => {
    // Arrange
    const requiredFormControl = new FormControl(4, [Validators.max(3)]);
    spyOn(el.nativeElement, 'querySelectorAll').and
      .returnValue([{ focus: () => undefined }]);
    spyOn(service, 'openCustomSnackBarAlert');

    // Act
    service.getErrorMessage(requiredFormControl, 'field', el, 3000);

    // Assert
    expect(service.openCustomSnackBarAlert)
      .toHaveBeenCalledWith('error.allFieldsRequired', 3000);
  }));

});
