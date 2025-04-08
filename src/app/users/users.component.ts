import { Component, inject } from '@angular/core';
import { UsersService } from './services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  listUsers: any[] = [];
  newUser:any;
  allData: any;
  private _UsersService: UsersService = inject(UsersService);
  private _Router: Router = inject(Router);
  private _ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    this.getAllUsers();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      if (params['newUser']) {
       this.newUser = JSON.parse(params['newUser']);
        console.log(this.newUser);

      }
    });
  }
  getAllUsers() {
    this._UsersService.getUsers().subscribe({
      next: (res) => {
        this.allData = res;
        this.listUsers = res.users;
        this.listUsers.unshift(this.newUser);
      },
      error: (err) => console.error('Error:', err),
      complete: () => console.log('Users fetched!'),
    });
  }
  deleteUser(id: number) {
    this._UsersService.deleteUser(id).subscribe({
      next: (res) => {
        this.listUsers = this.listUsers.filter((user) => user.id !== id);
      },
      error: (err) => console.error('Error:', err),
      complete: () => console.log('User deleted!'),
    });
  }
  addNewUser() {
    this._Router.navigate(['home/users/add-user']);
  }
}
