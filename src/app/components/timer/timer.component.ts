import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timer } from 'src/app/models/timer';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer-component',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timers: Timer[] = [];
  description = '';
  minutes = 0;

  pages: string[];
  currentPage: string = 'main';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timerService: TimerService,
    private cdr: ChangeDetectorRef
  ) {
    this.pages = this.timerService.loadPages();
    if (this.pages.length == 0)
    {
      this.pages = ['main'];
      this.timerService.savePages(this.pages);
    }
  }

  ngOnInit() {
    this.currentPage = this.route.snapshot.paramMap.get('pageName')!;
    if (!this.pages.find(p => p == this.currentPage))
    {
      this.router.navigate(['/main']);
      this.currentPage = 'main';
    }
    this.timers = this.timerService.loadTimers(this.currentPage);
    this.cdr.detectChanges();
  }
  
  deletePage(){
    this.pages = this.pages.filter(page => page !== this.currentPage);
    this.timerService.savePages(this.pages);
    localStorage.removeItem(`timers_${this.currentPage}`);
    const newPage = this.pages.length > 0 ? this.pages[0] : 'main'; // Default to 'home' if empty
    this.switchPage(newPage)
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
    this.timerService.savePages(this.pages)

  }
}
