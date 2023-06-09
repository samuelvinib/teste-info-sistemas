import { Pipe, PipeTransform } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Pipe({
  name: 'renavam'
})
export class RenavamPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      value = value.replace(/\D/g, '');

      if (value.length > 11) {
        value = value.substring(0, 11);
      }

      value = value.replace(/(\d{4})(\d{4})(\d{3})/, '$1 $2 $3');
    }

    return value;
  }
}

@Directive({
  selector: '[appRenavam]'
})
export class RenavamDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    const formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length > 11) {
      event.target.value = formattedValue.substring(0, 11);
    } else {
      event.target.value = formattedValue;
    }
  }
}
