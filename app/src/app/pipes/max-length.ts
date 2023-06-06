import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaxLength]'
})
export class MaxLengthDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    if (value.length > 20) {
      event.target.value = value.substring(0, 20);
    }
  }
}
