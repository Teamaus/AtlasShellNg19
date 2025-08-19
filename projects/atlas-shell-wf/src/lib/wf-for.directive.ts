import { ContentChild, ContentChildren, Directive, Inject, Input, QueryList } from '@angular/core';

import { from, Observable, of, Subject } from 'rxjs';
import { WfStepDirective } from './wf-step.directive';
import { WfCurrentDirective } from './wf-current.directive';
import { WfCurrentConditionDirective } from './wf-current-condition.directive';
import { IWfConditionalHandler, IWfCustomRunner, setParentToken } from './TOKENS';
import { concatMap, filter, tap } from 'rxjs/operators';

@Directive({
  standalone:false,
  selector: 'wf-for',
  providers:[setParentToken(WfForDirective)]

})
export class WfForDirective extends WfStepDirective{
  @ContentChild("step") step?:WfStepDirective
 
  wf_current?:WfCurrentDirective
  wf_current_condition?:WfCurrentDirective
  override execute(): void {
      if (!this.step)
        return 
      if (!this.wf_current)
        return 
      
      
      (this.onExecute$ as Subject<any>).next("")
      console.log("CHILDREN LENGTH",this.handlers.length)
      if (this.handlers)
      {
        from(this.handlers).pipe(

              concatMap(handler=>{
                    if (this.wf_current) 
                    {
                      //this.wf_current.handler = handler
                    }
                    else
                      throw Error("wf-current is undefined")
                    if (this.step)
                    {
                        this.step.execute()
                        return this.step.getResult$()
                    }
                    else
                      throw Error("Step is undefined")
                  })
                  
      
                ).subscribe(
                  (data) => console.log("DATA AFTER WF:",data),
                  err => console.error("Error:", err),
                  () => {this.setResult("COMPLETED");(this.onExecute$ as Subject<any>).complete()}
                )
              }
            
  }
  @Input() handlers:Array<IWfCustomRunner> = []  
  results:any[] = []
  override setResult(result: any): void {
      this.result.push(result)
  }


}
