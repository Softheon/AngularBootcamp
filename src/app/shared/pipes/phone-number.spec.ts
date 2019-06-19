import { PhoneFormatPipe } from './phone-number';

describe('PhoneFormatPipe', () => {
    
    let phonePipe: PhoneFormatPipe;

    beforeEach(() => {
        phonePipe = new PhoneFormatPipe();
    });
  
    it('should be created', () => {
      expect(phonePipe).toBeTruthy();
    });

    it('should format a 10 digit string', () => {
        const mockPhone = "1112223333";
        let newPhone = phonePipe.transform(mockPhone);

        expect(newPhone).toEqual('(111) 222-3333');
    })

    it('should return an empty string on invalid input', () => {
        const empty = '';

        expect(phonePipe.transform('')).toEqual(empty);
        expect(phonePipe.transform('1234')).toEqual(empty);
        expect(phonePipe.transform('111111111123')).toEqual(empty);
        expect(phonePipe.transform(undefined)).toEqual(empty);
        expect(phonePipe.transform(null)).toEqual(empty);

    })

  });