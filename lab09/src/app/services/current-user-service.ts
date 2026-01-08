import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, interval, map, of, take, tap, toArray } from 'rxjs';
import { User } from '../models/user';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

interface Adult extends Person {
  job: string;
}

interface Child extends Person {}
@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  // zad1
  // getRandomNumber$() {
  //   return interval(5000).pipe(
  //     map(() => Math.floor(Math.random() * 100) + 1)
  //   );
  // }

  //zad2
//   getUsers$() {
//     return of<Adult[]>([
//       { id: 1, firstName: 'Jan', lastName: 'Kowalski', job: 'Dev' },
//       { id: 2, firstName: 'Anna', lastName: 'Nowak', job: 'Tester' }
//     ]).pipe(
//       delay(Math.random() * 3000)
//     )
//   }
//   getChildren$() {
//   return of<Child[]>([
//     { id: 3, firstName: 'Ola', lastName: 'Kowalska' },
//     { id: 4, firstName: 'Kuba', lastName: 'Nowak' }
//   ]).pipe(
//     delay(Math.random() * 3000)
//   );
// }
  private userSubject = new BehaviorSubject<User>({
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan@test.pl'
  });

  user$ = this.userSubject.asObservable();

  updateUser(user: User) {
    this.userSubject.next(user);
  }
  getCurrentUser(): User {
    return this.userSubject.value;
  }
}
