import { Component } from '@angular/core';
import { Content } from 'src/app/models/especialidad-carrera-model';
import { AdminService } from 'src/app/services/admin.service';

interface Course {
  code: string;
  name: string;
  prereq: string;
  showMenu?: boolean;
}

@Component({
  selector: 'app-all-specialties',
  templateUrl: './all-specialties.component.html',
  styleUrls: ['./all-specialties.component.css']
})
export class AllSpecialtiesComponent {
  searchTerm: string = '';
  showFilterMenu: boolean = true;
  courses: Course[] = [
    { code: 'FB101', name: 'Geometría Analítica', prereq: '-' },
    { code: 'BMA01', name: 'Cálculo Diferencial', prereq: '-' },
  ];

  filteredCourses: Course[] = [];
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  selectedCourse: Course = { code: '', name: '', prereq: '' };
  openDropdownId: number | null = null;
  selectedEspeciality: any = null;

  especialidadesCarrera !: Content[];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;

  searchText: string = ''; // Texto de búsqueda
  isCleanButtonEnabled: boolean = false; // Estado del botón limpiar

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.filteredCourses = this.courses;

    this.loadPage(this.currentPage);
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  // Función para abrir el dropdown correspondiente
  toggleDropdown(id_especialidad: number): void {
    if (this.openDropdownId === id_especialidad) {
      // Si el dropdown ya está abierto, ciérralo
      this.openDropdownId = null;
    } else {
      // Abre el nuevo dropdown y cierra el anterior
      this.openDropdownId = id_especialidad;
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

  // closeEditModal(): void {
  //   this.showEditModal = false;
  //   this.selectedCourse = { code: '', name: '', prereq: '' };
  // }

  confirmDeleteCourse(course: Course): void {
    this.toggleMenu(course);
    this.selectedCourse = { ...course };
    this.showDeleteModal = true;
  }

  deleteCourse(): void {
    this.courses = this.courses.filter(c => c !== this.selectedCourse);
    this.filteredCourses = this.filteredCourses.filter(c => c !== this.selectedCourse);
    this.showDeleteModal = false;
  }

  // closeDeleteModal(): void {
  //   this.showDeleteModal = false;
  //   this.selectedCourse = { code: '', name: '', prereq: '' };
  // }

  loadPage(page: number, searchText: string = ''): void {
    this.adminService.getEspecialidadesPorCarrera(page, this.pageSize, searchText).subscribe(
      res => {
        this.especialidadesCarrera = res.content;
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
  
  editSpecialty(specialty: any): void {
    this.openDropdownId = null;
    this.showEditModal = true;
    this.selectedEspeciality = specialty;
  }

  closeEditModal(): void {
    this.openDropdownId = null;
    this.showEditModal = false;
    this.selectedEspeciality = null; // Opcional: limpiar el usuario seleccionado al cerrar el modal
  }

  confirmEdit(): void {
    console.log(`Confirmar edición de la especialidad: `, this.selectedEspeciality); 
    this.closeEditModal();
  }

  deleteSpecialty(specialty: any): void {
    this.openDropdownId = null;
    this.selectedEspeciality = specialty;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.openDropdownId = null;
    this.showDeleteModal = false;
    this.selectedEspeciality = null; // Opcional: limpiar el usuario seleccionado al cerrar el modal
  }

  confirmDelete(): void {
    console.log(`Confirmar eliminación de la especialidad: `, this.selectedEspeciality);
    this.closeDeleteModal();
  }

}
