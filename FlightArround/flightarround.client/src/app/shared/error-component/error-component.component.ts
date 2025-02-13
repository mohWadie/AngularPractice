import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-component',
  standalone: true,
  imports: [],
  templateUrl: './error-component.component.html',
  styleUrl: './error-component.component.css',
})
export class ErrorComponentComponent {
  msg = input.required<string>();
}
