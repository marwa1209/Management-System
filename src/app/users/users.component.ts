import { Component, inject } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
listUsers:any[]=[];
allData:any;
private _UsersService: UsersService=inject(UsersService);
ngOnInit() {
this.getAllUsers();
}
getAllUsers(){
  this._UsersService.getUsers().subscribe({
    next: (res) =>
      {
        this.allData = res;
        this.listUsers = res.users
      },
    error: (err) => console.error('Error:', err),
    complete: () => console.log('Users fetched!')
  });
}
}
