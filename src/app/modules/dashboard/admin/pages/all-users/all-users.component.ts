import { Component } from '@angular/core';

interface User {
  name: string;
  email: string;
  type: string;
  registrationDate: string;
  lastLogin: string;
  showMenu?: boolean;
}

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  searchTerm: string = '';
  showFilterMenu: boolean = false;
  selectedFilter: string = 'lastLoginAsc'; 
  users: User[] = [
    { name: 'Gallego Basteri Luis Miguel', email: 'luis.gallego@example.com', type: 'User', registrationDate: '02/05/2024', lastLogin: '14/08/2024' },
    { name: 'Sainz Castro Cristian', email: 'cristian.sainz@example.com', type: 'User', registrationDate: '02/05/2024', lastLogin: '14/08/2024' },
    { name: 'Figueroa Arce Elmer', email: 'elmer.figueroa@example.com', type: 'User', registrationDate: '02/09/2024', lastLogin: '13/08/2024' },
    { name: 'Reglero Montaner Héctor Eduardo', email: 'hector.reglero@example.com', type: 'Admin', registrationDate: '02/07/2024', lastLogin: '14/08/2024' },
    { name: 'Aguilera Valadez Alberto', email: 'alberto.aguilera@example.com', type: 'User', registrationDate: '18/07/2024', lastLogin: '12/08/2024' },
  ];

  filteredUsers: User[] = [];

  ngOnInit(): void {
    this.filteredUsers=this.users;
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sort(type: string): void {
    this.selectedFilter = type; 

    switch(type) {
      case 'name':
        this.filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'email':
        this.filteredUsers.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'emailDesc':
        this.filteredUsers.sort((a, b) => b.email.localeCompare(a.email));
        break;
      case 'lastLogin':
        this.filteredUsers.sort((a, b) => new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime());
        break;
      case 'lastLoginDesc':
        this.filteredUsers.sort((a, b) => new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime());
        break;
    }
    this.toggleFilterMenu();
  }

  filterByType(type: string): void {
    this.selectedFilter = type; 
    this.filteredUsers = this.users.filter(user => user.type === type);
    this.toggleFilterMenu();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredUsers = [...this.users];
  }

  toggleMenu(user: User): void {
    this.users.forEach(u => {
      if (u !== user) {
        u.showMenu = false;
      }
    });
    user.showMenu = !user.showMenu;
  }

  deleteUser(user: User): void {
    alert(`Eliminar usuario: ${user.name}`);
  }
  selectedFilterLabel(): string {
    switch (this.selectedFilter) {
      case 'name':
        return 'Nombre';
      case 'nameDesc':
        return 'Nombre';
      case 'email':
        return 'Email';
      case 'emailDesc':
        return 'Email';
      case 'lastLogin':
        return 'Última Conexión';
      case 'lastLoginDesc':
        return 'Última Conexión';
      case 'User':
        return 'User';
      case 'Admin':
        return 'Admin';
      default:
        return '';
    }
  }
  
}
