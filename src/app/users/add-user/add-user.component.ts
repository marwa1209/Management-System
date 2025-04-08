import { Component, inject } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  //injected services
  _UserService: UsersService = inject(UsersService);
  _ToasterService: ToastrService = inject(ToastrService);
  _Router: Router = inject(Router);

  onSubmit(data: FormGroup) {
    this._UserService.addNewUser(data.value).subscribe({
      next: (res) => {
        localStorage.setItem('newUser', JSON.stringify(res));
        this._Router.navigate(['/home/users']);
      },
      error: (err) => {
        this._ToasterService.error(err.error.message);
      },
      complete: () => {
        this._ToasterService.success(`${data.value.firstName} Added successfully!`);

      },
    });
  }

}
