import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="booking-container">
      <div class="booking-box">
        <h2>Booking Confirmation</h2>
        
        <div class="booking-details">
          <h3>Room Details</h3>
          <div class="detail-item">
            <span>Room Type:</span>
            <span>{{booking.roomType}}</span>
          </div>
          <div class="detail-item">
            <span>Room Number:</span>
            <span>{{booking.roomNumber}}</span>
          </div>
          <div class="detail-item">
            <span>Check-in:</span>
            <span>{{booking.checkIn | date}}</span>
          </div>
          <div class="detail-item">
            <span>Check-out:</span>
            <span>{{booking.checkOut | date}}</span>
          </div>
          <div class="detail-item total">
            <span>Total Amount:</span>
            <span>R{{booking.totalAmount}}</span>
          </div>
        </div>

        <div class="payment-section">
          <h3>Payment Details</h3>
          <form (ngSubmit)="processPayment()" #paymentForm="ngForm">
            <div class="form-group">
              <label>Card Holder Name</label>
              <input type="text" [(ngModel)]="payment.cardHolder" name="cardHolder" required>
            </div>
            <div class="form-group">
              <label>Card Number</label>
              <input type="text" [(ngModel)]="payment.cardNumber" name="cardNumber" 
                     pattern="[0-9]{16}" required maxlength="16">
            </div>
            <div class="card-details">
              <div class="form-group">
                <label>Expiry Date</label>
                <input type="text" [(ngModel)]="payment.expiryDate" name="expiryDate" 
                       placeholder="MM/YY" required>
              </div>
              <div class="form-group">
                <label>CVV</label>
                <input type="text" [(ngModel)]="payment.cvv" name="cvv" 
                       pattern="[0-9]{3,4}" required maxlength="4">
              </div>
            </div>
            <button type="submit" [disabled]="!paymentForm.valid || processing">
              {{processing ? 'Processing...' : 'Confirm Payment'}}
            </button>
          </form>
        </div>

        <div *ngIf="paymentStatus" 
             [class]="'payment-status ' + (paymentStatus === 'success' ? 'success' : 'error')">
          {{statusMessage}}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .booking-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(rgba(0, 80, 0, 0.7), rgba(0, 40, 0, 0.9));
      padding: 2rem;
      font-family: 'Ubuntu', sans-serif;
    }

    .booking-box {
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

    h3 {
      color: #006400;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .booking-details {
      background: #f8f8f8;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
    }

    .detail-item.total {
      border-top: 2px solid #006400;
      border-bottom: none;
      padding-top: 1rem;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .payment-section {
      margin-top: 2rem;
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

    .card-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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

    .payment-status {
      margin-top: 1.5rem;
      padding: 1rem;
      border-radius: 5px;
      text-align: center;
    }

    .payment-status.success {
      background-color: #d4edda;
      color: #155724;
    }

    .payment-status.error {
      background-color: #f8d7da;
      color: #721c24;
    }
  `]
})
export class BookingConfirmationComponent {
  booking = {
    roomType: 'Deluxe Suite',
    roomNumber: '201',
    checkIn: new Date('2024-03-20'),
    checkOut: new Date('2024-03-25'),
    totalAmount: 6000
  };

  payment = {
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  processing = false;
  paymentStatus: 'success' | 'error' | null = null;
  statusMessage = '';

  async processPayment() {
    this.processing = true;
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Successful payment simulation
      this.paymentStatus = 'success';
      this.statusMessage = 'Payment successful! Your booking is confirmed.';
      
      // In a real application, you would:
      // 1. Send payment details to a secure payment gateway
      // 2. Update booking status in the database
      // 3. Send confirmation email to the guest
      // 4. Navigate to a success page or booking summary
      
    } catch (error) {
      this.paymentStatus = 'error';
      this.statusMessage = 'Payment failed. Please try again.';
    } finally {
      this.processing = false;
    }
  }
}