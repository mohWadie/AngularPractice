import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  error = signal('');

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.min(6)],
    }),
  });

  onSubmit() {
    //...
    this.error.set('');
    const subscription = this.authService
      .signup(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe({
        next: (user) => this.authService.setUser(user),
        error: (error) => this.error.set(error.message),
        //complete: loadingDialog
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
