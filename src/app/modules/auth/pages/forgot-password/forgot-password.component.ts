import { Component, ElementRef, ViewChild } from '@angular/core';
import { Alerts } from 'src/app/models/alerts-model';
import { Test } from 'src/app/models/test-model';
import { AlertsService } from 'src/app/services/alerts.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  // Assuming Toast is defined somewhere, otherwise, define it accordingly
  toasts: Alerts[] = [];

  @ViewChild('searchInput') searchInput!: ElementRef;

  isButtonDisabled = true;

  constructor(private alertsService: AlertsService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.observeDisabledAttributeChanges();
    if (this.searchInput) {
      this.searchInput.nativeElement.addEventListener('input', () => {
        this.handleInput();
      });
    }
  }

  observeDisabledAttributeChanges() {
    const targetNode = this.elementRef.nativeElement.querySelector('button');

    // Crear un observador de mutaciones
    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
          // Obtener el valor actual del atributo disabled
          const isDisabled = targetNode.disabled;
          // Actualizar la propiedad isButtonDisabled si es necesario
          this.isButtonDisabled = isDisabled;

          // Si el atributo disabled fue eliminado, volver a agregarlo
          if (!isDisabled) {
            targetNode.setAttribute('disabled', 'true');
          }
        }
      }
    });

    // Observar cambios en el atributo disabled del elemento input
    observer.observe(targetNode, { attributes: true });
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

    const test: Test = {
      email: inputValue
    };

    this.alertsService.realizarTest(test).subscribe(
      response => {
        this.alertsService.sendToast(response); // Enviar el toast
      },
      error => {
        this.alertsService.sendToast(error.error); // Enviar el toast de error
      }
    );
  }
}



