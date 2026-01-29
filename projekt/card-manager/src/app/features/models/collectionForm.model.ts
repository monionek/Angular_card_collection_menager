import { FormControl, FormGroup, FormArray} from "@angular/forms";
import { Color } from "./collection.model";

export type CardForm = FormGroup<{
  name: FormControl<string>;
}>;

export type CollectionForm = FormGroup<{
  name: FormControl<string>;
  colors: FormGroup<Record<Color, FormControl<boolean>>>;
  cards: FormArray<CardForm>;
}>;