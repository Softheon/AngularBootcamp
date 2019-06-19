import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './pages/error/error.component';

/**
 * Base Application Routes
 */
const routes: Routes = [
  {
    path: ':statusCode',
    component: ErrorComponent
  },
  {
    // This will handle any URL that does not match an expected URL
    path: '**',
    redirectTo: '404'
  }
];

/**
 * Base Application Routing Module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
