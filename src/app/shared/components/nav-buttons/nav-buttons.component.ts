import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

/** The nav buttons component */
@Component({
  selector: 'nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.css']
})
export class NavButtonsComponent implements OnInit {

  /** Before nav next event */
  @Output()
  public beforeNavNext: EventEmitter<void> = new EventEmitter<void>();

  /** Before the nav back event */
  @Output()
  public beforeNavBack: EventEmitter<void> = new EventEmitter<void>();

  /** The parent form to validate going next or not */
  @Input()
  public parentForm: FormGroup = new FormGroup({});

  /** Flag to disable next navigation */ 
  @Input()
  public disableNext: boolean = false;

  /** Constructs the component */
  constructor() { }

  /** Angular life cycle hook for component initialization */
  public ngOnInit(): void { }

  /** Navigates to the next page */
  public next(): void {
    this.beforeNavNext.emit();
    // TODO: nav next function here
  }

  /** Navigates to the previous page */
  public back(): void {
    this.beforeNavBack.emit();
    // TODO: nav back function
  }

}
