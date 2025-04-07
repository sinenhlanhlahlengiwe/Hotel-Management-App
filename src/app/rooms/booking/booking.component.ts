import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService, Room } from '../room.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-booking',
  template: `
    <div class="container mt-4" *ngIf="room">
      <div class="booking-card">
        <h2>Booking Details</h2>
        <div class="room-summary">
          <img [src]="room.imageUrl" [alt]="room.type" class="room-image">
          <div class="room-info">
            <h3>{{ room.type }}</h3>
            <p class="price">R{{ room.price }} per night</p>
          </div>
        </div>

        <form (ngSubmit)="confirmBooking()" #bookingForm="ngForm" class="booking-form">
          <div class="form-group">
            <label for="checkIn">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              class="form-control"
              [(ngModel)]="checkInDate"
              required
            >
          </div>

          <div class="form-group">
            <label for="checkOut">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              class="form-control"
              [(ngModel)]="checkOutDate"
              required
            >
          </div>

          <div class="total-section">
            <h4>Total Cost</h4>
            <p class="total-amount">R{{ calculateTotal() }}</p>
          </div>

          <div class="payment-section">
            <h4>Payment Details</h4>
            <div class="form-group">
              <label for="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                class="form-control"
                [(ngModel)]="cardNumber"
                required
                pattern="[0-9]{16}"
                placeholder="1234 5678 9012 3456"
              >
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  class="form-control"
                  [(ngModel)]="expiryDate"
                  required
                  pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                  placeholder="MM/YY"
                >
              </div>

              <div class="form-group col-md-6">
                <label for="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  class="form-control"
                  [(ngModel)]="cvv"
                  required
                  pattern="[0-9]{3,4}"
                  placeholder="123"
                >
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-block"
            [disabled]="!bookingForm.form.valid"
          >
            Confirm and Pay
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .booking-card {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .room-summary {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }

    .room-image {
      width: 200px;
      height: 150px;
      object-fit: cover;
      border-radius: 4px;
    }

    .room-info {
      flex: 1;
    }

    .booking-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .total-section {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }

    .total-amount {
      font-size: 1.5rem;
      font-weight: bold;
      color: #28a745;
    }

    .payment-section {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .form-row {
      display: flex;
      gap: 1rem;
    }
  `]
})
export class BookingComponent implements OnInit {
  room: Room | null = null;
  checkInDate: string = '';
  checkOutDate: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.roomService.getRooms().subscribe(rooms => {
        console.log(rooms);
        this.room = rooms.find(r => r.id === roomId) || null;
        if (!this.room) {
          this.router.navigate(['/rooms']);
        }
      });
    }

    if (!this.authService.getCurrentUser()) {
      this.router.navigate(['/login']);
    }
  }

  calculateTotal(): number {
    if (!this.room || !this.checkInDate || !this.checkOutDate) {
      return 0;
    }

    const start = new Date(this.checkInDate);
    const end = new Date(this.checkOutDate);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return this.room.price * nights;
  }

  confirmBooking() {
    if (!this.room || !this.authService.getCurrentUser()) {
      return;
    }

    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      return;
    }

    this.roomService.bookRoom(
      this.room.id,
      new Date(this.checkInDate),
      new Date(this.checkOutDate),
      userId
    ).subscribe(success => {
      if (success) {
        // In a real application, we would process the payment here
        alert('Booking confirmed successfully!');
        this.router.navigate(['/rooms']);
      } else {
        alert('Failed to book the room. Please try again.');
      }
    });
  }
}