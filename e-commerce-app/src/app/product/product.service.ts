import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './product.model';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  constructor() {}

  getProducts() {
    return this.httpClient
      .get<Product[]>('https://fakestoreapi.com/products')
      .pipe(
        catchError((error) => {
          console.log(error);
          this.errorService.showError('Invalid email.');
          return throwError(() => new Error('Invalid email'));
        })
      );
  }
}
