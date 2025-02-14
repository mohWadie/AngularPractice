import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from './user.model';
import { StorageServiceService } from '../shared/storage-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private httpClient = inject(HttpClient);
  private loggedUser = signal<User | null>(null);
  private storageService = inject(StorageServiceService);
  private router = inject(Router);

  Signin(email: string, password: string) {
    return this.httpClient.post<User>('/auth/Signin', {
      userName: email,
      password: password,
    });
  }

  SetUserInfo(user: User, writeData: boolean) {
    this.loggedUser.set(user);
    if (writeData)
      this.storageService.writeData('userData', this.getUserInfo());
  }

  getUserInfo() {
    if (!this.loggedUser()) {
      let userD = this.storageService.readData('userData', true);
      if (userD) {
        this.SetUserInfo(userD, false);
      }
    }

    return this.loggedUser();
  }

  isTokenExpired() {
    const token = this.getUserInfo()?.token;
    if (token) {
      const expiry = JSON.parse(atob(token.split('.')[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    } else return true;
  }

  HandleAutoSignin() {
    if (this.isTokenExpired()) {
      this.router.navigate(['/signin'], {
        replaceUrl: true,
      });
    }
  }
}
