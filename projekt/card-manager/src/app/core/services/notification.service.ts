import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type NotificationType = 'success' | 'error';

export interface AppNotification {
  readonly type: NotificationType;
  readonly message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationSubject: BehaviorSubject<AppNotification | null> =
    new BehaviorSubject<AppNotification | null>(null);

  public readonly notification$: Observable<AppNotification | null> =
    this.notificationSubject.asObservable();

  public success(message: string): void {
    this.showNotification({
      type: 'success',
      message,
    });
  }

  public error(message: string): void {
    this.showNotification({
      type: 'error',
      message,
    });
  }

  private showNotification(notification: AppNotification): void {
    this.notificationSubject.next(notification);

    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 3000);
  }
}