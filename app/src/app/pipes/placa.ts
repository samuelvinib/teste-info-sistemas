import { Pipe, PipeTransform } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Pipe({
  name: 'placa'
})
export class PlacaPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      value = value.toUpperCase();
      value = value.replace(/[^a-zA-Z0-9]/g, '');

      if (value.length > 7) {
        value = value.substring(0, 7);
      }

      if (value.length > 3) {
        value = value.replace(/(\w{3})(\w+)/, '$1-$2');
      }
    }

    return value;
  }
}

@Directive({
  selector: '[appPlaca]'
})
export class PlacaDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    const formattedValue = value.toUpperCase().replace(/[^a-zA-Z0-9]/g, '');

    if (formattedValue.length > 7) {
      event.target.value = formattedValue.substring(0, 7);
    } else {
      event.target.value = formattedValue;
    }
  }
}
