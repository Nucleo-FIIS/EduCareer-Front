import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { StartComponent } from './pages/start/start.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StartComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
