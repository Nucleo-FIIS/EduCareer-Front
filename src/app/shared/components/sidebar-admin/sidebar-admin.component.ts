import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent {
  @Input() breadcrumb1!: string;
  @Input() breadcrumb2!: string;

  isMobileSidebarOpen = false;

  toggleSidebar() {
    // const sidebar = document.getElementById('application-sidebar');
    // if (sidebar) {
    //   sidebar.classList.toggle('open');
    // }

    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }
}
