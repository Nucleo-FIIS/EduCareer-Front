import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule )
  },
  { 
    path: 'guia',
    loadChildren: () => import('./modules/guia/guia.module').then( m => m.GuiaModule )
  },
  { 
    path: 'profesores',
    loadChildren: () => import('./modules/profes/profes.module').then( m => m.ProfesModule )
  },
  { 
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule )
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
