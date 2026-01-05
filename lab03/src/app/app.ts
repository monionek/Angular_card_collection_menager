import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { MainContent } from './components/main-content/main-content';
import { Sidebar } from './components/sidebar/sidebar';
@Component({
  selector: 'app-root',
  imports: [Header, MainContent, Sidebar, Footer],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('lab03');
}
