import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
  comentarios: ComentarioModel[] = [];
  posts: String[]=[];
  isValid!: boolean;
  isCommentEmpty: boolean[] = [];
  isResponseBoxHiden: boolean[] = [];
  belongsToUser:boolean[]=[];

  constructor(private commentService: ComentarioService, private authService: AuthService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getComentarios();
    this.isTokenValid();
    this.posts[-1]='';
    this.isCommentEmpty[-1]=true;
  }

  getComentarios() {
    this.commentService.getComentariosEsp(this.especialidad_id).subscribe(
      (data: ComentarioModel[]) => {
        this.comentarios = data;
        this.initializeCommentState();
        this.checkCommentOwnership(); 
        console.log(this.posts);
      }
    );
  }

  initializeCommentState() {
    this.comentarios.forEach(comentario => {
      if(this.isEmpty(this.isResponseBoxHiden[comentario.id_comentario])){
        this.isResponseBoxHiden[comentario.id_comentario]=true;
      }
    });
    this.comentarios.forEach(comentario => {
       if(this.isEmpty(this.posts[comentario.id_comentario])){
         this.posts[comentario.id_comentario]='';
       }
    });
    this.comentarios.forEach(comentario => {
      this.isTheCommentEmpty(comentario.id_comentario, this.posts[comentario.id_comentario]);
    });
  }

  isTheCommentEmpty(commentId: number, newValue: String): void {
    this.isCommentEmpty[commentId] = newValue.trim().length === 0;
    this.cdr.detectChanges();
    console.log('comentario vacío: ',this.isCommentEmpty);
    console.log('comentarios: ',this.posts);
  }

  isTokenValid() {
    this.authService.isTokenValid().subscribe(
      (data: boolean) => {
        this.isValid = data;
      }
    );
  }

  postCommesponse(i:number,comentario_padre:number|null) {
    this.isTokenValid();
    if (!this.isValid) {
      window.location.reload();
    } else {
      const payload = {
        id_guia: this.especialidad_id,
        comentario: this.posts[i],
        parent_comment_id: comentario_padre
      };
      console.log("Payload:", payload);
      this.commentService.postCommesponsesEsp(payload).subscribe(
        response => {
          console.log('Comentario enviado exitosamente:', response);
          this.getComentarios();
          this.posts[i]='';
          this.isCommentEmpty[i]=true;
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

  showResponseBox(i:number) {
    console.log(this.isResponseBoxHiden[i]);
    this.isResponseBoxHiden[i] = !this.isResponseBoxHiden[i];
  }

  cancelPost(i:number){
    this.posts[i] = '';
    this.isTheCommentEmpty(i,'');
    this.showResponseBox(i);
  }

  setResponseBoxesState(){
    this.isResponseBoxHiden=[];
    this.comentarios.forEach(()=>{
      this.isResponseBoxHiden.push(true);
    });    
  }

  checkCommentOwnership() {
    this.belongsToUser = [];
    this.comentarios.forEach(comentario => {
      this.commentService.commentMatchesToken(comentario.id_comentario).subscribe(
        (data: boolean) => {
          this.belongsToUser[comentario.id_comentario]=data;
        }
      );
    });
    console.log('pertenece a: ',this.belongsToUser);
  }

}
