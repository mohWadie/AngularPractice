import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsList2Component } from './products-list2/products-list2.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: 'products',
    component: ProductsListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'products2',
    component: ProductsList2Component,
    canActivate: [authGuard],
  },
];
