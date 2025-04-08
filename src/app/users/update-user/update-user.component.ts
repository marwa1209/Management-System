import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent {
  userId: number = 0;
  userData:any;
  private route: ActivatedRoute = inject(ActivatedRoute);
  _UsersService: UsersService = inject(UsersService);
    _ToasterService: ToastrService = inject(ToastrService);
    _Router: Router = inject(Router);
  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserById(this.userId);
  }
  getUserById(id:number) {
    this._UsersService.getUser(id).subscribe({
      next: (res) => {
        this.userData=res;
        console.log(res);

      }
    })
  }
    onSubmit(data: FormGroup) {
      this._UsersService.updateUser(this.userId, data.value).subscribe({
        next: (res) => {
          localStorage.setItem('updaatedUser', JSON.stringify(res));
          this._Router.navigate(['/home/users']);
        },
        error: (err) => {
          this._ToasterService.error(err.error.message);
        },
        complete: () => {
          this._ToasterService.success(
            `${data.value.firstName} updated successfully!`
          );
        },
      });
    }
}
