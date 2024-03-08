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

  constructor( private route: ActivatedRoute, private detalleProfesorService: DetalleProfesorService, private router: Router, private title: Title ) { 
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    // Llamar al servicio con el slug
    this.obtenerDatosDelProfesor();
  }

  obtenerDatosDelProfesor() :void {
    this.detalleProfesorService.getDetalleProfesor(this.id).subscribe( profesor => {
    // Manejar la respuesta del servicio aquí
    if (profesor == null) {
      this.router.navigate(['/profesores/profesores-por-curso']);
    } else {
      this.datosProfesor = profesor;
      this.title.setTitle(profesor.first_last_name + '  ' + ' | EduCareer');
    }

  })};
}
