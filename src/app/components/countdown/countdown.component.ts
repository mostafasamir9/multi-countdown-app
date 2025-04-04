import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Timer } from 'src/app/models/timer';
import { EventEmitter } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';

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

  constructor(private timerService: TimerService) {
    
  }
  
  ngOnInit(){
    this.startTimer();
  }

  startTimer(){
    this.updateTimeLeft();
    this.intervalId = setInterval(() => {
      if(!this.timer.paused || (this.timer.paused && this.timeLeft === '')){
        this.updateTimeLeft();
      }
    }, 1000);
  }

  updateTimeLeft(){
    let diff : number|null;
    if (!this.timer.paused)
    { 
     diff = this.timer.endTime!.getTime() - Date.now();
    } 
    else 
    {
     diff = this.timer.remainingTime;
    }

    if(diff! <= 0){
      this.timeLeft = '- - -';
      clearInterval(this.intervalId);
      if(!this.timer.notified)
      {
        this.timerService.timeEnded(this.timer);
      }
    } else {
      const minutes = Math.floor(diff!/60000);
      const seconds = Math.floor((diff!%60000)/1000);
      this.timeLeft = `${minutes}m ${seconds}s`;
    }
  }

  togglePause(){
    if (this.timer.paused){
      this.timer.endTime = new Date(Date.now() + (this.timer.remainingTime || 0));
      this.timer.paused = false;
    } else {
      this.timer.remainingTime = this.timer.endTime!.getTime() - Date.now();
      this.timer.paused = true;
    }
    this.timerChanged.emit(this.timer);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  restartTimer(): void {
    this.timer.endTime = new Date(Date.now() + this.timer.originalTime! * 60 * 1000),
    this.timer.notified = false;
    this.timer.paused = false;
    this.updateTimeLeft();
    this.togglePause();
    this.startTimer();

  }
  addMinute(min: number): void {
    if (!this.timer.endTime) return;
  
    this.timer.endTime = new Date(this.timer.endTime.getTime() + min * 60 * 1000);
    this.timer.remainingTime = (this.timer.remainingTime ?? 0) + min * 60 * 1000;
    this.updateTimeLeft();
  }

}
