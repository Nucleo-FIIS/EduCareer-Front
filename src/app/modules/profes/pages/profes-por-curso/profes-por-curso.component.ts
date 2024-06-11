import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoProfesor } from 'src/app/models/curso-profesor-model';
import { Profesores } from 'src/app/models/profesores-model';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-profes-por-curso',
  templateUrl: './profes-por-curso.component.html',
  styleUrls: ['./profes-por-curso.component.css']
})
export class ProfesPorCursoComponent {
  //profesores: Profesores[] = [];
  profesPorCurso !: CursoProfesor;
  palabraNoEncontrada: string = '';
  public hasLoaded: boolean = false;
  idCarrera !: number;
  idCiclo !: number;
  idCurso !: number;
  showError: boolean = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private profesoresService: ProfesoresService, private router: Router, private route: ActivatedRoute, private title: Title) {
    this.route.params.subscribe(params => {
      try {
        const idCarrera = this.desencriptarId(params['idCarrera']);
        const idCiclo = this.desencriptarId(params['idCiclo']);
        const idCurso = this.desencriptarId(params['idCurso']);
        const idCareerParams = +idCarrera; // Convierte el parámetro a número
        const idCicloParams = +idCiclo; // Convierte el parámetro a número
        const idCursoParams = +idCurso; // Convierte el parámetro a número
        if (!isNaN(idCicloParams) && Number.isInteger(idCicloParams) && !isNaN(idCareerParams) && Number.isInteger(idCareerParams) && !isNaN(idCursoParams) && Number.isInteger(idCursoParams)) {
          this.idCarrera = idCareerParams;
          this.idCiclo = idCicloParams; // Asigna el id solo si es un número entero
          this.idCurso = idCursoParams; // Asigna el id solo si es un número entero
          this.getProfesores();
        } else {
          // Redirige si el id no es un número entero
          this.router.navigate(['/profesores/carreras']);
        }
      } catch (e) {
        // Redirige si hay un error en la desencriptación
        this.router.navigate(['/profesores/carreras']);
      }
    });
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }

  getProfesores(): void {
    this.profesoresService.getProfesoresPorCurso(this.idCarrera, this.idCiclo, this.idCurso).subscribe(
      (response: any) => {
        this.profesPorCurso = response;
        this.title.setTitle(this.profesPorCurso.nombre_curso  + ' | EduCareer');
        this.profesoresService.setProfesores(response.profesores);
      },
      (error) => {
        this.profesoresService.setMessageError(error.error.message);
        this.showError = true;
      });
  }

  /*search(): void {
    const searchTerm: string = this.searchInput.nativeElement.value.trim();

    if (searchTerm.length > 0) {
      // Expresión regular para validar número entero o decimal
      const regex = /^[+-]?\d+(\.\d+)?$/;
      if (regex.test(searchTerm)) {
        // Si es un número entero o decimal, muestra mensaje de error
        this.palabraNoEncontrada = 'Formato de búsqueda no válido. Debe digitar en formato de texto, no un número 😡.';
        this.profesores = [];
      } else {
        // Si es un texto, realiza la búsqueda
        this.profesoresService.findProfesor(searchTerm).subscribe(
          (response) => {
            this.profesores = response;
          },
          (error) => {
            this.profesores = [];
            this.palabraNoEncontrada = error.error.message;
            // console.clear(); //Método para borrar la consola del navegador
          }
        );
      }
    }
  }*/

  regresar(): void {
    this.searchInput.nativeElement.value = '';
    this.getProfesores();
  }

  encriptarId(id: string): string {
    return btoa(id);
  }

  desencriptarId(encryptedId: string): string {
    return atob(encryptedId);
  }

  // Método para calcular las estrellas
  // stars(score: string): string[] {
  //   const numericScore = parseFloat(score);
  //   const roundedScore = Math.ceil(numericScore * 2) / 2;  // Redondear hacia arriba a la mitad más cercana
  //   const fullStars = Math.floor(roundedScore);
  //   const halfStar = (roundedScore % 1 !== 0) ? ['ri-star-half-line'] : [];
  //   const emptyStars = 5 - fullStars - halfStar.length;

  //   const starArray = Array(fullStars).fill('ri-star-fill').concat(halfStar, Array(emptyStars).fill('ri-star-line'));

  //   return starArray;
  // }




}
