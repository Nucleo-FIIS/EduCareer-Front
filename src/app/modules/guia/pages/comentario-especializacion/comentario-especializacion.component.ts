import { Component, Input } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ComentarioModel } from 'src/app/models/comentario-model';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-comentario-especializacion',
  templateUrl: './comentario-especializacion.component.html',
  styleUrls: ['./comentario-especializacion.component.css']
})
export class ComentarioEspecializacionComponent {
  @Input()
  especialidad_id!: number;
  comment!: String;
  comentarios: ComentarioModel[] = [];
  isValid!: boolean;
  isCommentEmpty: boolean = true;
  isResponseBoxHiden: boolean = true;

  constructor(private commentService: ComentarioService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getComentarios();
    this.isTokenValid();
  }

  getComentarios() {
    this.commentService.getComentariosEsp(this.especialidad_id).subscribe(
      (data: ComentarioModel[]) => {
        this.comentarios = data;
      }
    )
  }

  isTheCommentEmpty() {
    this.isCommentEmpty = this.isEmpty(this.comment);
  }

  private isTokenValid() {
    this.authService.isTokenValid().subscribe(
      (data: boolean) => {
        this.isValid = data;
      }
    );
  }

  postComment() {
    this.isTokenValid();
    if (!this.isValid) {
      window.location.reload();
    } else {
      const payload = {
        id_guia: this.especialidad_id,
        comentario: this.comment,
        parent_comment_id: null
      };
      console.log("Payload:", payload);
      this.commentService.postCommesponsesEsp(payload).subscribe(
        response => {
          console.log('Comentario enviado exitosamente:', response);
          this.getComentarios();
          this.comment = "";
          this.isCommentEmpty = true;
        },
        error => {
          console.error('Error al enviar comentario:', error);
        }
      );
    }
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

  showResponseBox() {
    this.isResponseBoxHiden = !this.isResponseBoxHiden;
  }
}
