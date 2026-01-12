import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { colorsValidator } from './colorValidator';
import { Collection, Color } from '../../../models/collection.model';
import { CollectionsService } from '../../services/collections.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-collection-form',
  imports: [ReactiveFormsModule],
  templateUrl: './collection-form.component.html',
  styleUrl: './collection-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionFormComponent {
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly collectionsService: CollectionsService = inject(CollectionsService);
  private readonly router: Router = inject(Router);
  public isEditMode: boolean = false;
  private collectionId: string | null = null;

  public readonly collectionForm = this.formBuilder.group({
    name: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    colors: this.formBuilder.group(
      {
        WHITE: this.formBuilder.control(false),
        BLUE: this.formBuilder.control(false),
        BLACK: this.formBuilder.control(false),
        RED: this.formBuilder.control(false),
        GREEN: this.formBuilder.control(false),
        COLORLESS: this.formBuilder.control(false),
      },
    { validators: colorsValidator() }
),
  });

  public constructor() {
    this.route.paramMap.subscribe((paramMap) => {
      const id: string | null = paramMap.get('id');

      this.collectionId = id;
      this.isEditMode = id !== null;
    });
  }

  public onSubmit(): void {
   if (this.collectionForm.invalid) {
     this.collectionForm.markAllAsTouched();
     
     return;
   }

   const { name, colors } = this.collectionForm.getRawValue();

   const selectedColors: Color[] = Object.entries(colors)
     .filter(([, selected]) => selected)
     .map(([color]) => color as Color);

   if (this.isEditMode && this.collectionId !== null) {
     const updatedCollection: Collection = {
       id: this.collectionId,
       name,
       createdAt: new Date().toISOString(),
       colors: selectedColors,
     };

     this.collectionsService
       .update(this.collectionId, updatedCollection)
       .subscribe({
         next: () => {
          this.notificationService.success('Collection updated');
           void this.router.navigate(['/collections']);
         },
         error: () => {
           this.notificationService.error('Failed to update collection');
         },
       });

     return;
   }

   this.collectionsService
     .create(name, selectedColors)
     .subscribe({
       next: () => {
        this.notificationService.success('Collection created');
         void this.router.navigate(['/collections']);
       },
       error: () => {
         this.notificationService.error('Failed to create collection');
       },
     });
  }

}