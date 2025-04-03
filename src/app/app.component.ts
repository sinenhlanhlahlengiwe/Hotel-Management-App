import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="app-container">
      <nav class="navbar">
        <div class="nav-brand">Four Seasons SA</div>
        <div class="nav-links">
          <a routerLink="/">Home</a>
          <a routerLink="/rooms">Rooms</a>
          <a routerLink="/about">About</a>
          <a routerLink="/contact">Contact</a>
          <ng-container *ngIf="!(isLoggedIn$ | async)">
            <a routerLink="/login" class="auth-link">Login</a>
            <a routerLink="/register" class="auth-link">Register</a>
          </ng-container>
          <ng-container *ngIf="isLoggedIn$ | async">
            <a routerLink="/profile" class="auth-link">Profile</a>
            <button (click)="logout()" class="logout-btn">Logout</button>
          </ng-container>
        </div>
      </nav>

      <main>
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Four Seasons SA</h3>
            <p>Experience luxury in the heart of South Africa</p>
          </div>
          <div class="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info&#64;fourseasonssa.com</p>
            <p>Phone: +27 11 123 4567</p>
          </div>
          <div class="footer-section">
            <h3>Follow Us</h3>
            <div class="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Four Seasons SA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;500;600;700&display=swap');

    :host {
      display: block;
      font-family: 'Montserrat Alternates', sans-serif;
      scroll-behavior: smooth;
    }

    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3') center/cover fixed;
    }

    .app-container::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 32, 0, 0.6);
      z-index: 0;
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(0, 64, 0, 0.9);
      backdrop-filter: blur(10px);
      z-index: 1000;
    }

    .nav-brand {
      font-size: 1.5rem;
      font-weight: 700;
      color: #e0f2e0;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-links a {
      color: #e0f2e0;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-links a:hover {
      color: #90EE90;
    }

    .auth-link {
      padding: 0.5rem 1rem;
      border: 2px solid #90EE90;
      border-radius: 4px;
    }

    .logout-btn {
      padding: 0.5rem 1rem;
      background: #006400;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: 'Ubuntu', sans-serif;
      transition: background-color 0.3s ease;
    }

    .logout-btn:hover {
      background: #008000;
    }

    main {
      flex: 1;
      margin-top: 4rem;
      position: relative;
      z-index: 1;
    }

    section {
      min-height: 100vh;
      padding: 6rem 2rem;
      position: relative;
      transition: transform 0.6s ease-out, opacity 0.6s ease-out;
    }

    section:target {
      transform: translateY(0);
      opacity: 1;
    }

    section:not(:target) {
      transform: translateY(20px);
      opacity: 0.8;
    }

    .footer {
      background: #004d00;
      color: #e0f2e0;
      padding: 3rem 2rem 1rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-section h3 {
      color: #90EE90;
      margin-bottom: 1rem;
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-links a {
      color: #e0f2e0;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .social-links a:hover {
      color: #90EE90;
    }

    .footer-bottom {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(144, 238, 144, 0.2);
    }

    @media (max-width: 768px) {
      .navbar {
        flex-direction: column;
        padding: 1rem;
      }

      .nav-links {
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
      }

      .footer-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  isLoggedIn$: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isAuthenticated();
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
