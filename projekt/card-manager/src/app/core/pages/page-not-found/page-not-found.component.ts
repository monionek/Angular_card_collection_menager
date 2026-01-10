import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  public navigateToCollections(): void {
    void this.router.navigate(['/collections']);
  }

  public navigateToParent(): void {
    void this.router.navigate([".."], {relativeTo: this.route});
  }
}
