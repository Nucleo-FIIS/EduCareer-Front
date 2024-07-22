import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleProfesorService } from 'src/app/services/detalle-profesor.service';
import { Title } from '@angular/platform-browser';
import { DetalleProfesor } from 'src/app/models/detalle-profesor-model';
import { Puntaje } from 'src/app/models/puntaje-model';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ModalCommentService } from 'src/app/services/modal-comment.service';

@Component({
  selector: 'app-detalle-profesor',
  templateUrl: './detalle-profesor.component.html',
  styleUrls: ['./detalle-profesor.component.css']
})
export class DetalleProfesorComponent {
  idCurso !: number;
  idProfesor !: number;
  datosProfesor !: DetalleProfesor;

  isUserDetails: boolean = true;
  isAvailable: boolean = false;
  textInput: string = '';
  isOpen !: boolean;
  isValid!: boolean;

  fullStars: number[] = [];
  halfStar: boolean = false;
  emptyStars: number[] = [];

  puntajes: Puntaje[] = [];

  votes !: any;

  porcent_enseñanza !: number;
  porcent_evaluaciones !: number;
  porcent_supervivencia !: number;

  public hasLoaded: boolean = false;
  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }

  constructor(
    private modalCommentService: ModalCommentService,
    private comentarioService: ComentarioService,
    private route: ActivatedRoute,
    private detalleProfesorService: DetalleProfesorService,
    private router: Router,
    private title: Title,
    private authService: AuthService) {
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

  ngOnInit(): void {
    this.isTokenValid();

    this.comentarioService.votes$.subscribe(votes => {
      if (votes) {
        this.votes = votes.star;
        this.calculateStars(votes.star);
      }
    });
  }

  private isTokenValid() {
    this.authService.isTokenValid().subscribe(
      (data: boolean) => {
        this.isValid = data;
      }
    );
  }

  calculateStars(rating: number) {
    this.fullStars = [];
    this.halfStar = false;
    this.emptyStars = [];

    if (rating <= 0) {
      this.fullStars = [];
    } else if (rating <= 1.2) {
      this.fullStars = [1];
    } else if (rating <= 1.7) {
      this.fullStars = [1];
      this.halfStar = true;
    } else if (rating <= 2.2) {
      this.fullStars = [1, 1];
    } else if (rating <= 2.7) {
      this.fullStars = [1, 1];
      this.halfStar = true;
    } else if (rating <= 3.2) {
      this.fullStars = [1, 1, 1];
    } else if (rating <= 3.7) {
      this.fullStars = [1, 1, 1];
      this.halfStar = true;
    } else if (rating <= 4.2) {
      this.fullStars = [1, 1, 1, 1];
    } else if (rating <= 4.7) {
      this.fullStars = [1, 1, 1, 1];
      this.halfStar = true;
    } else {
      this.fullStars = [1, 1, 1, 1, 1];
    }

    this.emptyStars = Array(5 - this.fullStars.length - (this.halfStar ? 1 : 0)).fill(0);
  }

  obtenerDatosDelProfesor(): void {
    this.detalleProfesorService.getDetalleProfesor(this.idCurso, this.idProfesor).subscribe(
      response => {
        this.datosProfesor = response;
        this.title.setTitle(this.datosProfesor.nombre_completo + " | EduCareer");

        this.comentarioService.getVotes(this.idCurso, this.idProfesor).subscribe(
          response => {
            this.votes = response.star;
            this.calculateStars(response.star);
          },
          error => {
            // Manejar el error de forma apropiada, por ejemplo, redirigir o mostrar un mensaje de error
            this.router.navigate(['/profesores/carreras']);
          }
        );
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
    this.getVoteUser();
    document.body.className = 'overflow-hidden';
  }

  closeModal(): void {
    this.isOpen = false;
    document.body.className = 'overflow-auto';
  }

  confirmarPuntaje(): void {
    this.hideDialog();
    this.puntajes.forEach((puntaje) => {
      if (puntaje.text === 'Enseñanza') {
        this.porcent_enseñanza = puntaje.value;
      } else if (puntaje.text === 'Evaluaciones') {
        this.porcent_evaluaciones = puntaje.value;
      } else if (puntaje.text === 'Supervivencia') {
        this.porcent_supervivencia = puntaje.value;
      }
    })

    this.isTokenValid();
    if (!this.isValid) {
      window.location.reload();
    } else {
      const payload = {
        porcent_enseñanza: this.porcent_enseñanza,
        porcent_evaluaciones: this.porcent_evaluaciones,
        porcent_supervivencia: this.porcent_supervivencia,
        id_curso: this.idCurso,
        id_profesor: this.idProfesor
      };
      this.comentarioService.postVotesResponsesProf(payload).subscribe(
        response => {
          this.modalCommentService.openDialogNotification(response, 'success');
        },
        error => {
          console.error('Error al enviar comentario:', error);
          this.modalCommentService.openDialogNotification(error, 'error');
        }
      );
    }
  }

  sliders !: any[];

  getVoteUser() {
    this.isTokenValid();
    if (!this.isValid) {
      window.location.reload();
    } else {
      const payload = {
        id_curso: this.idCurso,
        id_profesor: this.idProfesor
      };
      this.comentarioService.getVoteUser(payload).subscribe(
        response => {
          this.sliders = response.votos;
        },
        error => {
          console.error('Error al enviar comentario:', error);
        }
      );
    }
  }

  onSliderInput(slider: any) {
    slider.selectorPosition = (slider.value - 1) * 25;
    slider.progressBarWidth = (slider.value - 1) * 25;
  }

  onSave(slider: any) {
    // Encuentra el índice del slider con el mismo id en la lista de puntajes
    const index = this.puntajes.findIndex((s) => s.id === slider.id_voto);

    // Si se encuentra el slider, reemplázalo, si no, agrégalo a la lista
    if (index !== -1) {
      this.puntajes[index] = { id: slider.id_voto, value: slider.value, text: slider.text };
    } else {
      this.puntajes.push({ id: slider.id_voto, value: slider.value, text: slider.text });
    }
  }

  showDialog() {
    this.getVoteUser();

    setTimeout(() => {
      let dialogQualify: HTMLElement | null = document.getElementById(`dialog-qualify`);
      let dialogOverlay: HTMLElement | null = document.getElementById(`dialog-overlay`);

      dialogQualify?.classList.remove('hidden');
      dialogOverlay?.classList.remove('hidden');
      
      document.body.classList.add('overflow-hidden');

      setTimeout(() => {
        dialogQualify?.classList.remove('opacity-0');
        dialogOverlay?.classList.remove('opacity-0');
      }, 20);

    }, 300);
  }

  hideDialog() {
    let dialogQualify: HTMLElement | null = document.getElementById(`dialog-qualify`);
    let dialogOverlay: HTMLElement | null = document.getElementById(`dialog-overlay`);

    dialogQualify?.classList.add('opacity-0');
    dialogOverlay?.classList.add('opacity-0');
    document.body.classList.remove('overflow-hidden');;
    setTimeout(() => {
      dialogQualify?.classList.add('hidden');
      dialogOverlay?.classList.add('hidden');
    }, 500);
  }
}
