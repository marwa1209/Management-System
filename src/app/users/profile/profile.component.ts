import { Component, inject } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  loggedInUserData: any;
  initialData: any;
  //injected services
  _LoginService: LoginService = inject(LoginService);
  _UserService: UsersService = inject(UsersService);
  ngOnInit() {
    this.getLoggedInUserData();
  }
  getLoggedInUserData(): void {
    this.loggedInUserData = this._LoginService.getUserData();
    this.loggedInUserData.id;
    this.getUserData(this.loggedInUserData.id);
  }
  getUserData(id:number) {
    this._UserService.getUser(id).subscribe({
      next: (res) => {
        this.initialData = res;
      },
      error: (err) => {
        console.log(err)
      }

    })
  }
}
