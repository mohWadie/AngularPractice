import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  products = signal<Product[] | null>(null);
  private productsService = inject(ProductService);
  private distroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.productsService.getProducts().subscribe({
      next: (prods) => this.products.set(prods),
    });
  }
}
