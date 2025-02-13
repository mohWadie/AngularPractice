import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CountryComponent } from './country/country.component';
export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'countries',
    component: CountryComponent,
  },
  // {
  //   path: 'products',
  //   component: ProductsListComponent,
  //   canActivate: [authGuard],
  // },
  // {
  //   path: 'products2',
  //   component: ProductsList2Component,
  //   canActivate: [authGuard],
  // },
];
