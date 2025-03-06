import { Injectable } from '@angular/core';
import { Timer } from '../models/timer'
@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private key = '';

  loadTimers(page:string) : Timer[] {
    this.key = `timers_${page}`
    const rawTimers = JSON.parse(localStorage.getItem(this.key) || '[]');
    return rawTimers.map((timer:any)=>({
      ...timer,
      endTime: new Date(timer.endTime),
      paused: timer.paused || false,
      remainingTime: timer.remainingTime || 0
    }));
  }
  saveTimers(timers : Timer[], page:string){
    this.key = `timers_${page}`
    localStorage.setItem(this.key, JSON.stringify(timers));
  }

  savePages(pages : string[]){
    this.key = `pages`
    localStorage.setItem(this.key, JSON.stringify(pages));
  }

  loadPages() : string[] {
    this.key = `pages`
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }
}
