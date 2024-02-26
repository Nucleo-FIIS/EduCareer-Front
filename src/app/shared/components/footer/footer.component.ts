import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // Variable para almacenar el año actual
  year: number;

  constructor() {
    // Obtener el año actual
    this.year = new Date().getFullYear();
  }
}
