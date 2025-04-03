import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AuthService } from '../../auth/auth.service';
import { Booking } from '../../shared/models/interfaces';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="profile-container">
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>My Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="user-info" *ngIf="user">
            <h3>Personal Information</h3>
            <p><strong>Email:</strong> {{user.email}}</p>
            <p><strong>Member Since:</strong> {{user.metadata?.creationTime | date}}</p>
          </div>

          <mat-tabs>
            <mat-tab label="My Bookings">
              <div class="bookings-list">
                <div *ngIf="bookings.length === 0" class="no-bookings">
                  <p>You have no bookings yet.</p>
                  <button mat-raised-button color="primary" routerLink="/rooms">Browse Rooms</button>
                </div>

                <mat-card *ngFor="let booking of bookings" class="booking-card">
                  <mat-card-header>
                    <mat-card-title>Booking #{{booking.id}}</mat-card-title>
                    <mat-card-subtitle>
                      {{booking.checkIn | date}} - {{booking.checkOut | date}}
                    </mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content>
                    <p><strong>Room:</strong> {{booking.roomId}}</p>
                    <p><strong>Status:</strong> {{booking.status}}</p>
                    <p><strong>Total Price:</strong> R{{booking.totalPrice}}</p>
                  </mat-card-content>
                  <mat-card-actions *ngIf="booking.status === 'pending'">
                    <button mat-button color="warn" (click)="cancelBooking(booking.id)">Cancel Booking</button>
                  </mat-card-actions>
                </mat-card>
              </div>
            </mat-tab>
          </mat-tabs>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .profile-card {
      margin-bottom: 2rem;
    }

    .user-info {
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
      margin-bottom: 1rem;
    }

    .user-info h3 {
      color: #006400;
      margin-bottom: 1rem;
    }

    .bookings-list {
      padding: 1rem 0;
    }

    .booking-card {
      margin-bottom: 1rem;
    }

    .no-bookings {
      text-align: center;
      padding: 2rem;
    }

    .no-bookings p {
      margin-bottom: 1rem;
      color: #666;
    }

    mat-card-actions {
      padding: 1rem;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: any;
  bookings: Booking[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUserProfile();
    this.loadUserBookings();
  }

  private async loadUserProfile() {
    this.user = this.authService.auth.currentUser;
  }

  private async loadUserBookings() {
    try {
      const userId = this.authService.auth.currentUser?.uid;
      if (userId) {
        this.bookings = await this.firebaseService.getUserBookings(userId);
      }
    } catch (error) {
      this.snackBar.open('Error loading bookings', 'Close', { duration: 3000 });
    }
  }

  async cancelBooking(bookingId: string) {
    try {
      await this.firebaseService.updateBookingStatus(bookingId, 'cancelled');
      this.snackBar.open('Booking cancelled successfully', 'Close', { duration: 3000 });
      this.loadUserBookings();
    } catch (error) {
      this.snackBar.open('Error cancelling booking', 'Close', { duration: 3000 });
    }
  }
}