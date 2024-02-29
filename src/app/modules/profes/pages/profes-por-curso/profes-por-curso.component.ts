import { Component } from '@angular/core';

@Component({
  selector: 'app-profes-por-curso',
  templateUrl: './profes-por-curso.component.html',
  styleUrls: ['./profes-por-curso.component.css']
})
export class ProfesPorCursoComponent {
  teacherDescription: string = 'Este profesor se rige por sus enseñanzas y se tiene en claro que le gusta conversar con sus alumnos y tener una clase dinámica con todos ellos. Posiblemente sea uno de los profesores con más empeño';

  public hasLoaded: boolean = false;

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }

}
