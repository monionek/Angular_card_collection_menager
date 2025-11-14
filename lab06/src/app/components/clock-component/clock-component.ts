import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-clock-component',
  imports: [],
  templateUrl: './clock-component.html',
  styleUrl: './clock-component.scss',
})
export class ClockComponent implements OnInit, OnDestroy{
  @Input({ required: true }) public format!: '12' | '24';
  time = '';
  private intervalId?: number;
  running = signal(true);
  constructor(private datePipe: DatePipe) {}
  ngOnInit() {
    this.updateTime();

    this.intervalId = window.setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  // updateTime() {
  //   if (this.format === '12') {
  //     this.time = new Date().toLocaleTimeString('eng-US');
  //   } else {
  //     this.time = new Date().toLocaleTimeString('eng-GB');
  //   }
  // }
    updateTime() {
    const pattern = this.format === '24' ? 'HH:mm:ss' : 'hh:mm:ss a';
    this.time = this.datePipe.transform(new Date(), pattern)!;
  }
    start() {
    if (this.intervalId) return;
    this.running.set(true);
    this.updateTime();
    this.intervalId = window.setInterval(() => this.updateTime(), 1000);
  }

  stop() {
    if (!this.intervalId) return;
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.running.set(false);
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}