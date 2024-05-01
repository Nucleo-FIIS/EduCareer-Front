import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profesores } from 'src/app/models/profesores-model';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit, OnDestroy {
  profesores: Profesores[] = [];
  error: string = '';
  private resultadosBusquedaSubscription !: Subscription;
  private errorSubscription !: Subscription;
  showError: boolean = false;

  constructor(private profesoresService: ProfesoresService) { }

  // ngOnInit(): void {
  //   this.profesoresService.resultadosBusqueda$.subscribe(
  //     (data: Profesores[]) => {
  //       console.log("data 1: ", data);
  //       if (data.length === 0) {
  //         this.router.navigate(['/profesores/cursos-por-ciclo']);
  //       } else {
  //         console.log("data 2: ", data);
  //         this.profesores = data;
  //       }
  //     }
  //   );

  //   this.errorSub = this.profesoresService.error$.subscribe(
  //     (error: string) => {
  //       console.log("error: ", error);
  //       this.error = error;
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.resultadosBusquedaSubscription = this.profesoresService.resultadosBusqueda$.subscribe(
      (resultados) => {
        if (resultados) {
          this.profesoresService.setProfesores(resultados);

          this.limpiarError(); // Limpiar el estado de error
          this.showError = false;
        }
      }
    );

    // Solo suscribirse una vez al observable error$
    if (!this.errorSubscription) {
      this.errorSubscription = this.profesoresService.error$.subscribe(
        (error: string) => {
          if (error) {
            this.profesoresService.setMessageError(error);
            this.showError = true;
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    // Desuscribirse solo si hay una suscripción
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
    this.resultadosBusquedaSubscription.unsubscribe();
  }


  limpiarError(): void {
    this.profesoresService.enviarError('');
  }
}

