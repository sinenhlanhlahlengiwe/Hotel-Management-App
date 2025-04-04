import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <div class="about-box">
        <h2>About Our Hotel</h2>
        <div class="content">
          <section class="mission">
            <h3>Our Mission</h3>
            <p>To provide exceptional hospitality services that exceed our guests' expectations while maintaining the highest standards of comfort, luxury, and South African warmth.</p>
          </section>

          <section class="features">
            <h3>Why Choose Us</h3>
            <ul>
              <li>Prime location in the heart of Pretoria</li>
              <li>Luxurious rooms with modern amenities</li>
              <li>24/7 customer service</li>
              <li>Traditional and international cuisine</li>
              <li>State-of-the-art conference facilities</li>
              <li>Spa and wellness center</li>
            </ul>
          </section>

          <section class="history">
            <h3>Our History</h3>
            <p>Established in 2020, our hotel has quickly become a landmark of luxury and comfort in Pretoria. We blend modern sophistication with traditional South African hospitality to create unforgettable experiences for our guests.</p>
          </section>

          <section class="commitment">
            <h3>Our Commitment</h3>
            <p>We are committed to sustainable practices and supporting our local community while providing world-class hospitality services. Our staff undergoes rigorous training to ensure the highest standards of service delivery.</p>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(rgba(0, 80, 0, 0.7), rgba(0, 40, 0, 0.9));
      padding: 2rem;
      font-family: 'Ubuntu', sans-serif;
    }

    .about-box {
      background: rgba(255, 255, 255, 0.95);
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 800px;
    }

    h2 {
      color: #006400;
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    h3 {
      color: #006400;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .content {
      display: grid;
      gap: 2rem;
    }

    section {
      padding: 1rem;
      border-radius: 5px;
      background: rgba(144, 238, 144, 0.1);
    }

    p {
      color: #333;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      color: #333;
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;
    }

    li:before {
      content: '✓';
      color: #006400;
      position: absolute;
      left: 0;
    }

    @media (max-width: 768px) {
      .about-box {
        margin: 1rem;
      }

      .content {
        gap: 1rem;
      }
    }
  `]
})
export class AboutComponent {}