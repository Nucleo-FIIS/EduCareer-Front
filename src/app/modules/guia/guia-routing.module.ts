import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecializacionComponent } from './pages/especializacion/especializacion.component';
import { EspecializacionesGeneralComponent } from './pages/especializaciones-general/especializaciones-general.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'guia-especializacion/:id', component: EspecializacionComponent, title: 'Guía de Especialización | EduCareer'},
      {path: 'todos-guia-especializacion', component: EspecializacionesGeneralComponent, title: 'Guía de Especialización | EduCareer'},
      {path: '**', redirectTo: 'todos-guia-especializacion'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuiaRoutingModule { }
