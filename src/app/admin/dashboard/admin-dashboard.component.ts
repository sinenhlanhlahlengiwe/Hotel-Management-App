import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Room, Booking } from '../../shared/models/interfaces';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  template: `
    <div class="admin-dashboard">
      <mat-tabs>
        <mat-tab label="Statistics">
          <div class="stats-container">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Booking Statistics</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="stats-grid">
                  <div class="stat-item">
                    <h3>Total Bookings</h3>
                    <p>{{bookingStats.total}}</p>
                  </div>
                  <div class="stat-item">
                    <h3>Confirmed Bookings</h3>
                    <p>{{bookingStats.confirmed}}</p>
                  </div>
                  <div class="stat-item">
                    <h3>Cancelled Bookings</h3>
                    <p>{{bookingStats.cancelled}}</p>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Rooms">
          <table mat-table [dataSource]="rooms" class="mat-elevation-z8">
            <ng-container matColumnDef="number">
              <th mat-header-cell *matHeaderCellDef> Room Number </th>
              <td mat-cell *matCellDef="let room"> {{room.number}} </td>
            </ng-container>

            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef> Type </th>
              <td mat-cell *matCellDef="let room"> {{room.type}} </td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef> Price </th>
              <td mat-cell *matCellDef="let room"> R{{room.price}} </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> Status </th>
              <td mat-cell *matCellDef="let room"> {{room.isAvailable ? 'Available' : 'Booked'}} </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let room">
                <button mat-icon-button color="primary" (click)="editRoom(room)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteRoom(room.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <button mat-raised-button color="primary" class="add-room-btn" (click)="addRoom()">
            Add New Room
          </button>
        </mat-tab>

        <mat-tab label="Bookings">
          <table mat-table [dataSource]="bookings" class="mat-elevation-z8">
            <ng-container matColumnDef="guestName">
              <th mat-header-cell *matHeaderCellDef> Guest Name </th>
              <td mat-cell *matCellDef="let booking"> {{booking.guestName}} </td>
            </ng-container>

            <ng-container matColumnDef="roomId">
              <th mat-header-cell *matHeaderCellDef> Room </th>
              <td mat-cell *matCellDef="let booking"> {{booking.roomId}} </td>
            </ng-container>

            <ng-container matColumnDef="checkIn">
              <th mat-header-cell *matHeaderCellDef> Check In </th>
              <td mat-cell *matCellDef="let booking"> {{booking.checkIn | date}} </td>
            </ng-container>

            <ng-container matColumnDef="checkOut">
              <th mat-header-cell *matHeaderCellDef> Check Out </th>
              <td mat-cell *matCellDef="let booking"> {{booking.checkOut | date}} </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> Status </th>
              <td mat-cell *matCellDef="let booking"> {{booking.status}} </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let booking">
                <button mat-icon-button color="primary" (click)="updateBookingStatus(booking)">
                  <mat-icon>edit</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="bookingColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: bookingColumns;"></tr>
          </table>
        </mat-tab>
      </mat-tabs>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 2rem;
    }

    .stats-container {
      margin: 2rem 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .stat-item {
      text-align: center;
      padding: 1rem;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .stat-item h3 {
      margin: 0;
      color: #666;
    }

    .stat-item p {
      margin: 0.5rem 0 0;
      font-size: 2rem;
      color: #2196f3;
    }

    table {
      width: 100%;
      margin-top: 1rem;
    }

    .add-room-btn {
      margin: 1rem 0;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  rooms: Room[] = [];
  bookings: Booking[] = [];
  displayedColumns: string[] = ['number', 'type', 'price', 'status', 'actions'];
  bookingColumns: string[] = ['guestName', 'roomId', 'checkIn', 'checkOut', 'status', 'actions'];
  bookingStats = {
    total: 0,
    confirmed: 0,
    cancelled: 0
  };

  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadRooms();
    this.loadBookings();
    this.loadBookingStats();
  }

  async loadRooms() {
    try {
      this.rooms = await this.firebaseService.getRooms().toPromise();
    } catch (error) {
      this.snackBar.open('Error loading rooms', 'Close', { duration: 3000 });
    }
  }

  async loadBookings() {
    try {
      this.bookings = await this.firebaseService.getBookings();
    } catch (error) {
      this.snackBar.open('Error loading bookings', 'Close', { duration: 3000 });
    }
  }

  async loadBookingStats() {
    try {
      this.bookingStats = await this.firebaseService.getBookingStats();
    } catch (error) {
      this.snackBar.open('Error loading statistics', 'Close', { duration: 3000 });
    }
  }

  addRoom() {
    // TODO: Implement room addition dialog
  }

  editRoom(room: Room) {
    // TODO: Implement room editing dialog
  }

  async deleteRoom(roomId: string | undefined) {
    if (!roomId) return;
    
    if (confirm('Are you sure you want to delete this room?')) {
      try {
        await this.firebaseService.deleteRoom(roomId);
        this.snackBar.open('Room deleted successfully', 'Close', { duration: 3000 });
        this.loadRooms();
      } catch (error) {
        this.snackBar.open('Error deleting room', 'Close', { duration: 3000 });
      }
    }
  }

  updateBookingStatus(booking: Booking) {
    // TODO: Implement booking status update dialog
  }
}