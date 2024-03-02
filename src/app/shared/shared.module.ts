import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { TruncatePipe } from './pipes/truncate.pipe';
import { ScrollUpComponent } from './components/scroll-up/scroll-up.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    ScrollUpComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    ScrollUpComponent,
    TruncatePipe,
  ]
})
export class SharedModule { }
