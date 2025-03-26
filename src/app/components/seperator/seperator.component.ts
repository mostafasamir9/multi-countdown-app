import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timer } from 'src/app/models/timer';

@Component({
  selector: 'app-seperator',
  templateUrl: './seperator.component.html',
  styleUrls: ['./seperator.component.css']
})
export class SeperatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() timer !: Timer;
  @Output() removeSeparator = new EventEmitter<number>();

  removeTimer(){
    this.removeSeparator.emit(this.timer.id);
  }
}
