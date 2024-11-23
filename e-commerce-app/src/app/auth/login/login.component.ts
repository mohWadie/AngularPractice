import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  isLoading = signal<boolean>(false);
  error = signal('');

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.min(6)],
    }),
  });

  async onSubmit() {
    this.isLoading.set(true);
    this.error.set('');

    const subscription = this.authService
      .signin(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe({
        next: (user) => this.authService.setUser(user),
        error: (error) => this.error.set(error.message),
        complete: () => {
          this.isLoading.set(false);
          this.router.navigate(['/products']);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    this.isLoading.set(false);
  }
}
