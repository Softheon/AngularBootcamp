import { ElementRef } from '@angular/core';

import { NumbersOnlyDirective } from './numbers-only.directive';

describe('NumbersOnlyDirective', () => {

  const el: ElementRef = new ElementRef('test');

  it('should create an instance', () => {
    const directive = new NumbersOnlyDirective(el);
    expect(directive)
      .toBeTruthy();
  });

  it('should allow unknown key', () => {
    // Arrange
    const directive =  new NumbersOnlyDirective(el);
    directive.numbersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'jibberish', key: 'unknown' });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(0);
  });

  it('should send keydown event and allow ctrl a', () => {
    // Arrange
    const directive =  new NumbersOnlyDirective(el);
    directive.numbersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'KeyA', key: 'a', ctrlKey: true });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(0);
  });

  it('should send keydown event and allow ctrl x', () => {
    // Arrange
    const directive =  new NumbersOnlyDirective(el);
    directive.numbersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'KeyX', key: 'x', ctrlKey: true });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(0);
  });

  it('should send keydown event and allow ctrl c', () => {
    // Arrange
    const directive =  new NumbersOnlyDirective(el);
    directive.numbersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'KeyC', key: 'c', ctrlKey: true });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(0);
  });

  it('should send keydown event and prevent letter', () => {
    // Arrange
    const directive =  new NumbersOnlyDirective(el);
    directive.numbersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'KeyQ', key: 'q' });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(1);
  });

  it('should send keydown event and prevent shift', () => {
    // Arrange
    const directive =  new NumbersOnlyDirective(el);
    directive.numbersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'Digit8', key: '8', shiftKey: true });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(1);
  });

  it('should skip logic when numberOnly is false', () => {
    // Arrange
    const directive =  new NumbersOnlyDirective(el);
    directive.numbersOnly = false;

    const event = new KeyboardEvent('keydown', { code: 'Digit8', key: '8', shiftKey: true });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(0);
  });

});
