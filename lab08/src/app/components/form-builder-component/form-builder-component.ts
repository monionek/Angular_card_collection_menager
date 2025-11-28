import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-builder-component',
  imports: [],
  templateUrl: './form-builder-component.html',
  styleUrl: './form-builder-component.scss',
})
export class FormBuilderComponent {
  userForm!: FormGroup<{
    firstName: FormControl<string>;
    // firstName: FormControl<string>;
    lastName: FormControl<string>;
  }>;

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: '',
    });

    console.log(this.userForm.value);

    setTimeout(() => {
      this.userForm.controls.firstName.reset();
      console.log('form builder', this.userForm.value);
    });
  }
}

