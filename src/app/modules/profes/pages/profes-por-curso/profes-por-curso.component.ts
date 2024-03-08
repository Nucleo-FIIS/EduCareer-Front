import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-profes-por-curso',
  templateUrl: './profes-por-curso.component.html',
  styleUrls: ['./profes-por-curso.component.css']
})
export class ProfesPorCursoComponent {
  profesores: any = [];
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
      this.profesores = profesores;
    });
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  searchClicked(): void {
    this.search();
  }

  cleanClicked(): void {
    if (this.searchInput.nativeElement.value.length > 0) {
      this.regresar();
    }
  }

  search(): void {
    const searchTerm: string = this.searchInput.nativeElement.value.trim();

    if (searchTerm.length > 0) {
      console.log('Búsqueda:', searchTerm);
      this.profesoresService.findProfesor(searchTerm).subscribe((profes) => {
        this.profesores = profes;
        if (profes.length === 0) {
          this.palabraNoEncontrada = searchTerm;
        }
        console.log(profes);
      })
    }
  }

  regresar(): void {
    this.searchInput.nativeElement.value = '';
    this.getProfesores();
  }

  // Método para calcular las estrellas
  stars(score: string): string[] {
    const numericScore = parseFloat(score);
    const roundedScore = Math.ceil(numericScore * 2) / 2;  // Redondear hacia arriba a la mitad más cercana
    const fullStars = Math.floor(roundedScore);
    const halfStar = (roundedScore % 1 !== 0) ? ['ri-star-half-line'] : [];
    const emptyStars = 5 - fullStars - halfStar.length;

    const starArray = Array(fullStars).fill('ri-star-fill').concat(halfStar, Array(emptyStars).fill('ri-star-line'));

    return starArray;
  }




}
