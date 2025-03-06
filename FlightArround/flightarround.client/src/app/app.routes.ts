import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CountryComponent } from './country/country.component';
import { CountriesListComponent } from './country/countries-list/countries-list.component';
import { NewTravelComponent } from './travels/new-travel/new-travel.component';
import { TravelsListComponent } from './travels/travels-list/travels-list.component';
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
    component: CountriesListComponent,
  },
  {
    path: 'countries/new',
    component: CountryComponent,
  },
  {
    path: 'travels/new',
    component: NewTravelComponent,
  },
  {
    path: 'travels',
    component: TravelsListComponent,
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
