import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleProfesorService } from 'src/app/services/detalle-profesor.service';
import { Title } from '@angular/platform-browser';
import { DetalleProfesor } from 'src/app/models/detalle-profesor-model';

@Component({
  selector: 'app-detalle-profesor',
  templateUrl: './detalle-profesor.component.html',
  styleUrls: ['./detalle-profesor.component.css']
})
export class DetalleProfesorComponent {
  id !: Number;
  datosProfesor !: DetalleProfesor;
  

  public hasLoaded: boolean = false;
  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }

  constructor(private route: ActivatedRoute, private detalleProfesorService: DetalleProfesorService, private router: Router, private title: Title) {
    this.route.params.subscribe(params => {
      const idFromParams = +params['id']; // Convierte el parámetro a número
      if (!isNaN(idFromParams) && Number.isInteger(idFromParams)) {
        this.id = idFromParams; // Asigna el id solo si es un número entero
        this.obtenerDatosDelProfesor();
      } else {
        // Redirige si el id no es un número entero
        this.router.navigate(['/profesores/profesores-por-curso']);
      }
    });
  }

  ngOnInit(): void {  }

  obtenerDatosDelProfesor(): void {
    this.detalleProfesorService.getDetalleProfesor(this.id).subscribe(
      response => {
        this.datosProfesor = response;
      },
      error => {
        this.router.navigate(['/profesores/profesores-por-curso']);
      }

    )
  };
}
