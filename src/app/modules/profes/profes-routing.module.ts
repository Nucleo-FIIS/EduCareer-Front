import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoCicloComponent } from './pages/curso-ciclo/curso-ciclo.component';
import { ProfesPorCursoComponent } from './pages/profes-por-curso/profes-por-curso.component';
import { DetalleProfesorComponent } from './pages/detalle-profesor/detalle-profesor.component';
import { CiclosComponent } from './pages/ciclos/ciclos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'ciclos', component: CiclosComponent, title: 'Ciclos | EduCareer'},
      {path: 'cursos-por-ciclo', component: CursoCicloComponent, title: 'Profesores por ciclo | EduCareer'},
      {path: 'profesores-por-curso', component: ProfesPorCursoComponent, title: 'Profesores por curso | EduCareer'},
      {path: 'detalle/:id', component: DetalleProfesorComponent},
      {path: '**', redirectTo: 'ciclos'}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesRoutingModule { }
