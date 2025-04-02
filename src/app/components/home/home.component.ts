import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section class="hero-section">
      <div class="hero-content">
        <h1>Welcome to Four Seasons Hotel</h1>
        <p>Experience Luxury in the Heart of South Africa</p>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      height: 100vh;
      background: url('/assets/images/hotel-bg.jpg') no-repeat center center;
      background-size: cover;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #ffffff;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 80, 0, 0.5);
      backdrop-filter: blur(5px);
    }

    .hero-content {
      position: relative;
      z-index: 1;
    }

    h1 {
      font-size: 4rem;
      margin-bottom: 1rem;
      font-family: 'Ubuntu', sans-serif;
      color: #e0f2e0;
    }

    p {
      font-size: 1.5rem;
      color: #b8e6b8;
    }
  `]
})
export class HomeComponent {
}