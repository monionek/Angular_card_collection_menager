import { Injectable } from '@angular/core';
import { interval, map, take, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandServiceService {

  constructor() { }

  getRandomNumbers() {
    return interval(3000).pipe(
      map(() => Math.floor(Math.random() * 100) + 1),
      take(5),
      toArray()
    )
  }
}
