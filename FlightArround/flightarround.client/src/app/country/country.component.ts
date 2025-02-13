import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CityComponent } from '../city/city.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Country } from './country.model';
import { CountryService } from './country.service';
import { ErrorComponentComponent } from '../shared/error-component/error-component.component';
import { SuccessComponentComponent } from '../shared/success-component/success-component.component';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CityComponent,
    ErrorComponentComponent,
    SuccessComponentComponent,
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css',
})
export class CountryComponent {
  private destroyRef = inject(DestroyRef);
  private countryService = inject(CountryService);
  error = signal('');
  msg = signal('');

  form = new FormGroup({
    countryName: new FormControl('', {
      validators: [Validators.required],
    }),
    cities: new FormArray([]),
  });

  get getCities(): FormControl[] {
    return <FormControl[]>(<FormArray>this.form.get('cities')).controls;
  }

  countryNameIsInvalid() {
    return (
      this.form.controls.countryName.touched &&
      this.form.controls.countryName.invalid
    );
  }

  addCity() {
    var con = new FormControl('', {
      validators: [Validators.required],
    });

    (<FormArray>this.form.get('cities')).push(con);
  }

  onSubmit() {
    if (this.form.valid) {
      var c = this.form.controls.cities.controls.map((x: FormControl) => {
        return {
          id: '00000000-0000-0000-0000-000000000000',
          name: x.value,
        };
      });

      var ctry: Country = {
        id: '00000000-0000-0000-0000-000000000000',
        name: this.form.controls.countryName.value!,
        cities: c,
      };

      const sub = this.countryService.CreateCountry(ctry).subscribe({
        next: (x) => {
          this.msg.set('Country created successfuly');
          this.error.set('');
        },
        error: (err: HttpResponse<object>) => {
          if (err.status === 409) {
            this.error.set('Country already exists');
            this.msg.set('');
          }
        },
      });

      this.destroyRef.onDestroy(() => {
        sub.unsubscribe();
      });
    } else {
      this.form.controls.countryName.markAsTouched();
      this.form.controls.cities.markAllAsTouched();
    }
  }
}
