import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Country } from './country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor() {}

  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  CreateCountry(country: Country) {
    this.authService.HandleAutoSignin();

    const header = this.authService.getRequestHeader();

    const ctry = JSON.stringify(country);

    const request = this.httpClient.post<Country>('/Countries/Create', ctry, {
      headers: header,
    });

    return request;
  }

  GetCountries() {
    this.authService.HandleAutoSignin();

    const header = this.authService.getRequestHeader();

    return this.httpClient.get<Country[]>('/Countries/AllCountries', {
      headers: header,
    });
  }
}
