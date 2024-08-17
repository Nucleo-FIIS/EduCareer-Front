import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { AllCursesComponent } from './pages/all-curses/all-curses.component';
import { AllProfesorsComponent } from './pages/all-profesors/all-profesors.component';
import { AllSpecialtiesComponent } from './pages/all-specialties/all-specialties.component';
import { CommentsComponent } from './pages/comments/comments.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'all-users', component: AllUsersComponent, title: 'Admin - Users | EduCareer' },
      { path: 'all-curses', component: AllCursesComponent, title: 'Admin - Curses | EduCareer' },
      { path: 'all-profesors', component: AllProfesorsComponent, title: 'Admin - Profesors | EduCareer' },
      { path: 'all-specialties', component: AllSpecialtiesComponent, title: 'Admin - specialties | EduCareer' },
      { path: 'comments', component: CommentsComponent, title: 'Admin - comments | EduCareer' },
      { path: '**', redirectTo: 'all-users' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }