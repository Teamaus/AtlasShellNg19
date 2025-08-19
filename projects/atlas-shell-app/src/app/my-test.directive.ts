import { Directive } from '@angular/core';
import { MyDirective } from './myDecorator';
import { DirTestComponent } from './dir-test/dir-test.component';
export class BaseDirective {

}
@Directive({
    standalone:false,
  selector: '[my-test]'
})
export class MyTestDirective {

  constructor(comp:DirTestComponent)
   { 

    comp.directives.push(this)
    console.log('Directive Metadata:', (MyTestDirective as any).ɵdir);
    }
  

}
