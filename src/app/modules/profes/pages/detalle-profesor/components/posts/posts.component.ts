import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentarioService } from 'src/app/services/comentario.service';

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
  isAvailable: boolean = false;
  textInput: string = '';
  comentarios: any[] = [];
  count !: number;
  openCommentId: number | null = null;

  idCurso !: number;
  idProfesor !: number;

  constructor(private comentarioService: ComentarioService, private route: ActivatedRoute, private router: Router, private title: Title) {

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

  onInput(event: Event): void {
    const input = (event.target as HTMLTextAreaElement).value;
    this.isAvailable = input.trim().length > 0;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.isAvailable) {
        this.sendMessage();
      }
    }
  }

  sendMessage(): void {
    const cleanedText = this.cleanText(this.textInput);
    if (cleanedText) {
      // Agregar el mensaje del usuario a la lista de mensajes
      console.log("Imprimiendo el mensaje: ", cleanedText);

    }
    // Limpiar el área de entrada después de enviar el mensaje
    this.textInput = '';
    this.isAvailable = false;
  }

  cleanText(text: string): string {
    // Remove leading/trailing spaces and reduce multiple spaces to a single space
    return text.trim().replace(/\s+/g, ' ');
  }

  encriptarId(id: string): string {
    return btoa(id);
  }

  editComment(comment: any) {
    // Lo puedes hacer lo que quieras con el comentario editado
    console.log('Comentario editado:', comment.id_comentario);
  }

  deleteComment(comment: any) {
    // Lo puedes hacer lo que quieras con el comentario eliminado
    console.log('Comentario eliminado:', comment.id_comentario);
  }

  replyComment(comment: any) {
    // Lo puedes hacer lo que quieras con el comentario respondido
    console.log('Comentario respondido:', comment.id_comentario);
  }
}
