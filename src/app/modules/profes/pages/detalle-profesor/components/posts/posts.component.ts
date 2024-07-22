import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ModalCommentService } from 'src/app/services/modal-comment.service';

interface Comentario {
  id: number;
  comment: string;
  replies: number[];
  timestamp: string;
  username: string;
  imageUrl: string;
  depth?: number;
  replyList?: Comentario[];
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  isAvailable: boolean[] = [];
  isAvailableBox: boolean = false;
  textInput: string[] = [];
  comentarios: any[] = [];
  count !: number;
  openCommentId: number | null = null;
  showReplyForm: { [key: number]: boolean } = {};

  idCurso !: number;
  idProfesor !: number;
  isValid!: boolean;

  emailUser !: string;

  constructor(private modalCommentService: ModalCommentService, private comentarioService: ComentarioService, private route: ActivatedRoute, private router: Router, private authService: AuthService, private modalService: ModalCommentService) {

  }

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

    this.getCommentsProfesor();

    this.comentarioService.comments$.subscribe(comments => {
      this.count = comments.length;
      this.comentarios = this.buildComments(comments);
    });

    this.isTokenValid();

    this.getEmailUser();
  }

  getEmailUser() {
    this.comentarioService.getEmailUser().subscribe(
      response => {
        this.emailUser = response.email;
      },
      error => {
        // Manejar el error de forma apropiada, por ejemplo, redirigir o mostrar un mensaje de error
        // this.router.navigate(['/profesores/carreras']);
        console.log(error.error.message);
      }
    );
  }

  getCommentsProfesor() {
    this.comentarioService.getComments(this.idCurso, this.idProfesor).subscribe(
      response => {
        this.count = response.comments.length;
        this.comentarios = this.buildComments(response.comments); // Accedemos a la propiedad 'comments'
      },
      error => {
        // Manejar el error de forma apropiada, por ejemplo, redirigir o mostrar un mensaje de error
        this.router.navigate(['/profesores/carreras']);
      }
    );
  }

  private isTokenValid() {
    this.authService.isTokenValid().subscribe(
      (data: boolean) => {
        this.isValid = data;
        //this.isAvailable = !this.isValid;
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

  buildComments(comments: any[]): any[] {
    const commentMap = new Map<number, any>();

    comments.forEach(comment => {
      comment.replies = [];
      comment.showReplies = false;
      commentMap.set(comment.id_comentario, comment);
    });

    comments.forEach(comment => {
      if (commentMap.has(comment.parent_comentario_id)) {
        commentMap.get(comment.parent_comentario_id).replies.push(comment);
      }
    });

    return comments.filter(comment => comment.parent_comentario_id === null);
  }

  toggleReplies(comment: any) {
    comment.showReplies = !comment.showReplies;
  }

  toggleMenu(commentId: number) {
    this.openCommentId = this.openCommentId === commentId ? null : commentId;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.c-controls');
    if (!clickedInside) {
      this.openCommentId = null;
    }
  }

  getReplies(comment: any): any[] {
    return comment.replies;
  }

  onInput(event: Event, index: number): void {
    const input = (event.target as HTMLTextAreaElement).value;
    this.textInput[index] = input;
    this.isAvailable[index] = input.trim().length > 0;
  }

  onKeydown(event: KeyboardEvent, index: number, parentComment: number | null, replyTo: string | null): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.isAvailable[index]) {
        this.sendMessage(index, parentComment, replyTo);
      }
    }
  }

  sendMessage(index: number, parentComment: number | null, replyTo: string | null): void {
    const cleanedText = this.cleanText(this.textInput[index]);
    if (cleanedText) {
      // Agregar el mensaje del usuario a la lista de mensajes
      this.postComment(cleanedText, parentComment, replyTo);
    }
    // Limpiar el área de entrada después de enviar el mensaje
    this.textInput[index] = '';
    this.isAvailable[index] = false;
    this.showReplyForm[index] = false; // Ocultar el formulario después de enviar el mensaje
  }

  cancelMessage(index: number): void {
    this.textInput[index] = '';
    this.isAvailable[index] = false;
    this.showReplyForm[index] = false; // Ocultar el formulario al cancelar
  }

  cleanText(text: string): string {
    // Remove leading/trailing spaces and reduce multiple spaces to a single space
    return text.trim().replace(/\s+/g, ' ');
  }

  replyComment(comment: any): void {
    this.showReplyForm[comment.id_comentario] = true;
    this.openCommentId = null; // Cerrar el menú de opciones
  }

  encriptarId(id: string): string {
    return btoa(id);
  }

  editComment(comment: any) {
    // Lo puedes hacer lo que quieras con el comentario editado
    this.modalService.openDialog(comment, 'edit');
  }

  deleteComment(comment: any) {
    // Lo puedes hacer lo que quieras con el comentario eliminado
    this.modalService.openDialog(comment, 'delete');
  }

  postComment(message: any, parentComment: number | null, replyTo: string | null) {
    this.isTokenValid();
    if (!this.isValid) {
      window.location.reload();
    } else {
      const payload = {
        comentario: message,
        parent_comentario_id: parentComment,
        reply_to: replyTo,
        score: 0,
        id_curso: this.idCurso,
        id_profesor: this.idProfesor
      };
      this.comentarioService.postCommentResponsesProf(payload).subscribe(
        response => {
          //console.log('Comentario enviado exitosamente:', response);
          this.modalCommentService.openDialogNotification(response, 'success');
          if (parentComment !== null) {
            this.showReplyForm[parentComment] = false;
          }
        },
        error => {
          console.error('Error al enviar comentario:', error);
          this.modalCommentService.openDialogNotification(error, 'error');
        }
      );
    }
  }
}
