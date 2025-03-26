import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Timer } from 'src/app/models/timer';
import { TimerService } from 'src/app/services/timer.service';
import { PageNameDialogComponent } from '../page-name-dialog/page-name-dialog.component';

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

  separators: Array<number> = [];
  separatorCounter = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timerService: TimerService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
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

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    this.timerService.savePages(this.pages)
    this.timerService.saveTimers(this.timers,this.currentPage);
  }
  
  
  deletePage(){
    this.pages = this.pages.filter(page => page !== this.currentPage);
    this.timerService.savePages(this.pages);
    localStorage.removeItem(`timers_${this.currentPage}`);
    const newPage = this.pages.length > 0 ? this.pages[0] : 'main';
    this.switchPage(newPage)
  }

  addTimer(){
    const newTimer: Timer = {
      id: Date.now(),
      description: this.description,
      endTime: new Date(Date.now() + this.minutes * 60 * 1000),
      paused: false,
      remainingTime: 0,
      originalTime: this.minutes,
      notified: false,
      type: "timer"
    };

    this.timers.push(newTimer);
    this.timerService.savePages(this.pages)
    this.timerService.saveTimers(this.timers,this.currentPage);
  }

  addSeparator() {

    const newSeperator: Timer = {
      id: Date.now(),
      description: this.description,
      endTime:null,
      paused: null,
      remainingTime: null,
      originalTime: null,
      notified: false,
      type: "separator"
    };

    this.timers.push(newSeperator);
    this.timerService.savePages(this.pages)
    this.timerService.saveTimers(this.timers,this.currentPage);
  }

  removeTimer(id: number){
    this.timers = this.timers.filter(t => t.id !== id);
    this.timerService.saveTimers(this.timers,this.currentPage);
  }

  updateTimer(updateTimer: Timer){
    this.timerService.saveTimers(this.timers,this.currentPage);
  }

  switchPage(page: string){
    this.timerService.saveTimers(this.timers,this.currentPage);
    this.currentPage = page;
    this.timers = this.timerService.loadTimers(this.currentPage);
    this.router.navigate(['/'+ page])
  }

  addPage(){
    const dialogRef = this.dialog.open(PageNameDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pages.push(result);
        this.switchPage(result);
        this.timerService.savePages(this.pages);
      }
    });

  }

  
  isSeparator(timer: Timer) : boolean
  {
    if(timer.type == "separator")
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
}
