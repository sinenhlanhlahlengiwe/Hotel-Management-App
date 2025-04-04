import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-container">
      <div class="contact-box">
        <h2>Contact Us</h2>
        <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
          <div class="form-group">
            <input type="text" [(ngModel)]="name" name="name" placeholder="Your Name" required>
          </div>
          <div class="form-group">
            <input type="email" [(ngModel)]="email" name="email" placeholder="Your Email" required>
          </div>
          <div class="form-group">
            <textarea [(ngModel)]="message" name="message" placeholder="Your Message" required rows="5"></textarea>
          </div>
          <button type="submit">Send Message</button>
          <p class="success-message" *ngIf="successMessage">{{ successMessage }}</p>
          <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>
        </form>

        <div class="contact-info">
          <h3>Other Ways to Reach Us</h3>
          <p><strong>Address:</strong> 123 Hotel Street, Pretoria, South Africa</p>

          <p><strong>Phone:</strong> +27 12 345 6789 </p>

          <p><strong>Email:</strong> info&#64;hotelmanagement.co.za</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(rgba(0, 80, 0, 0.7), rgba(0, 40, 0, 0.9));
      padding: 2rem;
      font-family: 'Ubuntu', sans-serif;
    }

    .contact-box {
      background: rgba(255, 255, 255, 0.95);
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 600px;
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

    input, textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #90EE90;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    input:focus, textarea:focus {
      outline: none;
      border-color: #006400;
    }

    textarea {
      resize: vertical;
      min-height: 120px;
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

    .contact-info {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 2px solid #90EE90;
    }

    .contact-info h3 {
      color: #006400;
      margin-bottom: 1rem;
    }

    .contact-info p {
      margin-bottom: 0.5rem;
      color: #333;
    }
  `]
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  onSubmit() {
    // TODO: Implement Firebase integration for contact form
    this.successMessage = 'Thank you for your message. We will get back to you soon!';
    this.name = '';
    this.email = '';
    this.message = '';
  }
}