import { Component, signal, ViewChild } from '@angular/core';
import { ClockComponent } from './components/clock-component/clock-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ClockComponent, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lab06');
  public showClock: boolean = false;
  public lastTime: string | null = null;
  public format: '12' | '24' = '24';

  @ViewChild(ClockComponent)
  private clockComponent?: ClockComponent;

  public createClock(): void {
    this.lastTime = null;
    this.showClock = true;
  }

  public removeClock(): void {
    if (this.clockComponent) {
      this.lastTime = this.clockComponent.getCurrentTime();
    }

    this.showClock = false;
  }
}
