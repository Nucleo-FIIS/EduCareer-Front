import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Content } from 'src/app/models/user-con-rol-model';
import { AdminService } from 'src/app/services/admin.service';

interface User {
  name: string;
  email: string;
  type: string;
  registrationDate: string;
  lastLogin: string;
  showMenu?: boolean;
}

interface FilterOption {
  name: string;
  type: string;
  value: string;
  icon: SafeHtml;
}

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  selectedFilter: FilterOption | null = null; // Define selectedFilter como de tipo FilterOption o null
  selectedUser: any = null;
  // Variable para rastrear qué dropdown está abierto
  openDropdownId: number | null = null;
  filters: FilterOption[];
  showFilterMenu: boolean = false;
  showDeleteModal: boolean = false;

  selectedSortParam: string = ''; // Para almacenar el parámetro de orden seleccionado
  selectedFilterParam: string = ''; // Para almacenar el filtro seleccionado
  searchText: string = ''; // Texto de búsqueda
  isCleanButtonEnabled: boolean = false; // Estado del botón limpiar

  usersConRol !: Content[];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;

  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private adminService: AdminService, private sanitizer: DomSanitizer) {
    this.filters = [
      {
        name: 'Nombre Descendente',
        type: 'sort',
        value: 'nombre_user,desc',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-arrow-down-z-a w-4 h-4 inline">
            <path d="m3 16 4 4 4-4" />
            <path d="M7 4v16" />
            <path d="M15 4h5l-5 6h5" />
            <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
            <path d="M20 18h-5" />
          </svg>
        `)
      },
      {
        name: 'Nombre Ascendente',
        type: 'sort',
        value: 'nombre_user,asc',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-z-a w-4 h-4 inline">
            <path d="m3 8 4-4 4 4"/>
            <path d="M7 4v16"/>
            <path d="M15 4h5l-5 6h5"/>
            <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"/>
            <path d="M20 18h-5"/>
          </svg>
        `)
      },
      {
        name: 'Email Desc',
        type: 'sort',
        value: 'email,desc',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-wide-narrow w-4 h-4 inline"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/></svg>
        `)
      },
      {
        name: 'Email Asc',
        type: 'sort',
        value: 'email,asc',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-narrow-wide w-4 h-4 inline">
            <path d="m3 8 4-4 4 4"/>
            <path d="M7 4v16"/>
            <path d="M11 12h4"/>
            <path d="M11 16h7"/>
            <path d="M11 20h10"/>
          </svg>
        `)
      },
      {
        name: 'Última conexión Desc',
        type: 'sort',
        value: 'ultima_conexion,desc',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-arrow-down w-4 h-4 inline"><path d="M12.338 21.994A10 10 0 1 1 21.925 13.227"/><path d="M12 6v6l2 1"/><path d="m14 18 4 4 4-4"/><path d="M18 14v8"/></svg>
        `)
      },
      {
        name: 'Última conexión Asc',
        type: 'sort',
        value: 'ultima_conexion,asc',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-arrow-up w-4 h-4 inline"><path d="M13.228 21.925A10 10 0 1 1 21.994 12.338"/><path d="M12 6v6l1.562.781"/><path d="m14 18 4-4 4 4"/><path d="M18 22v-8"/></svg>
        `)
      },
      {
        name: 'User',
        type: 'filter',
        value: 'USER',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg class="w-4 h-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
          <path
              d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              stroke="#000000" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
              stroke="#000000" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
        </svg>
        `)
      },
      {
        name: 'Admin',
        type: 'filter',
        value: 'ADMIN',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg class="w-4 h-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
          <path
              d="M11 21H4C4 17.4735 6.60771 14.5561 10 14.0709M19.8726 15.2038C19.8044 15.2079 19.7357 15.21 19.6667 15.21C18.6422 15.21 17.7077 14.7524 17 14C16.2923 14.7524 15.3578 15.2099 14.3333 15.2099C14.2643 15.2099 14.1956 15.2078 14.1274 15.2037C14.0442 15.5853 14 15.9855 14 16.3979C14 18.6121 15.2748 20.4725 17 21C18.7252 20.4725 20 18.6121 20 16.3979C20 15.9855 19.9558 15.5853 19.8726 15.2038ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
              stroke="#000000" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
        </svg>
        `)
      }
    ];
  }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  // Función para abrir el dropdown correspondiente
  toggleDropdown(id_user: number): void {
    if (this.openDropdownId === id_user) {
      // Si el dropdown ya está abierto, ciérralo
      this.openDropdownId = null;
    } else {
      // Abre el nuevo dropdown y cierra el anterior
      this.openDropdownId = id_user;
    }
  }

  // Función para manejar la selección de una opción en el dropdown
  selectOption(option: string): void {
    console.log(`Selected option: ${option}`);
    this.openDropdownId = null; // Cierra el dropdown después de seleccionar una opción
  }

  onInputChange(): void {
    let trimmedText = this.searchText.trim().replace(/\s+/g, ' ');
    this.searchText = trimmedText;

    if (trimmedText.length > 0 && /[a-zA-Z0-9]/.test(trimmedText)) {
      this.isCleanButtonEnabled = true;
      this.currentPage = 0; // Reiniciar a la primera página al hacer una búsqueda
      this.loadPage(this.currentPage, this.selectedSortParam, this.selectedFilterParam, this.searchText);
    } else {
      this.isCleanButtonEnabled = false;
      // Cuando el texto está vacío, hacer una búsqueda sin parámetros de búsqueda
      this.loadPage(this.currentPage, this.selectedSortParam, this.selectedFilterParam, '');
    }
  }

  // Función para limpiar el campo de búsqueda y recargar sin búsqueda
  clearSearch(): void {
    this.searchText = '';
    this.isCleanButtonEnabled = false; // Deshabilitar el botón después de limpiar
    this.currentPage = 0; // Reiniciar a la primera página al limpiar la búsqueda
    this.loadPage(this.currentPage, this.selectedSortParam, this.selectedFilterParam, '');
  }


  // Función para seleccionar un filtro de orden
  selectFilter(filter: FilterOption): void {
    this.selectedFilter = filter;
    this.showFilterMenu = false;

    // Limpiar el parámetro de filtro al seleccionar un parámetro de orden
    this.selectedFilterParam = '';
    this.selectedSortParam = '';

    switch (filter.value) {
      case 'nombre_user,desc':
        this.selectedSortParam = 'nombre_user,desc';
        break;
      case 'nombre_user,asc':
        this.selectedSortParam = 'nombre_user,asc';
        break;
      case 'email,desc':
        this.selectedSortParam = 'email,desc';
        break;
      case 'email,asc':
        this.selectedSortParam = 'email,asc';
        break;
      case 'ultima_conexion,desc':
        this.selectedSortParam = 'ultima_conexion,desc';
        break;
      case 'ultima_conexion,asc':
        this.selectedSortParam = 'ultima_conexion,asc';
        break;
    }

    // Reiniciar la página a la primera al cambiar el filtro o el orden
    this.currentPage = 0;
    this.loadPage(this.currentPage, this.selectedSortParam, '', this.searchText);
  }

  selectFilterRol(filter: FilterOption): void {
    this.selectedFilter = filter;
    this.showFilterMenu = false;

    // Limpiar el parámetro de orden al seleccionar un filtro
    this.selectedSortParam = '';
    this.selectedFilterParam = '';

    switch (filter.name) {
      case 'User':
        this.selectedFilterParam = 'USER';
        break;
      case 'Admin':
        this.selectedFilterParam = 'ADMIN';
        break;
    }

    // Reiniciar la página a la primera al cambiar el filtro o el orden
    this.currentPage = 0;
    this.loadPage(this.currentPage, '', this.selectedFilterParam, this.searchText);
  }

  isSelected(filter: FilterOption): boolean {
    return this.selectedFilter?.name === filter.name;
  }

  applyFilter(filter: any): void {
    if (filter.type === 'sort') {
      this.selectFilter(filter);
    } else if (filter.type === 'filter') {
      this.selectFilterRol(filter);
    }
  }

  loadPage(page: number, sort: string = '', filter: string = '', searchText: string = ''): void {
    // Asegúrate de que solo uno de los parámetros se pase a la solicitud
    if (sort && filter) {
      filter = ''; // Si ambos están presentes, elimina el filtro
    }
    this.adminService.getUsersWithRole(page, this.pageSize, sort, filter, searchText).subscribe({
      next: (response) => {
        this.usersConRol = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
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

  // Función para manejar el cambio de página
  onPageChange(page: number): void {
    // Verifica si la página realmente cambió antes de cargar
    if (page !== this.currentPage && page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadPage(this.currentPage, this.selectedSortParam, this.selectedFilterParam);
    }
  }

  getStartIndex(): number {
    return this.currentPage * this.pageSize + 1;
  }

  getEndIndex(): number {
    const endIndex = (this.currentPage + 1) * this.pageSize;
    return endIndex > this.totalElements ? this.totalElements : endIndex;
  }

  changeRole(user: any): void {
    const userUpdateRol = { 
      id_user: user.id_user,
      role: user.role === 'USER' ? 'ADMIN' : 'USER'
    };

    this.adminService.editarRolUsuario(userUpdateRol).subscribe({
      next: (response: any) => {
        this.toastMessage = response.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
        this.loadPage(this.currentPage, this.selectedSortParam, this.selectedFilterParam, this.searchText);
      },
      error: (error: any) => {
        console.error('Error updating user role:', error);
      }
    })
    this.openDropdownId = null;
  }

  viewProfile(user: any): void {
    console.log(`Ver perfil de usuario: `, user);
    this.openDropdownId = null;
  }

  deleteUser(user: any): void {
    this.openDropdownId = null;
    this.selectedUser = user; // Almacena el usuario seleccionado
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.openDropdownId = null;
    this.showDeleteModal = false;
    this.selectedUser = null; // Opcional: limpiar el usuario seleccionado al cerrar el modal
  }

  confirmDelete(): void {
    const deleteUser = {
      id_user: this.selectedUser.id_user
    };
    this.adminService.eliminarUsuario(deleteUser).subscribe({
      next: (response: any) => {
        this.toastMessage = response.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
        this.loadPage(this.currentPage, this.selectedSortParam, this.selectedFilterParam, this.searchText);
      },
      error: (error: any) => {
        console.error('Error deleting user:', error);
      }
    })
    this.closeDeleteModal();
  }
}
