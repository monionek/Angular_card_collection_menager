import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { colorsValidator } from './validator';

@Component({
  selector: 'app-collection-form',
  imports: [],
  templateUrl: './collection-form.component.html',
  styleUrl: './collection-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionFormComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  public isEditMode: boolean = false;
  private collectionId: string | null = null;

  public readonly collectionForm = this.formBuilder.group({
    name: ['', Validators.required, Validators.minLength(3)],
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
}