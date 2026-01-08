import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar-component/navbar-component';
import { AlertComponent } from "./components/alert-component/alert-component";
import { UserFormComponent } from "./components/user-form-component/user-form-component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, AlertComponent, UserFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lab09');
}
