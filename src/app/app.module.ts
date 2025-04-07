import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BookingComponent } from './rooms/booking/booking.component';
import { AuthService } from './auth/auth.service';
import { RoomService } from './rooms/room.service';

const routes: Routes = [
  { path: 'rooms', component: RoomsComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }