import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe that takes a simple string phone number and formats it
 */
@Pipe({name: 'phone'})
export class PhoneFormatPipe implements PipeTransform {
  transform(phoneNumber: string): string {

    // If input is undefined, then return empty string
    if (!phoneNumber) {
      return '';
    }

    // Check for more than 10 digits
    let formattedPhoneNumber = ('' + phoneNumber).replace(/\D/g, '');
    if (formattedPhoneNumber.length > 10){
      return '';
    }

    // Check for correct pattern
    let formattedPhoneArray = formattedPhoneNumber.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (!!formattedPhoneArray) {
      return ['(', formattedPhoneArray[2], ') ', formattedPhoneArray[3], '-', formattedPhoneArray[4]].join('');
    } else {
      return '';
    }
  }
}