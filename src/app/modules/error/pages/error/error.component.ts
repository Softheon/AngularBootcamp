import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Error } from '../../models/error';

/**
 * Error component. Used to display an error page for 404s and 500s
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  /**
   * The error model
   */
  public error: Error;

  /**
   * List of all error models
   */
  private errors: Error[];

  /**
   * Constructs the component
   * @param route The activated route
   */
  constructor(private route: ActivatedRoute) {}

  /**
   * Initializes the component
   */
  public ngOnInit(): void {
    this.errors = new Array<Error>();

    const internalServerError = new Error();
    internalServerError.statusCode = 500;
    internalServerError.description = 'Internal Server Error.';
    internalServerError.message = 'The server encountered an error and could not complete your request. Please contact customer support or try again later.';

    const pageNotFoundError = new Error();
    pageNotFoundError.statusCode = 404;
    pageNotFoundError.description = 'Page Not Found.';
    pageNotFoundError.message = 'The request URL was not found.';

    this.errors.push(internalServerError, pageNotFoundError);

    const statusCode = +this.route.snapshot.paramMap.get('statusCode');

    const index = this.errors.findIndex(x => {
        return x.statusCode === statusCode;
      }
    );

    if (index !== -1) {
      this.error = this.errors[index];
    } else {
      this.error = this.errors[0];
    }
  }

}
