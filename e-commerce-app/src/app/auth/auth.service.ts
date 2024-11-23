import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { ErrorService } from '../shared/error.service';
import { catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);
  private user = signal<User | null>(null);
  isLoggedIn = computed<boolean>(() => this.user() !== null);

  private authApiKey = 'AIzaSyBpbjs5yXpWWDDluxijdMuC7075iVjUjSk';
  constructor() {}

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (userData) this.user.set(JSON.parse(userData));
  }

  signup(email: string | null, password: string | null) {
    return this.httpClient
      .post<User>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.authApiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          this.errorService.showError('Invalid email.');
          return throwError(() => new Error('Invalid email'));
        })
      );
    // console.log(user);
  }

  signin(email: string | null, password: string | null) {
    return this.httpClient
      .post<User>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.authApiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          this.errorService.showError('Invalid email or password');
          return throwError(() => new Error('Invalid email or password'));
        })
      );
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('userData');
  }

  setUser(user: User) {
    this.user.set(user);
    localStorage.setItem('userData', JSON.stringify(this.user()));
  }
}
