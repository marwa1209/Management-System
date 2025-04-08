import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _HttpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl = 'https://dummyjson.com/users';

  getUsers(skip = 0, limit = 30, searchQuery = ''): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/search?q=${searchQuery}&skip=${skip}&limit=${limit}`
    );
  }
  deleteUser(id: number): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${id}`);
  }
  addNewUser(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/add`, data);
  }
  getUser(id: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/${id}`);
  }
  updateUser(id: number, data: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/${id}`, data);
  }
}

