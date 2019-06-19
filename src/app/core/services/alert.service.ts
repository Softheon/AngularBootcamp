import { ElementRef, Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../../shared/constants/constants';

/**
 * Service to handle error alerts
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  /** the translation ket for close text */
  public readonly closeTextKey: string = 'common.dismiss';

  /**
   * The constructor
   * @param snackBar the angular material snackbar
   * @param translateService the translate service
   */
  constructor(
    public snackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  /**
   * Opens a generic snack bar alert
   * @param detailsTextKey text to show in the alert
   * @param durationLength how long the alert should be shown before it fades
   */
  public openCustomSnackBarAlert(detailsTextKey: string, params: any = {}, durationLength: number = 3000): void {

    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = durationLength;
    snackBarConfig.panelClass = ['red-snackbar'];

    this.snackBar.open(this.translateService.instant(detailsTextKey, params), this.translateService.instant(this.closeTextKey), snackBarConfig);
  }

  /**
   * Opens an alert with a the specific form validation error
   * @param form the form to validate
   * @param el the element reference from the forms page, used to set focus on invalid form
   * @param durationLength how long the alert should be shown before it fades
   */
  public openFormInvalidSnackBarAlert(form: FormGroup, el: ElementRef, durationLength: number = 5000): void {
    this.getWhatIsNotFilledOut(form, el, durationLength);
  }

  /**
   * Iterates through a form (form group/form array) recursively to get the individual form control that is invalid
   * @param form the form to validate
   * @param el the element reference from the forms page, used to set focus on invalid form
   * @param durationLength how long the alert should be shown before it fades
   */
  public getWhatIsNotFilledOut(form: FormGroup, el: ElementRef, durationLength: number): string {
    for (let field in form.controls) {
      let control = form.get(field);
      if (!control.invalid) {
        continue;
      }
      if (control instanceof FormArray) {
        for (let formArrayField in control.controls) {
          let formArrayControl = control.get(formArrayField);
          if (!formArrayControl.invalid) {
            continue;
          }
          if (formArrayControl instanceof FormGroup) {
            return this.getWhatIsNotFilledOut(formArrayControl, el, durationLength)
          }
          else {
            return this.getErrorMessage(formArrayControl, formArrayField, el, durationLength);
          }
        }
      }
      else if (control instanceof FormGroup) {
        for (let formGroupField in control.controls) {
          let formGroupControl = control.get(formGroupField);
          if (!formGroupControl.invalid) {
            continue;
          }
          if (formGroupControl instanceof FormGroup) {
            return this.getWhatIsNotFilledOut(formGroupControl, el, durationLength)
          }
          else {
            return this.getErrorMessage(formGroupControl, formGroupField, el, durationLength);
          }
        }
      }
      else {
        return this.getErrorMessage(control, field, el, durationLength);
      }
    }
  }

  /**
   * Gets the error message based on the form control that is invalid
   * @param control the invalid form control
   * @param field the field name that is invalid
   * @param el the element reference from the forms page, used to set focus on invalid form
   * @param durationLength how long the alert should be shown before it fades
   */
  public getErrorMessage(control: AbstractControl, field: string, el: ElementRef, durationLength: number): string {
    let errorText = '';
    const error = control.errors;
    const errorKey = Object.keys(control.errors)[0]; // will only ever be one at a time even if multiple validation errors

    const formattedFieldText = this.getFieldFormattedText(field);
    switch (errorKey) {
      case Constants.validationKeys.required: {
        errorText = this.translateService.instant('error.requiredError', { 'fieldName': formattedFieldText });
        break;
      }
      case Constants.validationKeys.maxLength: {
        const errorValues = Object.values(error)[0];
        const requiredLength = Object.values(errorValues)[0];
        const actualValue = Object.values(errorValues)[1];
        errorText = this.translateService.instant('error.maxLengthError', { 'fieldName': formattedFieldText, 'actualValue': actualValue, 'requiredLength': requiredLength });
        break;
      }
      case Constants.validationKeys.minLength: {
        let errorValues = Object.values(error)[0];
        let requiredLength = Object.values(errorValues)[0];
        let actualValue = Object.values(errorValues)[1];
        errorText = this.translateService.instant('error.minLengthError', { 'fieldName': formattedFieldText, 'actualValue': actualValue, 'requiredLength': requiredLength });
        break;
      }
      case Constants.validationKeys.pattern:
      case Constants.validationKeys.maskError:
      case Constants.validationKeys.email: {
        errorText = this.translateService.instant('error.formatError', { 'fieldName': formattedFieldText });
        break;
      }
      default: {
        errorText = this.translateService.instant('error.allFieldsRequired');
        break;
      }
    }
    this.setFocusToFormControl(el);
    this.openCustomSnackBarAlert(errorText, durationLength);
    return;
  }

  /**
   * Formats the form control name to readable text to display to the user in an error alert
   * @param field The field
   */
  public getFieldFormattedText(field: string): string {
    let split = field.split(/(?=[A-Z])/); // splits a string by word
    let formattedFieldText = '';
    for (let i = 0; i < split.length; i++) {
      split[i] = split[i].charAt(0).toUpperCase() + split[i].substring(1);
      formattedFieldText += split[i] + ' ';
    }

    return formattedFieldText;
  }

  /**
   * Sets focus to the first invalid form control element
   * @param el Element to focus on
   */
  public setFocusToFormControl(el: ElementRef): void {
    // find all invalid controls and focus the first control found
    const invalidElements = el.nativeElement.querySelectorAll('input.ng-invalid, select.ng-invalid');
    if (invalidElements.length > 0) {
      invalidElements[0].focus(); // [0] will always be the form itself [1] will be the first control
    }

  }
}
