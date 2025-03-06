import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Travel } from './travel.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TravelsService {
  constructor() {}

  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  AddTravel(travel: Travel) {
    this.authService.HandleAutoSignin();
    const header = this.authService.getRequestHeader();

    const trav = JSON.stringify(travel);
    const request = this.httpClient.post('/Travels', trav, {
      headers: header,
    });

    return request;
  }

  GetTravels() {
    this.authService.HandleAutoSignin();

    const request = this.httpClient.get<Travel[]>('/Travels');
    return request;
  }
}
