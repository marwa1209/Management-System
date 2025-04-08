import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _HttpClient: HttpClient = inject(HttpClient);
  login(formData: FormGroup): Observable<any> {
    return this._HttpClient.post('https://dummyjson.com/auth/login', formData);
  }
  logOut() {
    localStorage.removeItem('token');
  }
  getUserData(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded;
    }
    return null;
  }
}