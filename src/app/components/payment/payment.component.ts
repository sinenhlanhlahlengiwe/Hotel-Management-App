import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="payment-container">
      <h2>Payment Details</h2>
      <div class="payment-form">
        <div class="amount-display">
          <p>Total Amount: R{{ amount }}</p>
        </div>

        <div id="payment-element">
          <!-- Stripe Payment Element will be mounted here -->
        </div>

        <div class="payment-actions">
          <button
            [disabled]="processing"
            (click)="processPayment()"
            class="pay-button"
          >
            {{ processing ? 'Processing...' : 'Pay Now' }}
          </button>
        </div>

        <div *ngIf="error" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
    }

    h2 {
      color: #333;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .payment-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .amount-display {
      text-align: center;
      font-size: 1.2rem;
      font-weight: bold;
      color: #2c3e50;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 4px;
    }

    #payment-element {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .payment-actions {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }

    .pay-button {
      padding: 0.8rem 2rem;
      font-size: 1rem;
      color: white;
      background-color: #4CAF50;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .pay-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .pay-button:hover:not(:disabled) {
      background-color: #45a049;
    }

    .error-message {
      color: #dc3545;
      text-align: center;
      padding: 0.5rem;
      background-color: #f8d7da;
      border-radius: 4px;
    }
  `]
})
export class PaymentComponent {
  @Input() amount: number = 0;
  @Output() paymentComplete = new EventEmitter<boolean>();

  processing: boolean = false;
  error: string = '';

  constructor(private paymentService: PaymentService) {}

  async ngOnInit() {
    try {
      const paymentIntent = await this.paymentService.createPaymentIntent(this.amount);
      await this.paymentService.createPaymentElement(paymentIntent.clientSecret);
    } catch (error: any) {
      this.error = error.message;
    }
  }

  async processPayment() {
    this.processing = true;
    this.error = '';

    try {
      const result = await this.paymentService.confirmPayment(window.location.origin);
      if (result.success) {
        this.paymentComplete.emit(true);
      } else {
        this.error = result.error || 'Payment failed';
      }
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.processing = false;
    }
  }
}