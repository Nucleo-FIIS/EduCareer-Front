import { Component, Input } from '@angular/core';
import { ComentarioModel } from 'src/app/models/comentario-model';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent {
  @Input() comentario_id!: number;
  @Input() especialidad_id!: number;
  respuestas: ComentarioModel[] = [];
  respuestas_mostradas: ComentarioModel[] = [];
  response: String = "";

  isHiden: boolean = false;
  isLoggedIn!: boolean
  @Input() isResponseBoxHiden!: boolean;
  isResponseEmpty: boolean = true;

  constructor(private service: ComentarioService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isTokenValid();
    this.getResponses();
  }

  getResponses() {
    this.service.getRespuestasEsp(this.especialidad_id, this.comentario_id).subscribe(
      (data: ComentarioModel[]) => {
        this.respuestas = data;
      }
    )
  }

  private isTokenValid() {
    this.authService.isTokenValid().subscribe(
      (data: boolean) => {
        this.isLoggedIn = data;
      }
    );
  }

  loadResponses() {
    this.respuestas_mostradas = this.respuestas;
    this.isHiden = true;
  }

  hideResponses() {
    this.respuestas_mostradas = [];
    this.isHiden = false;
  }

  isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === 'string' && value.trim().length === 0) {
      return true;
    }

    if (Array.isArray(value) && value.length === 0) {
      return true;
    }

    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return true;
    }

    return false;
  }

  isTheResponseEmpty() {
    this.isResponseEmpty = this.isEmpty(this.response);
  }

  postResponse() {
    this.isTokenValid();
    if (!this.isLoggedIn) {
      window.location.reload();
    } else {
      const payload = {
        id_guia: this.especialidad_id,
        comentario: this.response,
        parent_comment_id: this.comentario_id
      };
      console.log("Payload:", payload);
      this.service.postCommesponsesEsp(payload).subscribe(
        response => {
          console.log('Respuesta publicada exitosamente:', response);
          this.getResponses();
          this.response = "";
          this.isTheResponseEmpty();
        },
        error => {
          console.error('Error al enviar respuesta:', error);
        }
      );
    }
  }
}
