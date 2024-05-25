import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesRoutingModule } from './profes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursoCicloComponent } from './pages/curso-ciclo/curso-ciclo.component';
import { ProfesPorCursoComponent } from './pages/profes-por-curso/profes-por-curso.component';
import { DetalleProfesorComponent } from './pages/detalle-profesor/detalle-profesor.component';
import { CiclosComponent } from './pages/ciclos/ciclos.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';



@NgModule({
  declarations: [
    CursoCicloComponent,
    ProfesPorCursoComponent,
    DetalleProfesorComponent,
    CiclosComponent,
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    ProfesRoutingModule,
    SharedModule,
  ]
})
export class ProfesModule { }
