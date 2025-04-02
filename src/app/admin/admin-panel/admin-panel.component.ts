import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <div class="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <button (click)="activeTab = 'rooms'" [class.active]="activeTab === 'rooms'">Rooms</button>
          <button (click)="activeTab = 'bookings'" [class.active]="activeTab === 'bookings'">Bookings</button>
        </nav>
      </div>
      
      <div class="admin-content">
        <div *ngIf="activeTab === 'rooms'" class="rooms-section">
          <h3>Room Management</h3>
          <div class="add-room-form">
            <input type="text" [(ngModel)]="newRoom.number" name="roomNumber" placeholder="Room Number">
            <input type="text" [(ngModel)]="newRoom.type" name="roomType" placeholder="Room Type">
            <input type="number" [(ngModel)]="newRoom.price" name="roomPrice" placeholder="Price per Night">
            <button (click)="addRoom()">Add Room</button>
          </div>
          
          <div class="rooms-list">
            <div *ngFor="let room of rooms" class="room-item">
              <div class="room-details">
                <h4>Room {{room.number}}</h4>
                <p>Type: {{room.type}}</p>
                <p>Price: R{{room.price}}/night</p>
                <p>Status: {{room.status}}</p>
              </div>
              <div class="room-actions">
                <button (click)="editRoom(room)">Edit</button>
                <button (click)="deleteRoom(room)" class="delete">Delete</button>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="activeTab === 'bookings'" class="bookings-section">
          <h3>Booking Management</h3>
          <div class="bookings-list">
            <div *ngFor="let booking of bookings" class="booking-item">
              <div class="booking-details">
                <h4>Booking #{{booking.id}}</h4>
                <p>Guest: {{booking.guestName}}</p>
                <p>Room: {{booking.roomNumber}}</p>
                <p>Check-in: {{booking.checkIn | date}}</p>
                <p>Check-out: {{booking.checkOut | date}}</p>
                <p>Status: {{booking.status}}</p>
              </div>
              <div class="booking-actions">
                <button (click)="updateBookingStatus(booking, 'confirmed')"
                        [class.active]="booking.status === 'confirmed'">Confirm</button>
                <button (click)="updateBookingStatus(booking, 'cancelled')"
                        [class.active]="booking.status === 'cancelled'">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      height: 100vh;
      background-color: #f5f5f5;
      font-family: 'Ubuntu', sans-serif;
    }

    .admin-sidebar {
      width: 250px;
      background: #006400;
      padding: 2rem;
      color: white;
    }

    .admin-sidebar h2 {
      margin-bottom: 2rem;
      font-size: 1.5rem;
      text-align: center;
    }

    .admin-sidebar nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .admin-sidebar button {
      background: transparent;
      border: 2px solid white;
      color: white;
      padding: 0.8rem;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .admin-sidebar button.active,
    .admin-sidebar button:hover {
      background: white;
      color: #006400;
    }

    .admin-content {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
    }

    .add-room-form {
      display: grid;
      gap: 1rem;
      margin-bottom: 2rem;
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    input {
      padding: 0.8rem;
      border: 2px solid #90EE90;
      border-radius: 5px;
      font-size: 1rem;
    }

    button {
      padding: 0.8rem;
      background: #006400;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background: #008000;
    }

    .room-item, .booking-item {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .room-actions, .booking-actions {
      display: flex;
      gap: 0.5rem;
    }

    .delete {
      background: #ff4444;
    }

    .delete:hover {
      background: #cc0000;
    }

    h3 {
      color: #006400;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }

    h4 {
      color: #006400;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    p {
      margin: 0.3rem 0;
      color: #666;
    }
  `]
})
export class AdminPanelComponent {
  activeTab: 'rooms' | 'bookings' = 'rooms';
  
  // Room management
  newRoom = {
    number: '',
    type: '',
    price: 0,
    status: 'available'
  };

  rooms = [
    { number: '101', type: 'Standard', price: 800, status: 'available' },
    { number: '102', type: 'Deluxe', price: 1200, status: 'occupied' },
    { number: '103', type: 'Suite', price: 2000, status: 'maintenance' }
  ];

  // Booking management
  bookings = [
    {
      id: 1,
      guestName: 'John Doe',
      roomNumber: '101',
      checkIn: new Date('2024-03-15'),
      checkOut: new Date('2024-03-20'),
      status: 'confirmed'
    },
    {
      id: 2,
      guestName: 'Jane Smith',
      roomNumber: '102',
      checkIn: new Date('2024-03-18'),
      checkOut: new Date('2024-03-22'),
      status: 'pending'
    }
  ];

  addRoom() {
    if (this.newRoom.number && this.newRoom.type && this.newRoom.price) {
      this.rooms.push({...this.newRoom});
      this.newRoom = {
        number: '',
        type: '',
        price: 0,
        status: 'available'
      };
    }
  }

  editRoom(room: any) {
    // Implement edit functionality
    console.log('Editing room:', room);
  }

  deleteRoom(room: any) {
    this.rooms = this.rooms.filter(r => r.number !== room.number);
  }

  updateBookingStatus(booking: any, status: string) {
    booking.status = status;
  }
}