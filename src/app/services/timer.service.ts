import { Injectable } from '@angular/core';
import { Timer } from '../models/timer'
@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private key = 'timers';

  loadTimers() : Timer[] {
    const rawTimers = JSON.parse(localStorage.getItem(this.key) || '[]');
    return rawTimers.map((timer:any)=>({
      ...timer,
      endTime:new Date(timer.endTime)
    }))
  }
  saveTimers(timers : Timer[]){
    const serializedTimers = timers.map(timer => ({
      ...timer,
      endTime: timer.endTime.toISOString()
    }))
    localStorage.setItem(this.key, JSON.stringify(serializedTimers));
  }
}
