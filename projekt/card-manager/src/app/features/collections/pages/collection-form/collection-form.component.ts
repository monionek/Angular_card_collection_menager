import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormArray, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { colorsValidator } from './colorValidator';
import { Collection, Color } from '../../../models/collection.model';
import { CollectionsService } from '../../services/collections.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { EMPTY, map, switchMap, tap } from 'rxjs';
import { LowerCasePipe } from '@angular/common';
import { CollectionForm, CardForm} from '../../../models/collectionForm.model'

@Component({
  selector: 'app-collection-form',
  imports: [ReactiveFormsModule, RouterLink, LowerCasePipe],
  templateUrl: './collection-form.component.html',
  styleUrl: './collection-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionFormComponent implements OnInit {
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly collectionsService: CollectionsService = inject(CollectionsService);
  private readonly router: Router = inject(Router);
  public isEditMode: boolean = false;
  private collectionId: string | null = null;
  private currentCollection: Collection | null = null;
  public readonly colors: readonly Color[] = [
  'WHITE',
  'BLUE',
  'BLACK',
  'RED',
  'GREEN',
  'COLORLESS',
];


  public readonly collectionForm: CollectionForm = this.formBuilder.group({
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
  cards:  this.formBuilder.array<CardForm>([])
  });

  public ngOnInit(): void {
    this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      tap((id) => {
        this.collectionId = id;
        this.isEditMode = !!id;
      }),
      switchMap((id) => id ? this.collectionsService.getById(id) : EMPTY),
      tap((collection) => {
        this.patchCollection(collection);
        this.currentCollection = collection;})
    ).subscribe();
  }

  public get cardsFormArray(): FormArray<CardForm> {

    return this.collectionForm.controls.cards;
  };

  private createCardForm(): CardForm {
    return this.formBuilder.group({
      name: this.formBuilder.control('', Validators.minLength(3))
    });
  }

  public removeCard(index: number): void {
    this.cardsFormArray.removeAt(index);
  };

  public addCard(): void {
    this.cardsFormArray.push(this.createCardForm());
  }

  public onSubmit(): void {
   if (this.collectionForm.invalid) {
     this.collectionForm.markAllAsTouched();
     
     return;
   }

   const { name, colors, cards } = this.collectionForm.getRawValue();


  const cardNames: string[] = cards.map((card) => card.name);
   const selectedColors: Color[] = Object.entries(colors)
     .filter(([, selected]) => selected)
     .map(([color]) => color as Color);

   if (this.isEditMode && this.collectionId !== null && this.currentCollection) {
     const updatedCollection: Collection = {
       ...this.currentCollection,
       name,
       cards: cardNames,
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
     .create(name, selectedColors, cardNames)
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

  private patchCollection(collection: Collection): void {
          const { name, colors, cards} = collection;
          this.collectionForm.controls.name.setValue(name);
          Object.keys(this.collectionForm.controls.colors.controls).forEach(
          (color) => {
            this.collectionForm.controls.colors.controls[color as Color].setValue(colors.includes(color as Color));
          });
          
          this.cardsFormArray.clear();
          cards.forEach((cardName) => {
            this.cardsFormArray.push(
              this.formBuilder.group({
                name: this.formBuilder.control(cardName, Validators.minLength(3))
              })
            );
          }
        );
      }
}