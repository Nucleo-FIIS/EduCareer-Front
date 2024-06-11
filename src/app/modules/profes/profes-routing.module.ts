import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoCicloComponent } from './pages/curso-ciclo/curso-ciclo.component';
import { ProfesPorCursoComponent } from './pages/profes-por-curso/profes-por-curso.component';
import { DetalleProfesorComponent } from './pages/detalle-profesor/detalle-profesor.component';
import { CiclosComponent } from './pages/ciclos/ciclos.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { PostsComponent } from './pages/detalle-profesor/components/posts/posts.component';
import { ScoresComponent } from './pages/detalle-profesor/components/scores/scores.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'carreras', component: CarrerasComponent, title: 'Carreras | EduCareer'},
      {path: 'carrera/:id/ciclos', component: CiclosComponent},
      {path: 'busqueda', component: BusquedaComponent, title: 'Búsqueda | EduCareer'},
      {path: 'carrera/:idCarrera/ciclo/:id/cursos', component: CursoCicloComponent, title: 'Profesores por ciclo | EduCareer'},
      {path: 'carrera/:idCarrera/ciclo/:idCiclo/curso/:idCurso/profesores-por-curso', component: ProfesPorCursoComponent},

      {path: 'detalle/:idCurso/:idProfesor', component: DetalleProfesorComponent, children: [
        {path: 'posts', component: PostsComponent},
        {path: 'scores', component: ScoresComponent}
      ]},
      {path: '**', redirectTo: 'carreras'}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesRoutingModule { }
