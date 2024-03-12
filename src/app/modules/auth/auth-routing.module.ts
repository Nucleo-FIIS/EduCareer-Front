import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'login', component: LoginComponent, title: 'Login | EduCareer'},
      {path: 'registro', component: RegistroComponent, title: 'Registro | EduCareer'},
      {path: 'forgot-password', component: ForgotPasswordComponent, title: 'Recuperar contraseña | EduCareer'},
      {path: '**', redirectTo: 'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
