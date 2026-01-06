import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  @Input() public message!: string | null;
  @Output() public close: EventEmitter<void> = new EventEmitter();
}
