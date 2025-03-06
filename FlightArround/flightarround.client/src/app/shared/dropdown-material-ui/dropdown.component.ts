import { Component, input, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent implements OnInit {
  labelName = input.required<string>();
  myControl = signal<FormControl>(
    new FormControl({ key: String, value: String })
  );
  // options: string[] = ['One', 'Two', 'Three'];
  options = input.required<{ key: String; value: String }[]>();
  filteredOptions: Observable<{ key: String; value: String }[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl().valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    console.log(this.options());
  }

  private _filter(value: string): { key: String; value: String }[] {
    const filterValue = value.toLowerCase();

    return this.options().filter((option) =>
      option.value.toLowerCase().includes(filterValue)
    );
  }
}
