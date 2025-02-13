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
  private destryRef = inject(DestroyRef);
  private authService = inject(AuthService);

  error = signal('');
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.controls.email.value!;
      const password = this.form.controls.password.value!;
      const subscription = this.authService.Signin(email, password).subscribe({
        next: (user) => {
          this.authService.SetUserInfo(user, true);
          console.log(this.authService.getUserInfo()?.user);
        },
        error: (error) => this.error.set(error.error),
      });

      this.destryRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      this.error.set('Email or password is incorrect');
    }
  }
}
