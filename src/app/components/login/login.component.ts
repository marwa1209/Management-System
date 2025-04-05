import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isHidden: boolean = true;
  //injected services

  _LoginService: LoginService = inject(LoginService);
  _ToasterService:ToastrService=inject(ToastrService);
  _Router:Router=inject(Router);
  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(8),
    ]),
  });
  markAllAsTouched() {
    Object.values(this.loginForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  onSubmit(data: FormGroup) {
    this.markAllAsTouched();
    if (this.loginForm.invalid) return;
    this._LoginService.login(data.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token',res.accessToken);
      },
      error: (err) => {
        this._ToasterService.error(err.error.message);
      },
      complete: () => {
        this._ToasterService.success('Logged in successfully!');
        this._Router.navigate(['/home']);
      },
    });
  }
}
