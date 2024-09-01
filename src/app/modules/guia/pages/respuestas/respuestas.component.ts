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
  @Input() callParentTokenValidation!: () => void;
  @Input() comentario_id!: number;
  @Input() especialidad_id!: number;
  @Input() isValid!: boolean;
  respuestas: ComentarioModel[] = [];
  isResponseBoxHiden:boolean[]=[]; // se refiere a la caja de response de cada comentario
  areResponsesHiden:boolean=true;
  commentBelongsToUser:boolean[]=[]; // se refiere a la pertenencia de la relación comentario-token
  isCommentBoxEmpty:boolean[]=[]; // se refiere al estado de vacío de la caja de comentarios
  posts:String[]=[]; // se refiere al texto de la caja de rptas

  constructor(private service: ComentarioService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getResponses();
  }

  initializeCommentState() {
    this.respuestas.forEach(rpta => {
      if(this.isEmpty(this.isResponseBoxHiden[rpta.id_comentario])){
        this.isResponseBoxHiden[rpta.id_comentario]=true;
      }
    });
    this.respuestas.forEach(rpta => {
       if(this.isEmpty(this.posts[rpta.id_comentario])){
         this.posts[rpta.id_comentario]='';
       }
    });
    this.respuestas.forEach(rpta => {
      this.isTheCommentEmpty(rpta.id_comentario, this.posts[rpta.id_comentario]);
    });
  }

  showResponses(){
    this.areResponsesHiden=!this.areResponsesHiden;
  }

  showResponseBox(i:number) {
    console.log(this.isResponseBoxHiden[i]);
    this.isResponseBoxHiden[i] = !this.isResponseBoxHiden[i];
  }

  getResponses() {
    this.service.getRespuestasEsp(this.especialidad_id, this.comentario_id).subscribe(
      (data: ComentarioModel[]) => {
        this.respuestas = data;
        this.initializeCommentState();
        this.checkCommentOwnership(); 
      }
    )
  }

  checkCommentOwnership() {
    this.commentBelongsToUser = [];
    this.respuestas.forEach(rpta => {
      this.service.commentMatchesToken(rpta.id_comentario).subscribe(
        (data: boolean) => {
          this.commentBelongsToUser[rpta.id_comentario]=data;
        }
      );
    });
    console.log('pertenece a: ',this.commentBelongsToUser);
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

  isTheCommentEmpty(commentId: number, newValue: String): void {
    this.isCommentBoxEmpty[commentId] = newValue.trim().length === 0;
    console.log('comentario vacío: ',this.isCommentBoxEmpty);
    console.log('comentarios: ',this.posts);
  }

  cancelPost(i:number){
    this.posts[i] = '';
    this.isTheCommentEmpty(i,'');
    this.showResponseBox(i);
  }

  postResponse(i:number,comentario_padre:number) {
    this.callParentTokenValidation();
    if (!this.isValid) {
      window.location.reload();
    } else {
      const payload = {
        id_guia: this.especialidad_id,
        comentario: this.posts[i],
        parent_comment_id: comentario_padre
      };
      console.log("Payload:", payload);
      this.service.postCommesponsesEsp(payload).subscribe(
        response => {
          console.log('Respuesta publicada exitosamente:', response);
          this.getResponses();
          this.posts[i]='';
          this.isCommentBoxEmpty[i]=true;
        },
        error => {
          console.error('Error al enviar respuesta:', error);
        }
      );
    }
  }
}
