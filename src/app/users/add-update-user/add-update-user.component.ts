import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss'],
})
export class AddUpdateUserComponent {
  @Input() initialData: any = null;
  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Input() label: 'Add New' | 'Update' = 'Add New';
  userForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\+?\d{1,4}[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{4}$/),
    ]),
    birthDate: new FormControl(null, [this.birthDateValidator.bind(this)]),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.initialData) {
      this.userForm.patchValue(this.initialData);
    }
  }
  birthDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const inputDate = new Date(value);
    if (
      typeof value !== 'string' ||
      isNaN(inputDate.getTime()) ||
      !/^\d{4}-\d{1,2}-\d{1,2}$/.test(value)
    ) {
      return { invalidDate: true };
    }
    const today = new Date();
    if (inputDate > today) return { futureDate: true };
    const age = today.getFullYear() - inputDate.getFullYear();
    if (age > 120) return { tooOld: true };
    return null;
  }

  markAllAsTouched() {
    Object.values(this.userForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  onSubmit() {
    this.markAllAsTouched();
    if (this.userForm.invalid) return;
    this.formSubmit.emit(this.userForm);
  }
}