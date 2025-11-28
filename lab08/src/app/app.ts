import { Component, signal } from '@angular/core';
import { ReactiveForms } from './components/reactive-forms/reactive-forms';
import { FormBuilderComponent } from './components/form-builder-component/form-builder-component';

@Component({
  selector: 'app-root',
  imports: [ReactiveForms, FormBuilderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lab08');
}
