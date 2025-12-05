import { Component, OnInit } from '@angular/core';
import { RandServiceService } from '../../services/rand-service.service';

@Component({
  selector: 'app-random-number',
  standalone: true,
  imports: [],
  templateUrl: './random-number.component.html',
  styleUrl: './random-number.component.scss'
})
export class RandomNumberComponent implements OnInit {

  constructor(private randomService: RandServiceService) { }

  ngOnInit() {
    this.randomService.getRandomNumbers().subscribe({
      next: (numbers) => {
        console.log('Wszystkie liczby:', numbers);
      },
      complete: () => console.log('Emisja zakończona!')
    });
  }
}
