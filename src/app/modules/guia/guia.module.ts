import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuiaRoutingModule } from './guia-routing.module';
import { EspecializacionComponent } from './pages/especializacion/especializacion.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EspecializacionesGeneralComponent } from './pages/especializaciones-general/especializaciones-general.component';
import { FormsModule } from '@angular/forms';
import { ComentarioEspecializacionComponent } from './pages/comentario-especializacion/comentario-especializacion.component';
import { RespuestasComponent } from './pages/respuestas/respuestas.component';


@NgModule({
  declarations: [
    EspecializacionComponent,
    EspecializacionesGeneralComponent,
    ComentarioEspecializacionComponent,
    RespuestasComponent
  ],
  imports: [
    CommonModule,
    GuiaRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class GuiaModule { }
