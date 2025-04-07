import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <div class="register-box">
        <h2>Join Our Community</h2>
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="form-group">
            <input type="text" [(ngModel)]="name" name="name" placeholder="Full Name" required>
          </div>
          <div class="form-group">
            <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
          </div>
          <div class="form-group">
            <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
          </div>
          <div class="form-group">
            <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required>
          </div>
          <button type="submit">Create Account</button>
          <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>
        </form>
        <div class="links">
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(rgba(0, 80, 0, 0.7), rgba(0, 40, 0, 0.9));
      font-family: 'Ubuntu', sans-serif;
    }

    .register-box {
      background: rgba(255, 255, 255, 0.95);
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      color: #006400;
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #90EE90;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    input:focus {
      outline: none;
      border-color: #006400;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #006400;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #008000;
    }

    .links {
      text-align: center;
      margin-top: 1rem;
    }

    .links a {
      color: #006400;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .links a:hover {
      text-decoration: underline;
    }

    .error-message {
      color: #ff0000;
      text-align: center;
      margin-top: 1rem;
    }
  `]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    try {
      await this.authService.register(this.email, this.password, this.name);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}