import { Component } from '@angular/core';
import { Content, ProfesorCursos } from 'src/app/models/profesor-cursos';
import { AdminService } from 'src/app/services/admin.service';

interface Course {
  code: string;
  name: string;
  prereq: string;
  showMenu?: boolean;
}

@Component({
  selector: 'app-all-profesors',
  templateUrl: './all-profesors.component.html',
  styleUrls: ['./all-profesors.component.css']
})
export class AllProfesorsComponent {
  searchTerm: string = '';
  showFilterMenu: boolean = true;
  courses: Course[] = [
    { code: 'FB101', name: 'Geometría Analítica', prereq: '-' },
    { code: 'BMA01', name: 'Cálculo Diferencial', prereq: '-' },
  ];

  profesorCursos !: Content[];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;

  openDropdownId: number | null = null;
  selectedProfesor: any = null;

  constructor(private adminService: AdminService) { }

  filteredCourses: Course[] = [];
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  selectedCourse: Course = { code: '', name: '', prereq: '' };

  ngOnInit(): void {
    this.filteredCourses = this.courses;

    this.loadPage(this.currentPage);
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  // Función para abrir el dropdown correspondiente
  toggleDropdown(id_profesor: number): void {
    if (this.openDropdownId === id_profesor) {
      // Si el dropdown ya está abierto, ciérralo
      this.openDropdownId = null;
    } else {
      // Abre el nuevo dropdown y cierra el anterior
      this.openDropdownId = id_profesor;
    }
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredCourses = [...this.courses];
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

  deleteCourse(): void {
    this.courses = this.courses.filter(c => c !== this.selectedCourse);
    this.filteredCourses = this.filteredCourses.filter(c => c !== this.selectedCourse);
    this.showDeleteModal = false;
  }

  getCursosAsString(cursos: any[]): string {
    return cursos.map(curso => curso.nombre_curso).join(', ');
  }

  loadPage(page: number): void {
    this.adminService.getProfesoresCursos(page, this.pageSize).subscribe(
      res => {
        this.profesorCursos = res.content;
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

  /**
   * Abre el modal de confirmaci n de eliminaci n de un profesor.
   * @param profesor El objeto que contiene la información del profesor a eliminar.
   */

  deleteProfesor(profesor: any): void {
    this.openDropdownId = null;
    this.selectedProfesor = profesor;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.openDropdownId = null;
    this.showDeleteModal = false;
    this.selectedProfesor = null; // Opcional: limpiar el usuario seleccionado al cerrar el modal
  }

  confirmDelete(): void {
    console.log(`Confirmar eliminación del profesor: `, this.selectedProfesor);
    this.closeDeleteModal();
  }
}
