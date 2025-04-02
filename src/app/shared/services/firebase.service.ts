import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where, Firestore } from 'firebase/firestore';
import { environment } from '../../../environments/environment';
import { Room, Booking, Feedback, UserProfile } from '../models/interfaces';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db: Firestore;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  // Room Operations
  async addRoom(room: Room): Promise<string> {
    const docRef = await addDoc(collection(this.db, 'rooms'), room);
    return docRef.id;
  }

  async updateRoom(id: string, room: Partial<Room>): Promise<void> {
    await updateDoc(doc(this.db, 'rooms', id), room);
  }

  async deleteRoom(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'rooms', id));
  }

  getRooms(): Observable<Room[]> {
    return from(getDocs(collection(this.db, 'rooms'))).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room)))
    );
  }

  // Booking Operations
  async addBooking(booking: Booking): Promise<string> {
    const docRef = await addDoc(collection(this.db, 'bookings'), booking);
    return docRef.id;
  }

  async updateBooking(id: string, booking: Partial<Booking>): Promise<void> {
    await updateDoc(doc(this.db, 'bookings', id), booking);
  }

  getUserBookings(userId: string): Observable<Booking[]> {
    const q = query(collection(this.db, 'bookings'), where('userId', '==', userId));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking)))
    );
  }

  // Feedback Operations
  async addFeedback(feedback: Feedback): Promise<string> {
    const docRef = await addDoc(collection(this.db, 'feedback'), feedback);
    return docRef.id;
  }

  getRoomFeedback(roomId: string): Observable<Feedback[]> {
    const q = query(collection(this.db, 'feedback'), where('roomId', '==', roomId));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feedback)))
    );
  }

  // User Profile Operations
  async updateUserProfile(uid: string, profile: Partial<UserProfile>): Promise<void> {
    await updateDoc(doc(this.db, 'users', uid), profile);
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const docSnap = await getDoc(doc(this.db, 'users', uid));
    return docSnap.exists() ? { uid: docSnap.id, ...docSnap.data() } as UserProfile : null;
  }

  // Statistics for Admin
  async getBookingStats(): Promise<{ total: number; confirmed: number; cancelled: number }> {
    const snapshot = await getDocs(collection(this.db, 'bookings'));
    const bookings = snapshot.docs.map(doc => doc.data() as Booking);
    
    return {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length
    };
  }
}