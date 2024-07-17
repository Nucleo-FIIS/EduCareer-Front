import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment: any;
  @Input() openCommentId: number | null = null;
  @Output() toggleMenu = new EventEmitter<number>();

  showMenu: boolean = false;

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
