import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent {
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
