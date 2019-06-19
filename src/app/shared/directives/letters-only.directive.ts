import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * The letters only directive
 */
@Directive({
  selector: '[lettersOnly]'
})
export class LettersOnlyDirective {

  /** True if only letters allowed */
  @Input() public lettersOnly: boolean;

  /** The array of allowed keys */
  private allowedKeys: Array<string> = ['backspace', 'delete', 'tab', 'escape', 'enter', 'period', 'numpaddecimal'];

  /**
   * Constructs the directive
   * @param el The element
   */
  constructor(private el: ElementRef) { }

  /**
   * Only allows letter inputs
   * @param event Key Event
   */
  @HostListener('keydown', ['$event']) onKeyDown(event): void {
    const e = event as KeyboardEvent;
    console.log(e);
    if (this.lettersOnly) {
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
      // Ensure that it is a letter and stop the keypress if its not a letter
      if (e.code.toLowerCase()
        .includes('digit')
        || e.code.toLowerCase()
          .includes('numpad')) {
        e.preventDefault();
      }
    }
  }

  /**
   * Prevent copy pasted inputs
   * @param event the event
   */
  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent): void {
    event.preventDefault();
  }

}
