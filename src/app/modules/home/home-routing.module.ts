import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

/**
 * Base Application Routes
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

/**
 * Base Application Routing Module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
