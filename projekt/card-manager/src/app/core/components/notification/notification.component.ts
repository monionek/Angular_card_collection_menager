import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppNotification, NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [AsyncPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  private readonly notificationService = inject(NotificationService);

  public readonly notification$: Observable<AppNotification | null> =
    this.notificationService.notification$;
}

