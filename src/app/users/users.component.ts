import { Component, inject } from '@angular/core';
import { UsersService } from './services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  listUsers: any[] = [];
  newUser: any;
  allData: any;
  private _UsersService: UsersService = inject(UsersService);
  private _Router: Router = inject(Router);
  ngOnInit() {
    const newUser = localStorage.getItem('newUser');
    if (newUser) {
      this.newUser = JSON.parse(newUser);
      localStorage.removeItem('newUser');
    }
    this.getAllUsers(0,5);
  }

  getAllUsers(skip?:number , itemPerPage?:number) {
    this._UsersService.getUsers(skip, itemPerPage).subscribe({
      next: (res) => {
        this.allData = res;
        this.listUsers = res.users;

        if (this.newUser != undefined) this.listUsers.unshift(this.newUser);
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

  onPageChange(event: PageEvent) {
    const skip = event.pageIndex * event.pageSize;
    const take = event.pageSize;

    this.getAllUsers(skip, take);
  }
}
