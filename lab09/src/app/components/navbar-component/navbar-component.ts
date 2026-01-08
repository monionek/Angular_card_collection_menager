import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../services/current-user-service';
import { map, take, tap, toArray } from 'rxjs/operators';
import { forkJoin, Observable, Subscribable } from 'rxjs';
import { User } from '../../models/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar-component',
  imports: [AsyncPipe],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent  implements OnInit {
  user$: Observable<User>;

  constructor(private currentUserService: CurrentUserService) {
    this.user$ = this.currentUserService.user$;
  }

  ngOnInit(): void {
    // Zad1
    // this.currentUserService.getRandomNumber$().pipe(
    //   take(5),
    //   tap(value => console.log(value)),
    //   toArray()
    // ).subscribe();

    // Zad2
    // forkJoin({
    //   adults: this.currentUserService.getUsers$(),
    //   children: this.currentUserService.getChildren$()
    // }).pipe(
    //   map(({ adults, children }) => [...adults, ...children])
    // ).subscribe(results => {
    //   console.log(results)
    // })
  }
}
