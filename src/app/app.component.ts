import { Component } from '@angular/core';
import { Timer } from './models/timer';
import { TimerService } from './services/timer.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timers: Timer[] = [];
  description = '';
  minutes = 0;

  constructor(private timerService: TimerService) {}

  ngOnInit(){
    this.timers = this.timerService.loadTimers();
  }

  addTimer(){
    const newTimer: Timer = {
      id: Date.now(),
      descriptiom: this.description,
      endTime: new Date(Date.now() + this.minutes * 60 * 1000)
    };

    this.timers.push(newTimer);
    this.timerService.saveTimers(this.timers);
  }

  removeTimer(id: number){
    this.timers = this.timers.filter(t => t.id !== id);
    this.timerService.saveTimers(this.timers);
  }
}
