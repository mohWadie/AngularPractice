import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Country } from '../country.model';
import { CountryService } from '../country.service';
import { ErrorComponentComponent } from '../../shared/error-component/error-component.component';

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [ErrorComponentComponent],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.css',
})
export class CountriesListComponent implements OnInit {
  countries = signal<Country[] | null>(null);
  error = signal('');

  private destroyRef = inject(DestroyRef);
  private countryService = inject(CountryService);

  ngOnInit(): void {
    const subscription = this.countryService.GetCountries().subscribe({
      next: (x) => this.countries.set(x),
      error: (er) => {
        this.error.set(er.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
