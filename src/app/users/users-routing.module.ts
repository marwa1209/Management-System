import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
