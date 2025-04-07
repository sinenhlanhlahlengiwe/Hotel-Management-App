import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

interface Room {
  id: string;
  type: string;
  price: number;
  description: string;
  amenities: string[];
  imageUrl: string;
  available: boolean;
}

@Component({
  selector: 'app-rooms',
  template: `
    <div class="container mt-4">
      <div class="search-section mb-4">
        <h2>Find Your Perfect Room</h2>
        <div class="search-controls d-flex gap-3 align-items-center">
          <input type="date" class="form-control" [(ngModel)]="checkInDate" placeholder="Check-in Date">
          <input type="date" class="form-control" [(ngModel)]="checkOutDate" placeholder="Check-out Date">
          <button class="btn btn-primary" (click)="searchRooms()">Search Rooms</button>
        </div>
      </div>

      <div class="rooms-grid">
        <div *ngFor="let room of rooms" class="room-card">
          <img [src]="room.imageUrl" [alt]="room.type" class="room-image">
          <div class="room-details">
            <h3>{{ room.type }}</h3>
            <p class="price">R{{ room.price }} per night</p>
            <p>{{ room.description }}</p>
            <div class="amenities">
              <h4>Amenities:</h4>
              <ul>
                <li *ngFor="let amenity of room.amenities">{{ amenity }}</li>
              </ul>
            </div>
            <button class="btn btn-success" *ngIf="isAuthenticated && room.available" (click)="bookRoom(room)">Book Now</button>
            <button class="btn btn-secondary" *ngIf="!isAuthenticated" (click)="redirectToLogin()">Login to Book</button>
            <div class="unavailable" *ngIf="!room.available">
              Currently Unavailable
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rooms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }

    .room-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .room-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .room-details {
      padding: 1rem;
    }

    .price {
      font-size: 1.25rem;
      font-weight: bold;
      color: #28a745;
    }

    .amenities ul {
      list-style: none;
      padding-left: 0;
    }

    .amenities li {
      margin-bottom: 0.5rem;
    }

    .search-controls {
      max-width: 800px;
      margin: 0 auto;
    }

    .unavailable {
      color: #dc3545;
      font-weight: bold;
      margin-top: 1rem;
    }
  `]
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [
    {
      id: '1',
      type: 'Deluxe Suite',
      price: 1500,
      description: 'Spacious suite with ocean view',
      amenities: ['King-size bed', 'Private balcony', 'Mini bar', 'Wi-Fi'],
      imageUrl: '/assets/images/deluxe-suite.jpg',
      available: true
    },
    {
      id: '2',
      type: 'Standard Room',
      price: 800,
      description: 'Comfortable room with city view',
      amenities: ['Queen-size bed', 'TV', 'Wi-Fi'],
      imageUrl: '/assets/images/standard-room.jpg',
      available: true
    }
  ];

  checkInDate: string = '';
  checkOutDate: string = '';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
  }

  searchRooms() {
    // Implement room search logic based on dates
    console.log('Searching rooms for:', this.checkInDate, 'to', this.checkOutDate);
  }

  bookRoom(room: Room) {
    // Implement booking logic
    console.log('Booking room:', room);
  }

  redirectToLogin() {
    // Implement redirect to login page
    console.log('Redirecting to login');
  }
}