import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoCicloComponent } from './pages/curso-ciclo/curso-ciclo.component';
import { ProfesPorCursoComponent } from './pages/profes-por-curso/profes-por-curso.component';
import { DetalleProfesorComponent } from './pages/detalle-profesor/detalle-profesor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'curso-por-ciclo', component: CursoCicloComponent, title: 'Profesores por ciclo | EduCareer'},
      {path: 'profesores-por-curso', component: ProfesPorCursoComponent, title: 'Profesores por curso | EduCareer'},
      {path: 'detalle/:slug', component: DetalleProfesorComponent, title: 'Detalle del profesor | EduCareer'},
      {path: '**', redirectTo: 'curso-por-ciclo'}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesRoutingModule { }
