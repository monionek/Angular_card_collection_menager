import { Component, signal } from '@angular/core';
import { PostFormComponent } from './components/post-form-component/post-form-component';
import { PostList } from './components/post-list/post-list';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [PostFormComponent, PostList],
  templateUrl: './app.html',
  providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lab07');
}
