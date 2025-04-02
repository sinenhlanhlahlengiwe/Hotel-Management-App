import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
        
        <form (ngSubmit)="handleSubmit()" #authForm="ngForm">
          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              [(ngModel)]="credentials.email" 
              name="email" 
              required 
              email
            >
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input 
              type="password" 
              [(ngModel)]="credentials.password" 
              name="password" 
              required 
              minlength="6"
            >
          </div>
          
          <button type="submit" [disabled]="!authForm.valid || processing">
            {{ processing ? 'Processing...' : (isLogin ? 'Login' : 'Register') }}
          </button>
        </form>

        <div class="auth-links">
          <a (click)="isLogin = !isLogin">
            {{ isLogin ? 'Need an account? Register' : 'Already have an account? Login' }}
          </a>
          <a (click)="forgotPassword()" *ngIf="isLogin">Forgot Password?</a>
        </div>

        <div *ngIf="error" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(rgba(0, 80, 0, 0.7), rgba(0, 40, 0, 0.9));
      padding: 2rem;
      font-family: 'Ubuntu', sans-serif;
    }

    .auth-box {
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

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #006400;
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
      margin-top: 1rem;
    }

    button:hover:not(:disabled) {
      background-color: #008000;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .auth-links {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .auth-links a {
      color: #006400;
      text-decoration: none;
      cursor: pointer;
    }

    .auth-links a:hover {
      text-decoration: underline;
    }

    .error-message {
      margin-top: 1rem;
      padding: 0.8rem;
      background-color: #f8d7da;
      color: #721c24;
      border-radius: 5px;
      text-align: center;
    }
  `]
})
export class AuthComponent {
  isLogin = true;
  processing = false;
  error = '';

  credentials = {
    email: '',
    password: ''
  };

  constructor(private firebaseService: FirebaseService) {}

  async handleSubmit() {
    this.processing = true;
    this.error = '';

    try {
      if (this.isLogin) {
        await this.firebaseService.login(
          this.credentials.email,
          this.credentials.password
        );
        // Navigate to dashboard or home page after successful login
      } else {
        await this.firebaseService.register(
          this.credentials.email,
          this.credentials.password
        );
        // Navigate to login page or directly log the user in
      }
    } catch (error: any) {
      this.error = error.message || 'An error occurred. Please try again.';
    } finally {
      this.processing = false;
    }
  }

  forgotPassword() {
    // Implement password reset functionality
    console.log('Forgot password clicked');
  }
}