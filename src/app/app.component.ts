import { Component } from '@angular/core';
import { Timer } from './models/timer';
import { TimerService } from './services/timer.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timers: Timer[] = [];
  description = '';
  minutes = 0;

  pages: string[] = ['main'];
  currentPage: string = this.pages[0];

  constructor(private route: ActivatedRoute,private router: Router,private timerService: TimerService) {
    this.pages = this.timerService.loadPages();

  }

  ngOnInit(){

    this.route.paramMap.subscribe(params =>{
      this.currentPage = params.get('pageName')!;
    })

    this.timers = this.timerService.loadTimers(this.currentPage);
    this.switchPage(this.currentPage);

  }

  addTimer(){
    const newTimer: Timer = {
      id: Date.now(),
      descriptiom: this.description,
      endTime: new Date(Date.now() + this.minutes * 60 * 1000),
      paused: false,
      remainingTime: 0
    };

    this.timers.push(newTimer);
    this.timerService.savePages(this.pages)
    this.timerService.saveTimers(this.timers,this.currentPage);
  }

  removeTimer(id: number){
    this.timers = this.timers.filter(t => t.id !== id);
    this.timerService.saveTimers(this.timers,this.currentPage);
  }

  updateTimer(updateTimer: Timer){
    const index = this.timers.findIndex(t=>t.id === updateTimer.id);
    this.timerService.saveTimers(this.timers,this.currentPage);
  }

  switchPage(page: string){
    this.timerService.saveTimers(this.timers,this.currentPage);
    this.currentPage = page;
    this.timers = this.timerService.loadTimers(this.currentPage);
    this.router.navigate(['/'+ page])
  }

  addPage(){
    const newPageName = prompt('Enter Page Name');
    if (newPageName){
      this.pages.push(newPageName);
      this.switchPage(newPageName);
    }
  }
}
