import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-product2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product2.component.html',
  styleUrl: './product2.component.css',
})
export class Product2Component {
  product = input.required<Product>();
}
