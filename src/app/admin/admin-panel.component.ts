import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Room } from '../shared/models/interfaces';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <div class="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <button (click)="activeSection = 'rooms'" [class.active]="activeSection === 'rooms'">Room Management</button>
          <button (click)="activeSection = 'stats'" [class.active]="activeSection === 'stats'">Statistics</button>
        </nav>
      </div>

      <div class="admin-content">
        <!-- Room Management Section -->
        <div *ngIf="activeSection === 'rooms'" class="section">
          <h3>Room Management</h3>
          
          <!-- Add New Room Form -->
          <div class="add-room-form">
            <h4>Add New Room</h4>
            <form (ngSubmit)="addRoom()" #roomForm="ngForm">
              <div class="form-group">
                <input type="text" [(ngModel)]="newRoom.number" name="number" placeholder="Room Number" required>
              </div>
              <div class="form-group">
                <input type="number" [(ngModel)]="newRoom.price" name="price" placeholder="Price per Night" required>
              </div>
              <div class="form-group">
                <select [(ngModel)]="newRoom.type" name="type" required>
                  <option value="">Select Room Type</option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
              <div class="form-group">
                <textarea [(ngModel)]="newRoom.description" name="description" placeholder="Room Description" required></textarea>
              </div>
              <button type="submit" [disabled]="!roomForm.valid">Add Room</button>
            </form>
          </div>

          <!-- Room List -->
          <div class="room-list">
            <h4>Existing Rooms</h4>
            <div class="room-grid">
              <div *ngFor="let room of rooms" class="room-card">
                <h5>Room {{room.number}}</h5>
                <p>Type: {{room.type}}</p>
                <p>Price: ${{room.price}}/night</p>
                <p>{{room.description}}</p>
                <div class="room-actions">
                  <button (click)="editRoom(room)">Edit</button>
                  <button (click)="deleteRoom(room.id)" class="delete">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics Section -->
        <div *ngIf="activeSection === 'stats'" class="section">
          <h3>Statistics</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <h4>Total Bookings</h4>
              <p class="stat-number">{{statistics.totalBookings}}</p>
            </div>
            <div class="stat-card">
              <h4>Revenue</h4>
              <p class="stat-number">${{statistics.revenue}}</p>
            </div>
            <div class="stat-card">
              <h4>Occupancy Rate</h4>
              <p class="stat-number">{{statistics.occupancyRate}}%</p>
            </div>
            <div class="stat-card">
              <h4>Active Bookings</h4>
              <p class="stat-number">{{statistics.activeBookings}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      min-height: 100vh;
      background-color: #f5f5f5;
      font-family: 'Ubuntu', sans-serif;
    }

    .admin-sidebar {
      width: 250px;
      background-color: #006400;
      padding: 2rem;
      color: white;
    }

    .admin-sidebar h2 {
      margin-bottom: 2rem;
      font-size: 1.5rem;
    }

    .admin-sidebar nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .admin-sidebar button {
      background: transparent;
      border: 1px solid white;
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
    }

    .section {
      background: white;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .section h3 {
      color: #006400;
      margin-bottom: 2rem;
      font-size: 1.8rem;
    }

    .add-room-form {
      max-width: 600px;
      margin-bottom: 3rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    input, select, textarea {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid #90EE90;
      border-radius: 5px;
      font-size: 1rem;
    }

    textarea {
      height: 100px;
      resize: vertical;
    }

    button {
      background-color: #006400;
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover:not(:disabled) {
      background-color: #008000;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .room-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .room-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .room-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .room-actions .delete {
      background-color: #dc3545;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-number {
      font-size: 2rem;
      color: #006400;
      margin-top: 1rem;
    }
  `]
})
export class AdminPanelComponent implements OnInit {
  activeSection: 'rooms' | 'stats' = 'rooms';
  rooms: any[] = [];
  statistics = {
    totalBookings: 0,
    revenue: 0,
    occupancyRate: 0,
    activeBookings: 0
  };

  newRoom = {
    number: '',
    type: '',
    price: 0,
    description: ''
  };

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.loadRooms();
    this.loadStatistics();
  }

  async loadRooms() {
    try {
      this.rooms = await this.firebaseService.getRooms();
    } catch (error) {
      console.error('Error loading rooms:', error);
    }
  }

  async loadStatistics() {
    try {
      const bookings = await this.firebaseService.getBookings();
      this.statistics = {
        totalBookings: bookings.length,
        revenue: bookings.reduce((total, booking) => total + booking.totalPrice, 0),
        occupancyRate: Math.round((bookings.filter(b => b.status === 'active').length / this.rooms.length) * 100),
        activeBookings: bookings.filter(b => b.status === 'active').length
      };
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  }

  async addRoom() {
    try {
      await this.firebaseService.addRoom(this.newRoom);
      await this.loadRooms();
      this.newRoom = {
        number: '',
        type: '',
        price: 0,
        description: ''
      };
    } catch (error) {
      console.error('Error adding room:', error);
    }
  }

  async editRoom(room: Room) {
    try {
      await this.firebaseService.updateRoom(room.id, room);
      await this.loadRooms();
    } catch (error) {
      console.error('Error updating room:', error);
    }
  }

  async deleteRoom(roomId: string) {
    try {
      await this.firebaseService.deleteRoom(roomId);
      await this.loadRooms();
      await this.loadStatistics();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  }
}