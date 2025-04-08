import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared-module/shared.module';
import { AddUserComponent } from './add-user/add-user.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';


@NgModule({
  declarations: [UsersComponent, AddUserComponent, UpdateUserComponent, AddUpdateUserComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule, MatPaginatorModule],
})
export class UsersModule {}
