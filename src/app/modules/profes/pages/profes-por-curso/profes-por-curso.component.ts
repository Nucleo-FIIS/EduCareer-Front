import { Component } from '@angular/core';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-profes-por-curso',
  templateUrl: './profes-por-curso.component.html',
  styleUrls: ['./profes-por-curso.component.css']
})
export class ProfesPorCursoComponent {
  profesores: any = [];
  public hasLoaded: boolean = false;

  constructor( private profesoresService: ProfesoresService ) { }

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
      console.log(this.profesores);
    });
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
