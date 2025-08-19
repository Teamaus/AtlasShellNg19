import { Directive } from '@angular/core';

export function MyDirective(metadata: any): ClassDecorator {
  return function (target: any) {
    // Attach Angular's @Directive behavior
    Directive(metadata)(target);

	console.log("METADATA:",Reflect)

   
  };
}
