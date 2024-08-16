import { Component } from '@angular/core';

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

  ngOnInit(): void {
    this.filteredCourses = this.courses;
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
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

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedCourse = { code: '', name: '', prereq: '' };
  }
}
