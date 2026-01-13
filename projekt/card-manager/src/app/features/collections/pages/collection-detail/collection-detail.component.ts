import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CollectionsService } from '../../services/collections.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap, of, map, tap, take } from 'rxjs';
import { Collection, Color } from '../../../models/collection.model';
import { AsyncPipe } from '@angular/common';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../../../core/services/auth.service';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { colorsValidator } from '../collection-form/colorValidator';
import { outputToObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-collection-detail',
  imports: [AsyncPipe, RouterLink, ReactiveFormsModule],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDetailComponent {
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly collectionsService: CollectionsService = inject(CollectionsService);
  private readonly router: Router = inject(Router);
  public readonly isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  private collectionId: string | null = null;
  private readonly formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  public readonly collection$: Observable<Collection | null> =
    this.route.paramMap.pipe(
      map((paramMap) => {
        const id = paramMap.get('id');
        this.collectionId = id;
        
        return id;
        }),
      switchMap((id: string | null) => {
        if (id === null) {
          void this.router.navigate(['/not-found']);

          return of<Collection | null>(null);
        }
        
        return this.collectionsService.getById(id);
      })
  );
  private readonly avaiableColors$: Observable<Color[]> = this.collection$
  .pipe(
    (map((collection) => {
       if (collection === null) {return [];} 
      const colors: Color[] = [... collection.colors];
      if (colors.some((c) => c !== "COLORLESS")) {
        colors.push("COLORLESS");
      }

      return colors;
    })));


  public readonly collectionDetailForm = this.formBuilder.group({
    cards: this.formBuilder.array([])
  });

  private createCardForm(colors: Color[]): FormGroup {
    return this.formBuilder.group({
      name: ['', { validators: [Validators.required, Validators.minLength(2)]}],
      colors: this.buildColorsGroup(colors),
      manaCost: [0, { validators: [Validators.required, Validators.min(0)]}],
      attack: [0, { validators: [Validators.required, Validators.min(0)]}],
      health: [1, { validators: [Validators.required, Validators.min(1)]}],

    });
  }

  public get cardsFormArray(): FormArray {
    return this.collectionDetailForm.get('cards') as FormArray;
  }

  public buildColorsGroup(colors: Color[]): FormGroup {
    const controls: Record<Color, FormControl<boolean>> = {} as Record<
      Color,
      FormControl<boolean>
    >;

    for (const color of colors) {
      controls[color] = this.formBuilder.control(false);
    }

    return this.formBuilder.group(controls, {
      validators: colorsValidator(),
    });
  }

  public delete(): void {
    if (!this.collectionId) {
      return;
    }
  
    const confirmed = confirm('Are you sure you want to delete this collection?');
    if (!confirmed) {
      return;
    }
  
    this.collectionsService.delete(this.collectionId).subscribe({
      next: () => {
        this.notificationService.success('Collection deleted');
        void this.router.navigate(['/collections']);
      },
      error: () => {
        this.notificationService.error('Failed to delete this Collection');
      },
    });
  }
}