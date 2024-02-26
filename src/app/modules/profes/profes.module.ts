import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesRoutingModule } from './profes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursoCicloComponent } from './pages/curso-ciclo/curso-ciclo.component';



@NgModule({
  declarations: [
    CursoCicloComponent
  ],
  imports: [
    CommonModule,
    ProfesRoutingModule,
    SharedModule
  ]
})
export class ProfesModule { }
