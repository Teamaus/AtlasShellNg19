import { Directive } from '@angular/core';
import { WfForDirective } from './wf-for.directive';
import { WfCurrentDirective } from './wf-current.directive';

@Directive({
  standalone:false,
  selector: '[libWfCurrentCondition]'
})
export class WfCurrentConditionDirective /*extends WfCurrentDirective*/{

  constructor(wfFor:WfForDirective) {
     
       

   }
   

}
