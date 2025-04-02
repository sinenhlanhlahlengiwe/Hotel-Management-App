import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="forgot-password-container">
      <div class="forgot-password-box">
        <h2>Reset Password</h2>
        <p class="instruction">Enter your email address and we'll send you a link to reset your password.</p>
        <form (ngSubmit)="onSubmit()" #forgotPasswordForm="ngForm">
          <div class="form-group">
            <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
          </div>
          <button type="submit">Send Reset Link</button>
          <p class="success-message" *ngIf="successMessage">{{ successMessage }}</p>
          <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>
        </form>
        <div class="links">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(rgba(0, 80, 0, 0.7), rgba(0, 40, 0, 0.9));
      font-family: 'Ubuntu', sans-serif;
    }

    .forgot-password-box {
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
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    .instruction {
      color: #666;
      text-align: center;
      margin-bottom: 2rem;
      line-height: 1.4;
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
      margin-top: 1.5rem;
    }

    .links a {
      color: #006400;
      text-decoration: none;
    }

    .links a:hover {
      text-decoration: underline;
    }

    .success-message {
      color: #006400;
      text-align: center;
      margin-top: 1rem;
    }

    .error-message {
      color: #ff0000;
      text-align: center;
      margin-top: 1rem;
    }
  `]
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    try {
      await this.authService.resetPassword(this.email);
      this.successMessage = 'Password reset link has been sent to your email.';
      this.errorMessage = '';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } catch (error: any) {
      this.errorMessage = error.message;
      this.successMessage = '';
    }
  }
}