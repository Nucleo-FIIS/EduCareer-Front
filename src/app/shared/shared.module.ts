import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { TruncatePipe } from './pipes/truncate.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    TruncatePipe,
  ]
})
export class SharedModule { }
