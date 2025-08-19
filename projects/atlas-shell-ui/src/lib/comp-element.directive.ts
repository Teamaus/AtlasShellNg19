import { Directive } from '@angular/core';

@Directive({
    standalone:false,
  selector: '[libCompElement]'
})
export class CompElementDirective {

  constructor() { }

}
