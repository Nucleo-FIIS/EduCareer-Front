import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleProfesorService } from 'src/app/services/detalle-profesor.service';
import { Title } from '@angular/platform-browser';
import { DetalleProfesor } from 'src/app/models/detalle-profesor-model';
import { Puntaje } from 'src/app/models/puntaje-model';

@Component({
  selector: 'app-detalle-profesor',
  templateUrl: './detalle-profesor.component.html',
  styleUrls: ['./detalle-profesor.component.css']
})
export class DetalleProfesorComponent {
  idCurso !: Number;
  idProfesor !: Number;
  datosProfesor !: DetalleProfesor;

  isUserDetails: boolean = true;
  isAvailable: boolean = false;
  textInput: string = '';
  isOpen !: boolean;

  puntajes: Puntaje[] = [];

  public hasLoaded: boolean = false;
  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }

  constructor(private route: ActivatedRoute, private detalleProfesorService: DetalleProfesorService, private router: Router, private title: Title) {
    this.route.params.subscribe(params => {
      try {
        const idCurso = this.desencriptarId(params['idCurso']);
        const idProfesor = this.desencriptarId(params['idProfesor']);

        const idCursoParams = +idCurso;
        const idProfesorParams = +idProfesor;
        if (!isNaN(idProfesorParams) && Number.isInteger(idProfesorParams) && !isNaN(idCursoParams) && Number.isInteger(idCursoParams)) {
          this.idCurso = idCursoParams;
          this.idProfesor = idProfesorParams;
          this.obtenerDatosDelProfesor();
        } else {
          this.router.navigate(['/profesores/profesores-por-curso']);
        }
      } catch (e) {
        console.error("Error desencriptando IDs", e);
        this.router.navigate(['/profesores/profesores-por-curso']);
      }
    });
  }

  obtenerDatosDelProfesor(): void {
    this.detalleProfesorService.getDetalleProfesor(this.idCurso, this.idProfesor).subscribe(
      response => {
        this.datosProfesor = response;
        this.title.setTitle(this.datosProfesor.nombre_completo + " | EduCareer");
      },
      error => {
        this.router.navigate(['/profesores/profesores-por-curso']);
      }

    )
  };

  encriptarId(id: string): string {
    return btoa(id);
  }

  desencriptarId(encryptedId: string): string {
    return atob(encryptedId);
  }

  openModal(): void {
    this.isOpen = true;
    document.body.className = 'overflow-hidden';
  }

  closeModal(): void {
    this.isOpen = false;
    document.body.className = 'overflow-auto';
  }

  sliders = [
    { id: 1, value: 1, selectorPosition: 0, progressBarWidth: 0, text: 'Enseñanza' },
    { id: 2, value: 1, selectorPosition: 0, progressBarWidth: 0, text: 'Evaluaciones' },
    { id: 3, value: 1, selectorPosition: 0, progressBarWidth: 0, text: 'Supervivencia' }
  ];

  onSliderInput(slider: any) {
    slider.selectorPosition = (slider.value - 1) * 25;
    slider.progressBarWidth = (slider.value - 1) * 25;
  }

  onSave(slider: any) {
    // Encuentra el índice del slider con el mismo id en la lista de puntajes
    const index = this.puntajes.findIndex((s) => s.id === slider.id);

    // Si se encuentra el slider, reemplázalo, si no, agrégalo a la lista
    if (index !== -1) {
      this.puntajes[index] = { id: slider.id, value: slider.value, text: slider.text };
    } else {
      this.puntajes.push({ id: slider.id, value: slider.value, text: slider.text });
    }

    console.log(this.puntajes);
  }
}
