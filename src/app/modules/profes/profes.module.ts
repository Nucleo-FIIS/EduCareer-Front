import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesRoutingModule } from './profes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursoCicloComponent } from './pages/curso-ciclo/curso-ciclo.component';
import { ProfesPorCursoComponent } from './pages/profes-por-curso/profes-por-curso.component';
import { DetalleProfesorComponent } from './pages/detalle-profesor/detalle-profesor.component';
import { CiclosComponent } from './pages/ciclos/ciclos.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { PostsComponent } from './pages/detalle-profesor/components/posts/posts.component';
import { ScoresComponent } from './pages/detalle-profesor/components/scores/scores.component';



@NgModule({
  declarations: [
    CursoCicloComponent,
    ProfesPorCursoComponent,
    DetalleProfesorComponent,
    CiclosComponent,
    BusquedaComponent,
    CarrerasComponent,
    PostsComponent,
    ScoresComponent
  ],
  imports: [
    CommonModule,
    ProfesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfesModule { }
