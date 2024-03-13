import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent {
  openShow: boolean = false;
  openDropDown: boolean = false;
  closeDropDown: boolean = true;

  constructor( private elementRef: ElementRef ) { }

  ngOnInit(): void {
    this.closeDropDown = this.closeDropDown;
  }

  toggleMenu() {
    this.openShow = !this.openShow;
    this.openDropDown = !this.openDropDown;
    this.closeDropDown = !this.closeDropDown;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.openShow = false;
    this.openDropDown = false;
    this.closeDropDown = true;
  }
}
