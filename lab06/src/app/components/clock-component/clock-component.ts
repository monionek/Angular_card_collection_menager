import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-clock-component',
  imports: [],
  templateUrl: './clock-component.html',
  styleUrl: './clock-component.scss',
})
export class ClockComponent implements OnInit, OnDestroy, OnChanges {
  @Input({ required: true }) public format!: '12' | '24';

  protected time: string = '';

  private currentDate: Date = new Date();
  private intervalId: number | null = null;


  public ngOnInit(): void {
    this.updateView();
    this.start();
  }

  public ngOnDestroy(): void {
    this.stop();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['format']) {
      this.updateView();
    }
  }



  public start(): void {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = window.setInterval(() => {
      this.currentDate = new Date();
      this.updateView();
    }, 1000);
  }

  public stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  public getCurrentTime() {
    return this.time;
  }


  private updateView(): void {
    const hours = this.currentDate.getHours();
    const minutes = this.currentDate.getMinutes();
    const seconds = this.currentDate.getSeconds();

    if (this.format === '24') {
      this.time = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    } else {
      const suffix = hours >= 12 ? 'PM' : 'AM';
      const h12 = hours % 12 || 12;
      this.time = `${this.pad(h12)}:${this.pad(minutes)}:${this.pad(seconds)} ${suffix}`;
    }
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }
}