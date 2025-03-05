import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Timer } from 'src/app/models/timer';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit,OnDestroy {
  @Input() timer !: Timer;
  @Output() timerChanged = new EventEmitter<Timer>();
  timeLeft : string = '';
  private intervalId: any;

  ngOnInit(){
    this.startTimer();
  }

  startTimer(){
    this.updateTimeLeft();
    this.intervalId = setInterval(() => {
      if(!this.timer.paused){
        this.updateTimeLeft();
      }
    }, 1000);
  }

  updateTimeLeft(){
    const diff = this.timer.endTime.getTime() - Date.now();

    if(diff <= 0){
      this.timeLeft = 'Finished';
      clearInterval(this.intervalId);
    } else {
      const minutes = Math.floor(diff/60000);
      const seconds = Math.floor((diff%60000)/1000);
      this.timeLeft = `${minutes}m ${seconds}s`;
    }
  }

  togglePause(){
    if (this.timer.paused){
      this.timer.endTime = new Date(Date.now() + (this.timer.remainingTime || 0));
      this.timer.paused = false;
    } else {
      this.timer.remainingTime = this.timer.endTime.getTime() - Date.now();
      this.timer.paused = true;
    }
    this.timerChanged.emit(this.timer);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

}
