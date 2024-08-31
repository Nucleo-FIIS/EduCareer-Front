import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  @Input("appTooltip") tooltipTitle: string = '';
  @Input() placement: string = 'top';
  @Input() delay: number = 0;
  tooltip: HTMLElement | undefined;
  offset = 10;

  constructor(private el: ElementRef) { }

  @HostListener("mouseenter") onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener("mouseleave") onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  show() {
    this.create();
    this.setPosition();
    if (this.tooltip) {
      this.tooltip.classList.add("ng-tooltip-show");
    }
  }

  hide() {
    if (this.tooltip) {
      this.tooltip.classList.remove("ng-tooltip-show");
      setTimeout(() => {
        this.tooltip?.remove();
        this.tooltip = undefined;
      }, 300); // Alineado con la transición en el CSS
    }
  }

  create() {
    this.tooltip = document.createElement("span");
    this.tooltip.classList.add("ng-tooltip");
    this.tooltip.textContent = this.tooltipTitle;
    document.body.appendChild(this.tooltip);
  }

  setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip?.getBoundingClientRect();

    if (!tooltipPos) return;

    let left: number, top: number;

    switch (this.placement) {
      case "top":
        left = hostPos.left + window.scrollX + hostPos.width / 2 - tooltipPos.width / 2;
        top = hostPos.top + window.scrollY - tooltipPos.height - this.offset;
        break;
      case "bottom":
        left = hostPos.left + window.scrollX + hostPos.width / 2 - tooltipPos.width / 2;
        top = hostPos.bottom + window.scrollY + this.offset;
        break;
      case "left":
        left = hostPos.left + window.scrollX - tooltipPos.width - this.offset;
        top = hostPos.top + window.scrollY + hostPos.height / 2 - tooltipPos.height / 2;
        break;
      case "right":
        left = hostPos.right + window.scrollX + this.offset;
        top = hostPos.top + window.scrollY + hostPos.height / 2 - tooltipPos.height / 2;
        break;
      default:
        left = hostPos.left + window.scrollX + hostPos.width / 2 - tooltipPos.width / 2;
        top = hostPos.top + window.scrollY + hostPos.height / 2 - tooltipPos.height / 2;
        break;
    }

    if (this.tooltip) {
      this.tooltip.style.left = `${left}px`;
      this.tooltip.style.top = `${top}px`;
    }
  }

}
