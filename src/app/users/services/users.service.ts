import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _HttpClient: HttpClient = inject(HttpClient);

  getUsers(skip = 0, limit = 30): Observable<any> {
    return this._HttpClient.get(
      `https://dummyjson.com/users?skip=${skip}&limit=${limit}`
    );
  }
  deleteUser(id: number): Observable<any> {
    return this._HttpClient.delete(`https://dummyjson.com/users/${id}`);
  }
  addNewUser(data: any): Observable<any> {
    return this._HttpClient.post('https://dummyjson.com/users/add', data);
  }
}
