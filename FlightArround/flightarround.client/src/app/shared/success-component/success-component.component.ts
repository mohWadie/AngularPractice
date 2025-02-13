import { Component, input } from '@angular/core';

@Component({
  selector: 'app-success-component',
  standalone: true,
  imports: [],
  templateUrl: './success-component.component.html',
  styleUrl: './success-component.component.css',
})
export class SuccessComponentComponent {
  msg = input.required<string>();
}
