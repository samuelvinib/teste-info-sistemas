import { Pipe, PipeTransform } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Pipe({
  name: 'ano'
})
export class AnoPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      value = value.replace(/\D/g, '');

      if (value.length > 4) {
        value = value.substring(0, 4);
      }
    }

    return value;
  }
}

@Directive({
  selector: '[appAno]'
})
export class AnoDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    const formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length > 4) {
      event.target.value = formattedValue.substring(0, 4);
    } else {
      event.target.value = formattedValue;
    }
  }
}
