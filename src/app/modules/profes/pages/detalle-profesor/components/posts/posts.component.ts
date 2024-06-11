import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  isAvailable: boolean = false;
  textInput: string = '';

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
}
