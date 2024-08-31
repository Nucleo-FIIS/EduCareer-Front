import { Component } from '@angular/core';
import { Content } from 'src/app/models/cursos-model';
import { AdminService } from 'src/app/services/admin.service';

interface Course {
  code: string;
  name: string;
  prereq: string;
  showMenu?: boolean;
}


@Component({
  selector: 'app-all-curses',
  templateUrl: './all-curses.component.html',
  styleUrls: ['./all-curses.component.css']
})
export class AllCursesComponent {
  searchTerm: string = '';
  showFilterMenu: boolean = true;
  courses: Course[] = [
    { code: 'FB101', name: 'Geometría Analítica', prereq: '-' },
    { code: 'BMA01', name: 'Cálculo Diferencial', prereq: '-' },
  ];

  filteredCourses: Course[] = [];
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;

  cursos !: Content[];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;

  openDropdownId: number | null = null;
  selectedCourse: any = null;
  searchText: string = ''; // Texto de búsqueda
  isCleanButtonEnabled: boolean = false; // Estado del botón limpiar
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.filteredCourses = this.courses;

    this.loadPage(this.currentPage);
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  // Función para abrir el dropdown correspondiente
  toggleDropdown(id_curso: number): void {
    if (this.openDropdownId === id_curso) {
      // Si el dropdown ya está abierto, ciérralo
      this.openDropdownId = null;
    } else {
      // Abre el nuevo dropdown y cierra el anterior
      this.openDropdownId = id_curso;
    }
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onInputChange(): void {
    let trimmedText = this.searchText.trim().replace(/\s+/g, ' ');
    this.searchText = trimmedText;

    if (trimmedText.length > 0 && /[a-zA-Z0-9]/.test(trimmedText)) {
      this.isCleanButtonEnabled = true;
      this.currentPage = 0; // Reiniciar a la primera página al hacer una búsqueda
      this.loadPage(this.currentPage, this.searchText);
    } else {
      this.isCleanButtonEnabled = false;
      // Cuando el texto está vacío, hacer una búsqueda sin parámetros de búsqueda
      this.loadPage(this.currentPage, '');
    }
  }

  // Función para limpiar el campo de búsqueda y recargar sin búsqueda
  clearSearch(): void {
    this.searchText = '';
    this.isCleanButtonEnabled = false; // Deshabilitar el botón después de limpiar
    this.currentPage = 0; // Reiniciar a la primera página al limpiar la búsqueda
    this.loadPage(this.currentPage, '');
  }

  toggleMenu(course: Course): void {
    this.courses.forEach(c => {
      if (c !== course) {
        c.showMenu = false;
      }
    });
    course.showMenu = !course.showMenu;
  }

  editCourse(course: Course): void {
    this.toggleMenu(course);
    this.selectedCourse = { ...course };
    this.showEditModal = true;
  }

  saveCourse(): void {
    if (this.selectedCourse) {
      const index = this.courses.findIndex(c => c.code === this.selectedCourse.code);
      if (index > -1) {
        this.courses[index] = this.selectedCourse;
      }
      this.showEditModal = false;
    }
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedCourse = { code: '', name: '', prereq: '' };
  }

  confirmDeleteCourse(course: Course): void {
    this.toggleMenu(course);
    this.selectedCourse = { ...course };
    this.showDeleteModal = true;
  }

  loadPage(page: number, searchText: string = ''): void {
    this.adminService.getCursos(page, this.pageSize, searchText).subscribe(
      res => {
        this.cursos = res.content;
        this.currentPage = res.pageable.pageNumber;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      },
      err => {
        console.log(err);
      }
    );
  }

  getPageNumbers(): number[] {
    const pages = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 5) {
      for (let i = 0; i < total; i++) {
        pages.push(i);
      }
    } else {
      if (current < 3) {
        for (let i = 0; i < 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(total - 1);
      } else if (current >= total - 3) {
        pages.push(0);
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = total - 5; i < total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(0);
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(total - 1);
      }
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadPage(page);
    }
  }

  getStartIndex(): number {
    return this.currentPage * this.pageSize + 1;
  }
  
  getEndIndex(): number {
    const endIndex = (this.currentPage + 1) * this.pageSize;
    return endIndex > this.totalElements ? this.totalElements : endIndex;
  }

  deleteCourse(course: any): void {
    this.openDropdownId = null;
    this.selectedCourse = course;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.openDropdownId = null;
    this.showDeleteModal = false;
    this.selectedCourse = null; // Opcional: limpiar el usuario seleccionado al cerrar el modal
  }

  confirmDelete(): void {
    this.adminService.eliminarCurso(this.selectedCourse.id_curso).subscribe(
      res => {
        this.toastMessage = res.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
        this.loadPage(this.currentPage, this.searchText);
      },
      err => {
        console.log(err);
      }
    )
    this.closeDeleteModal();
  }
}
