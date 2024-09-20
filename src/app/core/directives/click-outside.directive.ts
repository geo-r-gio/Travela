import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef : ElementRef) { }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(clickedElement);
    const clickedInsideMenu = clickedElement.closest('.menu-toggle, .image');

    if (!clickedInside && !clickedInsideMenu) {
      this.clickOutside.emit();
    }
  }
}
