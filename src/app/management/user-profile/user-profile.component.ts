import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  addressForm = this.fb.group({
    email: 'anna.lindqvist@mail.com',
    firstName: ['Anna', Validators.required],
    lastName: ['Lindqvist', Validators.required],
    phone: null,
    timezone: null,
    password: null,
    passwordRepeat: null
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    alert('Thanks!');
  }
}
