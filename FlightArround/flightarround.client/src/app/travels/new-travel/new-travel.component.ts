import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CountryService } from '../../country/country.service';
import { type Country } from '../../country/country.model';
import { ErrorComponentComponent } from '../../shared/error-component/error-component.component';
import { Time } from '@angular/common';
import { TravelsService } from '../travels.service';
import { type Travel } from '../travel.model';
import { SuccessComponentComponent } from '../../shared/success-component/success-component.component';

@Component({
  selector: 'app-new-travel',
  standalone: true,
  imports: [
    ErrorComponentComponent,
    ReactiveFormsModule,
    SuccessComponentComponent,
  ],
  templateUrl: './new-travel.component.html',
  styleUrl: './new-travel.component.css',
})
export class NewTravelComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private countriesService = inject(CountryService);
  private traveslService = inject(TravelsService);

  countries = signal<Country[]>([]);
  error = signal<string>('');
  msg = signal<string>('');

  choosedCountry = signal<Country | null>(null);
  getCountries = computed(() =>
    this.countries().flatMap((country) =>
      country.cities.map((city) => ({
        key: city.id,
        value: `${country.name} -> ${city.name}`,
      }))
    )
  );

  ngOnInit(): void {
    const subscription = this.countriesService.GetCountries().subscribe({
      next: (x) => {
        this.countries.set(x);
        console.log(this.getCountries());
      },
      error: (er) => {
        this.error.set(er.message);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  form = signal<FormGroup>(
    new FormGroup({
      fromCity: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      toCity: new FormControl('', {
        validators: [Validators.required],
      }),
      travelDate: new FormControl<Date | null>(null, {
        validators: [Validators.required],
      }),
      travelTime: new FormControl<Time | null>(null, {
        validators: [Validators.required],
      }),
      arriveTime: new FormControl<Time | null>(null, {
        validators: [Validators.required],
      }),
      availableSeats: new FormControl<number>(200, {
        validators: [Validators.required],
      }),
      price: new FormControl<number>(1000, {
        validators: [Validators.required],
      }),
    })
  );

  formSubmit() {
    if (!this.form().valid) {
      this.form().markAllAsTouched();
      return;
    }

    var _travelDate = new Date(
      this.form().controls['travelDate'].value
    ).toISOString();
    var _travelTime = new Date(
      this.form().controls['travelDate'].value +
        'T' +
        this.form().controls['travelTime'].value
    ).toISOString();
    var _arriveTime = new Date(
      this.form().controls['travelDate'].value +
        'T' +
        this.form().controls['arriveTime'].value
    ).toISOString();

    var travel: Travel = {
      id: null,
      fromId: this.form().controls['fromCity'].value,
      toId: this.form().controls['toCity'].value,
      travelDate: _travelTime,
      travelTime: _travelTime,
      arriveTime: _arriveTime,
      availableSeats: this.form().controls['availableSeats'].value,
      price: this.form().controls['price'].value,
      fromCity: null,
      fromCountry: null,
      toCity: null,
      toCountry: null,
    };

    var sub = this.traveslService.AddTravel(travel).subscribe({
      next: () => {
        this.msg.set('Travel added successfully');
        this.error.set('');
      },
      error: (err) => {
        this.error.set(err.error);
        this.msg.set('');
      },
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
