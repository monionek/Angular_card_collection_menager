import { Component } from '@angular/core';
import { AlertService } from '../../services/alert-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-alert-component',
  imports: [AsyncPipe],
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.scss',
})
export class AlertComponent {
  constructor(public alertService: AlertService) {}
}
