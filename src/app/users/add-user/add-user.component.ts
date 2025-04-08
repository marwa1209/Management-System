import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  isHidden: boolean = true;
  //injected services
 _UserService:UsersService=inject(UsersService);
  _ToasterService: ToastrService = inject(ToastrService);
  _Router: Router = inject(Router);
  AddUserForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\+?[0-9]{10,15}$/),
    ]),
    birthDate: new FormControl(null, [this.birthDateValidator.bind(this)]),
  });
  birthDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const inputDate = new Date(value);

    if (
      typeof value !== 'string' ||
      isNaN(inputDate.getTime()) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      return { invalidDate: true };
    }

    const today = new Date();

    if (inputDate > today) {
      return { futureDate: true };
    }

    const age = today.getFullYear() - inputDate.getFullYear();
    if (age > 120) {
      return { tooOld: true };
    }

    return null;
  }

  markAllAsTouched() {
    Object.values(this.AddUserForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
    onSubmit(data: FormGroup) {
    this.markAllAsTouched();
    if (this.AddUserForm.invalid) return;
    this._UserService.addNewUser(data.value).subscribe({
      next: (res) => {
      localStorage.setItem('newUser', JSON.stringify(res));
      this._Router.navigate(['/home/users']);      },
      error: (err) => {
        this._ToasterService.error(err.error.message);
      },
      complete: () => {
        this._ToasterService.success(`${data.value.firstName} Added successfully!`);

      },
    });
  }

}
