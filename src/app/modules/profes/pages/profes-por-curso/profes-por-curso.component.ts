import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Profesores } from 'src/app/models/profesores-model';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-profes-por-curso',
  templateUrl: './profes-por-curso.component.html',
  styleUrls: ['./profes-por-curso.component.css']
})
export class ProfesPorCursoComponent {
  profesores: Profesores[] = [];
  palabraNoEncontrada : string = '';
  public hasLoaded: boolean = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor( private profesoresService: ProfesoresService, private router: Router ) { }

  ngOnInit(): void {
    this.getProfesores();
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }
  
  getProfesores(): void {
    this.profesoresService.getProfesores().subscribe((profesores) => {
      this.profesoresService.setProfesores(profesores);
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
