import { Component, computed, DestroyRef, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
})
export class CityComponent {
  // private destroyRef = inject(DestroyRef);
  id = input<number>();
  cityControl = input.required<FormControl>();
  controlName = computed(() => {
    return 'cityName' + this.id();
  });

  cityName = new FormControl('', {
    validators: [Validators.required],
  });

  controlIsInvalid() {
    return this.cityControl().touched && this.cityControl().invalid;
  }
}
