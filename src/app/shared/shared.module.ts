// MODULE
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ScrollUpComponent } from './components/scroll-up/scroll-up.component';
import { SidebarUserComponent } from './components/sidebar-user/sidebar-user.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';

// PIPES
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderUserComponent,
    LoadingPageComponent,
    NavbarComponent,
    NotFoundComponent,
    ScrollUpComponent,
    SidebarUserComponent,
    ToastComponent,
    ToastNotificationComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderUserComponent,
    LoadingPageComponent,
    NavbarComponent,
    NotFoundComponent,
    ScrollUpComponent,
    SidebarUserComponent,
    ToastComponent,
    ToastNotificationComponent,
    TruncatePipe,
  ]
})
export class SharedModule { }
