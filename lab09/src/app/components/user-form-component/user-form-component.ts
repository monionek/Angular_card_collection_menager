import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CurrentUserService } from '../../services/current-user-service';
import { AlertService } from '../../services/alert-service';

@Component({
  selector: 'app-user-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private currentUserService: CurrentUserService,
    private alertService: AlertService
  ) {
    this.userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
  }
  submit() {
    if (this.userForm.invalid) return;
    this.currentUserService.updateUser(this.userForm.value as any);
      this.alertService.show('Dane użytkownika zapisane ✅');
  }
}
