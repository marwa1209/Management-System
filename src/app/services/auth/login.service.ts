import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private _HttpClient: HttpClient=inject(HttpClient);
 login(formData:FormGroup):Observable<any>{
  return this._HttpClient.post('https://dummyjson.com/auth/login', formData);
 }
}
