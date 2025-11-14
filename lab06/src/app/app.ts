import { Component, signal, viewChild } from '@angular/core';
import { ClockComponent } from './components/clock-component/clock-component';

@Component({
  selector: 'app-root',
  imports: [ClockComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // konik = viewChild(ClockComponent)
  title = signal('lab06');
  showClock = signal(false);
  format = signal<'12' | '24'>('24');
  changeFormat() {
    if (this.format() === '12') {
      this.format.set('24')
    } else {
      this.format.set('12')
    }
  }
}
