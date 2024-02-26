import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoCicloComponent } from './pages/curso-ciclo/curso-ciclo.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'curso-por-ciclo', component: CursoCicloComponent, title: 'Profesores por ciclo | EduCareer'},
      {path: '**', redirectTo: 'curso-por-ciclo'}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesRoutingModule { }
