import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScrollUpComponent } from './components/scroll-up/scroll-up.component';
import { SidebarUserComponent } from './components/sidebar-user/sidebar-user.component';

import { TruncatePipe } from './pipes/truncate.pipe';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderUserComponent,
    NavbarComponent,
    ScrollUpComponent,
    SidebarUserComponent,
    TruncatePipe,
    LoadingPageComponent,
    ToastNotificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderUserComponent,
    NavbarComponent,
    ScrollUpComponent,
    SidebarUserComponent,
    TruncatePipe,
    LoadingPageComponent,
    ToastNotificationComponent
  ]
})
export class SharedModule { }
