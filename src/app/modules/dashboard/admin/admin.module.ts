import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from './pages/comments/comments.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { AllProfesorsComponent } from './pages/all-profesors/all-profesors.component';
import { AllCursesComponent } from './pages/all-curses/all-curses.component';
import { AllSpecialtiesComponent } from './pages/all-specialties/all-specialties.component';


@NgModule({
  declarations: [
    CommentsComponent,
    AllUsersComponent,
    AllProfesorsComponent,
    AllCursesComponent,
    AllSpecialtiesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AdminModule { }
