import { Injectable } from '@angular/core';
import { Timer } from '../models/timer'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private key = '';
  private timerEndSubject = new Subject<string>();
  onTimerEnd = this.timerEndSubject.asObservable();

  loadTimers(page:string) : Timer[] {
    this.key = `timers_${page}`
    const rawTimers = JSON.parse(localStorage.getItem(this.key) || '[]');
    return rawTimers.map((timer:any)=>({
      ...timer,
      endTime: new Date(timer.endTime),
      paused: timer.paused || false,
      remainingTime: timer.remainingTime || 0,
      originalTime: timer.originalTime
    }));
  }
  saveTimers(timers : Timer[], page:string){
    this.key = `timers_${page}`
    localStorage.setItem(this.key, JSON.stringify(timers));
  }

  removeTimers(page:string){
    this.key = `timers_${page}`
    localStorage.setItem(this.key, JSON.stringify([]));
  }

  savePages(pages : string[]){
    this.key = `pages`
    localStorage.setItem(this.key, JSON.stringify(pages));
  }

  loadPages() : string[] {
    this.key = `pages`
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  timeEnded(timer : Timer){
    this.timerEndSubject.next(timer.description);
    timer.notified = true;
  }
}
