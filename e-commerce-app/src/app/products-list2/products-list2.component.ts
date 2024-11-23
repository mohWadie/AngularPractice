import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';
import { ProductComponent } from '../product/product.component';
import { Product2Component } from '../product2/product2.component';

@Component({
  selector: 'app-products-list2',
  standalone: true,
  imports: [Product2Component],
  templateUrl: './products-list2.component.html',
  styleUrl: './products-list2.component.css',
})
export class ProductsList2Component implements OnInit {
  products = signal<Product[] | null>(null);
  private productsService = inject(ProductService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.productsService.getProducts().subscribe({
      next: (prods) => this.products.set(prods),
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
