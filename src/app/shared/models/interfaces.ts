export interface Room {
  id?: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  description: string;
  images: string[];
  isAvailable: boolean;
}

export interface Booking {
  id?: string;
  roomId: string;
  userId: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'staff' | 'guest';
  phoneNumber?: string;
}

export interface Feedback {
  id?: string;
  userId: string;
  roomId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface RoomFilter {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  amenities?: string[];
}