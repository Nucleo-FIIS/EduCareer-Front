// MODULE
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ScrollUpComponent } from './components/scroll-up/scroll-up.component';
import { SidebarUserComponent } from './components/sidebar-user/sidebar-user.component';
import { ToastComponent } from './components/toast/toast.component';

// PIPES
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderUserComponent,
    NavbarComponent,
    NotFoundComponent,
    ScrollUpComponent,
    SidebarUserComponent,
    ToastComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    HeaderUserComponent,
    NavbarComponent,
    NotFoundComponent,
    ScrollUpComponent,
    SidebarUserComponent,
    ToastComponent,
    TruncatePipe,
  ]
})
export class SharedModule { }
