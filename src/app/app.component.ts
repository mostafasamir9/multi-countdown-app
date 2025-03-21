import { ChangeDetectorRef, Component } from '@angular/core';
import { Timer } from './models/timer';
import { TimerService } from './services/timer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private timerService: TimerService) {
    
  }

  ngOnInit(){
    this.timerService.onTimerEnd.subscribe((desc) => {
      this.showNotification(desc);
    });
  }

  showNotification(desc : string) {
    new Notification("Time's Up!", {
      body: `Your timer ${desc} has ended.`
        });
  }
}
