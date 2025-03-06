import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent implements OnInit {
  optionControl = input.required<FormControl>();
  labelName = input.required<string>();
  options = input.required<any>();
  res = output<any>();

  ngOnInit(): void {
    // console.log(this.options());
  }

  onOptionChange(option: any) {
    console.log(option);
    this.res.emit(option.value);
  }
}
