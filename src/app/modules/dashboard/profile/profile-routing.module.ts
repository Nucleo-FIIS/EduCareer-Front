import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'edit-profile', component: EditProfileComponent, title: 'Dashboard - Editar perfil | EduCareer'},
      {path: '**', redirectTo: 'edit-profile'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
