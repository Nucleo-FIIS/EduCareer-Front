import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  showFilterMenu = false;
  
  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
  }

  filterBy(criteria: string) {
    // Implementación de filtrado
  }

  sortByDate(order: string) {
    // Implementación de ordenamiento
  }
}
