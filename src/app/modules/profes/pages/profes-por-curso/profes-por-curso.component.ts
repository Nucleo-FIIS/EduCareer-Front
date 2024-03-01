import { Component } from '@angular/core';

@Component({
  selector: 'app-profes-por-curso',
  templateUrl: './profes-por-curso.component.html',
  styleUrls: ['./profes-por-curso.component.css']
})
export class ProfesPorCursoComponent {
  teacherDescription: string = 'Este profesor se rige por sus enseñanzas y se tiene en claro que le gusta conversar con sus alumnos y tener una clase dinámica con todos ellos. Posiblemente sea uno de los profesores con más empeño';

  public hasLoaded: boolean = false;

  // Asigna el valor deseado a esta variable, por ejemplo, 2.6
  rating: number | undefined;

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }
  getStarClass(index: number): string {
    if (this.rating === undefined) {
      return 'ri-star-line'; // Otra clase de CSS para estrellas sin calificación
    }

    const roundedRating = Math.round(this.rating * 2) / 2;
    return index + 1 <= roundedRating ? 'ri-star-fill' : index + 0.5 === roundedRating ? 'ri-star-half-line' : 'ri-star-line';
  }


}
