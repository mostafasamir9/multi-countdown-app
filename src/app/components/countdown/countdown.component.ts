import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Timer } from 'src/app/models/timer';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit,OnDestroy {
  @Input() timer !: Timer;
  timeLeft !: string;
  private sub !: Subscription;

  ngOnInit() {
    this.updateTime();
    this.sub = interval(1000).subscribe(() => this.updateTime());
  }

  updateTime(){
    const now = new Date().getTime();
    const diff: any = this.timer.endTime.getTime() - now;
    if (diff <= 0){
      this.timeLeft = 'Finished!';
    } else {
      const sec = Math.floor((diff/1000)%60);
      const min = Math.floor((diff/1000/60)%60);
      const hr = Math.floor(diff/1000/60/60);
      this.timeLeft = `${hr}h ${min}m ${sec}s`
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
