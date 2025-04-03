import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatRatingModule } from '@angular/material/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AuthService } from '../../auth/auth.service';
import { Feedback } from '../../shared/models/interfaces';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatRatingModule
  ],
  template: `
    <div class="feedback-container">
      <mat-card class="feedback-form-card" *ngIf="isAuthenticated">
        <mat-card-header>
          <mat-card-title>Leave Your Feedback</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="feedbackForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill">
              <mat-label>Rating</mat-label>
              <input matInput type="number" formControlName="rating" min="1" max="5">
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Comment</mat-label>
              <textarea matInput formControlName="comment" rows="4"></textarea>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="!feedbackForm.valid">
              Submit Feedback
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <div class="feedback-list">
        <mat-card *ngFor="let feedback of feedbacks">
          <mat-card-header>
            <mat-card-title>Rating: {{feedback.rating}}/5</mat-card-title>
            <mat-card-subtitle>{{feedback.createdAt | date}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{feedback.comment}}</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .feedback-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .feedback-form-card {
      margin-bottom: 2rem;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }

    .feedback-list {
      display: grid;
      gap: 1rem;
    }

    button {
      width: 100%;
    }
  `]
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  feedbacks: Feedback[] = [];
  isAuthenticated = false;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.feedbackForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
    this.loadFeedbacks();
  }

  async loadFeedbacks() {
    try {
      // Assuming getRoomFeedback is modified to get all feedbacks if no roomId is provided
      this.feedbacks = await this.firebaseService.getRoomFeedback('all').toPromise();
    } catch (error) {
      this.snackBar.open('Error loading feedbacks', 'Close', { duration: 3000 });
    }
  }

  async onSubmit() {
    if (this.feedbackForm.valid) {
      try {
        const feedback: Feedback = {
          ...this.feedbackForm.value,
          userId: this.authService.auth.currentUser?.uid,
          createdAt: new Date().toISOString()
        };

        await this.firebaseService.addFeedback(feedback);
        this.snackBar.open('Feedback submitted successfully', 'Close', { duration: 3000 });
        this.feedbackForm.reset();
        this.loadFeedbacks();
      } catch (error) {
        this.snackBar.open('Error submitting feedback', 'Close', { duration: 3000 });
      }
    }
  }
}