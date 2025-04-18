import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { SectionHeaderComponent } from './shared/components/section-header/section-header.component';import { SharedModule } from './shared/shared-module/shared.module';
import { CommonModule } from '@angular/common';
 @NgModule({
   declarations: [
     AppComponent,
     LoginComponent,
     SideBarComponent,
     NavBarComponent,
     HomeComponent,
     SectionHeaderComponent,
   ],
   imports: [
    CommonModule,
     SharedModule,
     BrowserModule,
     AppRoutingModule,
     BrowserAnimationsModule,
     ToastrModule.forRoot({
       positionClass: 'toast-bottom-right',
       preventDuplicates: true,
       closeButton: true,
       progressBar: true,
       progressAnimation: 'decreasing',
       timeOut: 4000,
       extendedTimeOut: 1000,
       maxOpened: 3,
       enableHtml: true,
     }),
   ],
   providers: [],
   bootstrap: [AppComponent],
 })
 export class AppModule {}
