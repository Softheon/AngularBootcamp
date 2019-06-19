import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Numbers only directive
 */
@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

  /** True if only numbers allowed */
  @Input() public numbersOnly: boolean;

  /** The array of allowed keys */
  private allowedKeys: Array<string> = ['backspace', 'delete', 'tab', 'escape', 'enter', 'period', 'numpaddecimal'];

  /**
   * Constructs the directive
   * @param el The element
   */
  constructor(private el: ElementRef) { }

  /**
   * Only allows number inputs
   * @param event Key Event
   */
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e: KeyboardEvent = event;

    if (this.numbersOnly) {
      if (this.allowedKeys.indexOf(e.code.toLowerCase()) !== -1 ||
        // Allow: Ctrl+A
        (e.code.toLowerCase() === 'keya' && e.ctrlKey) ||
        // Allow: Ctrl+C
        (e.code.toLowerCase() === 'keyc' && e.ctrlKey) ||
        // Allow: Ctrl+X
        (e.code.toLowerCase() === 'keyx' && e.ctrlKey) ||
        // Allow: spaces
        (e.code.toLowerCase() === 'space') ||
        // Allow: - (minus sign) on numpad or alphabet keyboard key
        (e.code.toLowerCase() === 'minus' || e.code.toLowerCase() === 'numpadsubtract')) {
        // let it happen, don't do anything
        return;
      }

      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || e.code.toLowerCase()
        .match(/key[a-zA-Z]/g))) {
        e.preventDefault();
      }
    }
  }

}