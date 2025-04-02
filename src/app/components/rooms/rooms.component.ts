import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Room, RoomFilter } from '../../shared/models/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="rooms" class="rooms-section">
      <div class="filter-container">
        <div class="filter-box">
          <h3>Find Your Perfect Room</h3>
          <div class="filter-controls">
            <select [(ngModel)]="filter.type" (change)="applyFilters()">
              <option value="">All Room Types</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
              <option value="presidential">Presidential</option>
            </select>
            <div class="price-range">
              <input type="number" [(ngModel)]="filter.minPrice" placeholder="Min Price" (change)="applyFilters()">
              <input type="number" [(ngModel)]="filter.maxPrice" placeholder="Max Price" (change)="applyFilters()">
            </div>
            <select [(ngModel)]="filter.capacity" (change)="applyFilters()">
              <option value="">Any Capacity</option>
              <option [value]="2">2 Guests</option>
              <option [value]="4">4 Guests</option>
              <option [value]="6">6 Guests</option>
            </select>
          </div>
        </div>
      </div>

      <div class="rooms-grid">
        <div *ngFor="let room of filteredRooms$ | async" class="room-card">
          <div class="room-image" [style.background-image]="'url(' + (room.images[0] || '/assets/images/room-placeholder.jpg') + ')'">
            <div class="room-type">{{ room.type }}</div>
          </div>
          <div class="room-details">
            <h3>{{ room.type }} Room</h3>
            <p class="price">R{{ room.price }} per night</p>
            <p class="capacity">Up to {{ room.capacity }} guests</p>
            <div class="amenities">
              <span *ngFor="let amenity of room.amenities">{{ amenity }}</span>
            </div>
            <p class="description">{{ room.description }}</p>
            <button class="book-btn" [disabled]="!room.isAvailable" (click)="bookRoom(room)">
              {{ room.isAvailable ? 'Book Now' : 'Not Available' }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');

    .rooms-section {
      padding: 4rem 2rem;
      background: rgba(0, 64, 0, 0.05);
      min-height: 100vh;
    }

    .filter-container {
      max-width: 1200px;
      margin: 0 auto 2rem;
    }

    .filter-box {
      background: rgba(0, 64, 0, 0.9);
      padding: 2rem;
      border-radius: 10px;
      color: #e0f2e0;
    }

    .filter-box h3 {
      margin: 0 0 1rem;
      font-family: 'Ubuntu', sans-serif;
      font-size: 1.5rem;
    }

    .filter-controls {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    select, input {
      padding: 0.5rem;
      border: 2px solid #90EE90;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.9);
      color: #006400;
      font-family: 'Ubuntu', sans-serif;
    }

    .price-range {
      display: flex;
      gap: 0.5rem;
    }

    .rooms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .room-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .room-card:hover {
      transform: translateY(-5px);
    }

    .room-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .room-type {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0, 100, 0, 0.9);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
    }

    .room-details {
      padding: 1.5rem;
    }

    .room-details h3 {
      margin: 0 0 1rem;
      color: #006400;
      font-family: 'Ubuntu', sans-serif;
    }

    .price {
      font-size: 1.2rem;
      color: #008000;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .capacity {
      color: #666;
      margin-bottom: 1rem;
    }

    .amenities {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .amenities span {
      background: #e0f2e0;
      color: #006400;
      padding: 0.25rem 0.5rem;
      border-radius: 15px;
      font-size: 0.8rem;
    }

    .description {
      color: #444;
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    .book-btn {
      width: 100%;
      padding: 0.75rem;
      background: #006400;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: 'Ubuntu', sans-serif;
      transition: background-color 0.3s ease;
    }

    .book-btn:hover:not(:disabled) {
      background: #008000;
    }

    .book-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .filter-controls {
        flex-direction: column;
      }

      .price-range {
        flex-direction: column;
      }

      .rooms-section {
        padding: 2rem 1rem;
      }
    }
  `]
})
export class RoomsComponent implements OnInit {
  rooms$: Observable<Room[]>;
  filteredRooms$: Observable<Room[]>;
  filter: RoomFilter = {};

  constructor(private firebaseService: FirebaseService) {
    this.rooms$ = this.firebaseService.getRooms();
    this.filteredRooms$ = this.rooms$;
  }

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredRooms$ = this.rooms$.pipe(
      map(rooms => rooms.filter(room => {
        if (this.filter.type && room.type !== this.filter.type) return false;
        if (this.filter.minPrice && room.price < this.filter.minPrice) return false;
        if (this.filter.maxPrice && room.price > this.filter.maxPrice) return false;
        if (this.filter.capacity && room.capacity < this.filter.capacity) return false;
        return true;
      }))
    );
  }

  bookRoom(room: Room) {
    // TODO: Implement booking logic
    console.log('Booking room:', room);
  }
}