import { ElementRef } from '@angular/core';

import { LettersOnlyDirective } from './letters-only.directive';

describe('LettersOnlyDirective', () => {

  const el: ElementRef = new ElementRef('test');

  it('should create an instance', () => {
    const directive = new LettersOnlyDirective(el);
    expect(directive)
      .toBeTruthy();
  });

  it('should send keydown event and prevent default', () => {
    // Arrange
    const directive = new LettersOnlyDirective(el);
    directive.lettersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'Digit', key: '1' });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(1);
  });

  it('should send keydown event and allow ctrl a', () => {
    // Arrange
    const directive = new LettersOnlyDirective(el);
    directive.lettersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'KeyA', key: 'a', ctrlKey: true });
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
    const directive = new LettersOnlyDirective(el);
    directive.lettersOnly = true;

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
    const directive = new LettersOnlyDirective(el);
    directive.lettersOnly = true;

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
    const directive = new LettersOnlyDirective(el);
    directive.lettersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'KeyC', key: 'c', ctrlKey: true });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(0);
  });

  it('should prevent event on num pad press', () => {
    // Arrange
    const directive = new LettersOnlyDirective(el);
    directive.lettersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'NumPad1', key: '1' });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(1);
  });

  it('should skip logic when lettersOnly is false', () => {
    // Arrange
    const directive = new LettersOnlyDirective(el);
    directive.lettersOnly = false;

    const event = new KeyboardEvent('keydown', { code: 'NumPad1', key: '1' });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(0);
  });

  it('should allow unknown key', () => {
    // Arrange
    const directive = new LettersOnlyDirective(el);
    directive.lettersOnly = true;

    const event = new KeyboardEvent('keydown', { code: 'jibberish', key: 'unknown' });
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.onKeyDown(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(0);
  });

  it('should block paste', () => {
    // Arrange
    const directive = new LettersOnlyDirective(el);
    directive.lettersOnly = true;

    const event = new KeyboardEvent('paste');
    spyOn(event, 'preventDefault').and
      .callThrough();

    // Act
    directive.blockPaste(event);

    // Assert
    expect(event.preventDefault)
      .toHaveBeenCalledTimes(1);
  });

});
