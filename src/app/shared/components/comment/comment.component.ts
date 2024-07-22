import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ModalCommentService } from 'src/app/services/modal-comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment: any;
  @Input() isValid: any;
  @Input() openCommentId: number | null = null;
  @Output() toggleMenu = new EventEmitter<number>();
  @Input() idCurso: any;
  @Input() idProfesor: any;
  @Input() emailUser!: string;

  showMenu: boolean = false;
  isAvailable: boolean = false;
  textInput: string = '';
  showReplyForm: { [key: number]: boolean } = {};

  constructor(private modalCommentService: ModalCommentService, private comentarioService: ComentarioService, private authService: AuthService, private modalService: ModalCommentService) { }

  ngOnInit() {
    this.getReplies(this.comment);
  }

  getReplies(comment: any): any[] {
    return comment.replies;
  }

  toggleReplies(comment: any) {
    comment.showReplies = !comment.showReplies;
  }

  ngOnChanges() {
    this.showMenu = this.openCommentId === this.comment.id_comentario;
  }

  toggleCommentMenu() {
    this.toggleMenu.emit(this.comment.id_comentario);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.c-controls');
    if (!clickedInside) {
      this.showMenu = false;
    }
  }

  editComment(comment: any) {
    // Lo puedes hacer lo que quieras con el comentario editado
    this.modalService.openDialog(comment, 'edit');
  }

  deleteComment(comment: any) {
    // Lo puedes hacer lo que quieras con el comentario eliminado
    this.modalService.openDialog(comment, 'delete');
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
      this.postComment(cleanedText);
    }
    // Limpiar el área de entrada después de enviar el mensaje
    this.textInput = '';
    this.isAvailable = false;
  }

  cancelMessage(): void {
    this.textInput = '';
    this.isAvailable = false;
  }

  cleanText(text: string): string {
    // Remove leading/trailing spaces and reduce multiple spaces to a single space
    return text.trim().replace(/\s+/g, ' ');
  }

  replyComment(comment: any): void {
    this.showReplyForm[comment.id_comentario] = true;
    this.showMenu = false; // Cerrar el menú de opciones
  }

  private isTokenValid() {
    this.authService.isTokenValid().subscribe(
      (data: boolean) => {
        this.isValid = data;
        //this.isAvailable = !this.isValid;
      }
    );
  }

  postComment(message : any) {
    this.isTokenValid();
    if (!this.isValid) {
      window.location.reload();
    } else {
      const payload = {
        comentario: message,
        parent_comentario_id: this.comment.id_comentario,
        reply_to: this.comment.nombre_user,
        score: 0,
        id_curso: this.idCurso,
        id_profesor: this.idProfesor
      };
      this.comentarioService.postCommentResponsesProf(payload).subscribe(
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
}
