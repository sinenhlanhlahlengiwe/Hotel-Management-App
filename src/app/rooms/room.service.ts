import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Room {
  id: string;
  type: string;
  price: number;
  description: string;
  amenities: string[];
  imageUrl: string;
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private rooms: Room[] = [
    {
      id: '1',
      type: 'Deluxe Suite',
      price: 1500,
      description: 'Spacious suite with ocean view',
      amenities: ['King-size bed', 'Private balcony', 'Mini bar', 'Wi-Fi', 'Room service'],
      imageUrl: '/assets/images/deluxe-suite.jpg',
      available: true
    },
    {
      id: '2',
      type: 'Standard Room',
      price: 800,
      description: 'Comfortable room with city view',
      amenities: ['Queen-size bed', 'TV', 'Wi-Fi', 'Air conditioning'],
      imageUrl: '/assets/images/standard-room.jpg',
      available: true
    },
    {
      id: '3',
      type: 'Family Suite',
      price: 2000,
      description: 'Perfect for families with separate living area',
      amenities: ['2 Bedrooms', 'Living room', 'Kitchen', 'Wi-Fi', 'Pool access'],
      imageUrl: '/assets/images/family-suite.jpg',
      available: true
    }
  ];

  constructor() {}

  getRooms(): Observable<Room[]> {
    return of(this.rooms);
  }

  checkAvailability(roomId: string, checkIn: Date, checkOut: Date): Observable<boolean> {
    // In a real application, this would check against bookings in a database
    return of(true);
  }

  searchRooms(checkIn: Date, checkOut: Date): Observable<Room[]> {
    // In a real application, this would filter rooms based on availability in the database
    return of(this.rooms.filter(room => room.available));
  }

  bookRoom(roomId: string, checkIn: Date, checkOut: Date, userId: string): Observable<boolean> {
    // In a real application, this would create a booking record in the database
    const room = this.rooms.find(r => r.id === roomId);
    if (room) {
      room.available = false;
      return of(true);
    }
    return of(false);
  }
}