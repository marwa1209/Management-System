import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
private _LoginService:LoginService=inject(LoginService);
private _Router:Router=inject(Router);
loggedInUserData:any;
ngOnInit() {
this.getLoggedInUserData();
}
logOut(){
  this._LoginService.logOut();
  this._Router.navigate(['/login']);
}
getLoggedInUserData(){
  this.loggedInUserData = this._LoginService.getUserData();
  return this._LoginService.getUserData();
}
}
