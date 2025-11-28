import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface AddressForm {
  street: FormControl<string | null>;
  city: FormControl<string | null>;
}

export interface UserForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;

  addresses: FormArray<FormGroup<AddressForm>>;
}
