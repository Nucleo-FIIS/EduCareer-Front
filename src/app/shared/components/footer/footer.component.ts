import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // Variable para almacenar el año actual
  year: number;

  @ViewChild('searchInput') searchInput!: ElementRef;

  isButtonDisabled = true;

  constructor() {
    // Obtener el año actual
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.addEventListener('input', () => {
        this.handleInput();
      });
    }
  }

  handleInput(): void {
    if (this.searchInput && this.searchInput.nativeElement) {
      const inputValue = this.searchInput.nativeElement.value.trim();
      this.isButtonDisabled = inputValue.length === 0;
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.realizarTest();
    }
  }

  searchClicked(): void {
    this.realizarTest();
  }

  realizarTest() {
    const inputValue = this.searchInput.nativeElement.value.trim();

    if (inputValue.length > 0) {
      this.isButtonDisabled = true; // Deshabilitar el botón antes de realizar la acción
      this.searchInput.nativeElement.value = ''; // Limpiar el campo después de hacer clic en Enviar
    } else {
      return; // Evitar realizar la acción si el campo está vacío
    }
  }
}
