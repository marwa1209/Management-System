import { Component, inject } from '@angular/core';
import { UsersService } from './services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  listUsers: any[] = [];
  newUser: any;
  updatedUser: any;
  allData: any;
  searchQuery:string='';
  private _UsersService: UsersService = inject(UsersService);
  private _Router: Router = inject(Router);
  private _SearchService: SearchService = inject(SearchService);
  ngOnInit() {
    const newUser = localStorage.getItem('newUser');
    const updatedUser = localStorage.getItem('updaatedUser');
    if (newUser) {
      this.newUser = JSON.parse(newUser);
      localStorage.removeItem('newUser');
    }
    if (updatedUser) {
      this.updatedUser = JSON.parse(updatedUser);
      localStorage.removeItem('updatedUser');
    }
    this._SearchService.searchQuery$.subscribe((query) => {
      this.searchQuery=query;
      this.getAllUsers(0, 5, query);

    });
  }

  getAllUsers(skip?: number, itemPerPage?: number, searchQuery?: string) {
    this._UsersService.getUsers(skip, itemPerPage, searchQuery).subscribe({
      next: (res) => {
        this.allData = res;
        this.listUsers = res.users;

        if (this.newUser != undefined) this.listUsers.unshift(this.newUser);
        if (this.updatedUser != undefined) {
          this.listUsers = this.listUsers.filter(
            (user) => user.id !== this.updatedUser.id
          );
          this.listUsers.unshift(this.updatedUser);
        }
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
  editUser(id: number) {
    this._Router.navigate(['home/users/update-user', id]);
  }
  onPageChange(event: PageEvent) {
    const skip = event.pageIndex * event.pageSize;
    const take = event.pageSize;

    this.getAllUsers(skip, take ,this.searchQuery);
  }
}
