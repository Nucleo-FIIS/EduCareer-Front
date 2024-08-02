// MODULE
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ScrollUpComponent } from './components/scroll-up/scroll-up.component';
import { SearchComponent } from './components/search/search.component';
import { SidebarUserComponent } from './components/sidebar-user/sidebar-user.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';

// PIPES
import { TruncatePipe } from './pipes/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { CommentComponent } from './components/comment/comment.component';
import { ModalCommentComponent } from './components/modal-comment/modal-comment.component';
import { ModalNotificationComponent } from './components/modal-notification/modal-notification.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DayJsPipe } from './pipes/day-js.pipe';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderUserComponent,
    LoaderComponent,
    LoadingPageComponent,
    NavbarComponent,
    NotFoundComponent,
    ScrollUpComponent,
    SearchComponent,
    SidebarUserComponent,
    ToastComponent,
    ToastNotificationComponent,
    TruncatePipe,
    CardComponent,
    CommentComponent,
    ModalCommentComponent,
    ModalNotificationComponent,
    CoursesComponent,
    DayJsPipe,
    CapitalizeFirstLetterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    FooterComponent,
    HeaderUserComponent,
    LoaderComponent,
    LoadingPageComponent,
    NavbarComponent,
    NotFoundComponent,
    ScrollUpComponent,
    SearchComponent,
    SidebarUserComponent,
    ToastComponent,
    ToastNotificationComponent,
    TruncatePipe,
    CardComponent,
    CommentComponent,
    ModalCommentComponent,
    ModalNotificationComponent,
    CoursesComponent,
    DayJsPipe,
    CapitalizeFirstLetterPipe,
  ]
})
export class SharedModule { }
