import { Component } from '@angular/core';
import { RandomNumberComponent } from './components/random-number/random-number.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RandomNumberComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lab09';
}
