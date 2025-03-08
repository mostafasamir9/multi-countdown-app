import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer/timer.component';

const routes: Routes = [
  { path: ':pageName', component: TimerComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], 
})
export class AppRoutingModule { }
