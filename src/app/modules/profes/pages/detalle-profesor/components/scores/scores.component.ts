import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent {

  votes !: any;
  idCurso !: number;
  idProfesor !: number;

  avg_porcent_ensenianza: number = 0;

  isValid!: boolean;

  constructor(private comentarioService: ComentarioService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }


  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      try {
        this.idCurso = +this.desencriptarId(params['idCurso']);
        this.idProfesor = +this.desencriptarId(params['idProfesor']);
      } catch (e) {
        console.error("Error desencriptando IDs en posts.component", e);
        this.router.navigate(['/profesores/carreras']);
        // Manejar el error de forma apropiada, por ejemplo, redirigir o mostrar un mensaje de error
      }
    });

    this.getVotes();

    this.comentarioService.votes$.subscribe(votes => {
      if (votes) {
        this.votes = votes;
        this.avg_porcent_ensenianza = votes.avg_porcent_enseñanza;
      }
    });

    this.isTokenValid();
  }

  private isTokenValid() {
    this.authService.isTokenValid().subscribe(
      (data: boolean) => {
        this.isValid = data;
      }
    );
  }

  private getVotes() {
    this.comentarioService.getVotes(this.idCurso, this.idProfesor).subscribe(
      response => {
        this.votes = response; // Accedemos a la propiedad 'comments'
        this.avg_porcent_ensenianza = response.avg_porcent_enseñanza;
      },
      error => {
        // Manejar el error de forma apropiada, por ejemplo, redirigir o mostrar un mensaje de error
        this.router.navigate(['/profesores/carreras']);
      }
    );
  }

  desencriptarId(encryptedId: string): string {
    try {
      return atob(encryptedId);
    } catch (e) {
      console.error("Error desencriptando ID", e);
      throw e; // Relanzar el error para que sea manejado donde se llama la función
    }
  }
}
