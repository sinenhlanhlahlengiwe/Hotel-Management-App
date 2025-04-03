import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, Auth, User } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
    
    this.auth.onAuthStateChanged((user: User | null) => {
      this.userSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      throw error;
    }
  }

  getUserRole(): string {
    const user = this.auth.currentUser;
    // In a real application, you would fetch the user's role from Firestore
    // For now, we'll return a default role
    return user ? 'guest' : '';
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable(subscriber => {
      this.auth.onAuthStateChanged((user: User | null) => {
        subscriber.next(!!user);
      });
    });
  }
}