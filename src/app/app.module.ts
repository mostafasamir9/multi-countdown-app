import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountdownComponent } from './components/countdown/countdown.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TimerComponentComponent } from './components/timer-component/timer-component.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    TimerComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule, // ✅ Make sure this is added
    RouterModule,     // ✅ Add this if not already
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
