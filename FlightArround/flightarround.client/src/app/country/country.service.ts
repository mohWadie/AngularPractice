import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Country } from './country.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor() {}

  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);

  CreateCountry(country: Country) {
    if (this.authService.isTokenExpired()) {
      this.router.navigate(['/signin'], {
        replaceUrl: true,
      });
    }

    const header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + this.authService.getUserInfo()?.token!,
    });

    const ctry = JSON.stringify(country);

    const request = this.httpClient.post<Country>('/Countries/Create', ctry, {
      headers: header,
    });

    return request;
  }
}
