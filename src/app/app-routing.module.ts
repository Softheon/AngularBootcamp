import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Base Application Routes
 */
const routes: Routes = [
  {
    // Empty string will redirect to /home
    path: '',
    redirectTo: '/home',
    pathMatch: 'prefix'
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'error',
    loadChildren: './modules/error/error.module#ErrorModule'
  }
];

/**
 * Base Application Routing Module
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
