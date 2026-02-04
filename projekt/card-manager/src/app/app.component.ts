import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './core/components/notification/notification.component';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { FoterComponent } from "./core/components/footer/foter/foter.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent, NavbarComponent, FoterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
