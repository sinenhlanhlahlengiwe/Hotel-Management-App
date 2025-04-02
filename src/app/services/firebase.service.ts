import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

interface Room {
  id?: string;
  number: string;
  type: string;
  price: number;
  description?: string;
  amenities?: string[];
  capacity?: number;
  isAvailable?: boolean;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface Booking {
  id?: string;
  roomId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyBZrWFgxVlFHdDXuXe8hnXvhOXvMNnPyXk",
  authDomain: "hotel-management-app-sa.firebaseapp.com",
  projectId: "hotel-management-app-sa",
  storageBucket: "hotel-management-app-sa.appspot.com",
  messagingSenderId: "654321098765",
  appId: "1:654321098765:web:abcdef123456789"
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);
  private db = getFirestore(this.app);

  // Authentication methods
  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  // Room management methods
  async addRoom(roomData: Room) {
    try {
      if (!roomData.number || !roomData.type || !roomData.price) {
        throw new Error('Invalid room data: Missing required fields');
      }
      const roomsRef = collection(this.db, 'rooms');
      const docRef = await addDoc(roomsRef, {
        ...roomData,
        createdAt: new Date().toISOString(),
        isAvailable: true
      });
      return { id: docRef.id, ...roomData };
    } catch (error: any) {
      console.error('Error adding room:', error.message);
      throw new Error(`Failed to add room: ${error.message}`);
    }
  }

  async getRooms(): Promise<Room[]> {
    try {
      const roomsRef = collection(this.db, 'rooms');
      const snapshot = await getDocs(roomsRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Room)
      }));
    } catch (error: any) {
      console.error('Error getting rooms:', error.message);
      throw new Error(`Failed to fetch rooms: ${error.message}`);
    }
  }

  async updateRoom(roomId: string, roomData: Partial<Room>) {
    try {
      if (!roomId) {
        throw new Error('Room ID is required');
      }
      const roomRef = doc(this.db, 'rooms', roomId);
      await updateDoc(roomRef, {
        ...roomData,
        updatedAt: new Date().toISOString()
      });
      return { id: roomId, ...roomData };
    } catch (error: any) {
      console.error('Error updating room:', error.message);
      throw new Error(`Failed to update room: ${error.message}`);
    }
  }

  async deleteRoom(roomId: string) {
    try {
      if (!roomId) {
        throw new Error('Room ID is required');
      }
      const roomRef = doc(this.db, 'rooms', roomId);
      await deleteDoc(roomRef);
      return { success: true, message: 'Room deleted successfully' };
    } catch (error: any) {
      console.error('Error deleting room:', error.message);
      throw new Error(`Failed to delete room: ${error.message}`);
    }
  }

  // Booking management methods
  async addBooking(bookingData: any) {
    try {
      const bookingsRef = collection(this.db, 'bookings');
      return await addDoc(bookingsRef, bookingData);
    } catch (error) {
      throw error;
    }
  }

  async getBookings() {
    try {
      const bookingsRef = collection(this.db, 'bookings');
      const snapshot = await getDocs(bookingsRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  }

  async updateBooking(bookingId: string, bookingData: any) {
    try {
      const bookingRef = doc(this.db, 'bookings', bookingId);
      await updateDoc(bookingRef, bookingData);
    } catch (error) {
      throw error;
    }
  }

  async deleteBooking(bookingId: string) {
    try {
      const bookingRef = doc(this.db, 'bookings', bookingId);
      await deleteDoc(bookingRef);
    } catch (error) {
      throw error;
    }
  }
}