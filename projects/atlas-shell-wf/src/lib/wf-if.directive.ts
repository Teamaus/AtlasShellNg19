import { ContentChild, Directive, ElementRef } from '@angular/core';
import { WfStepDirective } from './wf-step.directive';
import { IWfRunnable, setParentToken } from './TOKENS';
import { switchMap } from 'rxjs/operators';


@Directive({
  standalone:false,
  selector: 'wf-if',
  providers:[setParentToken(WfIfDirective)]
})
export class WfIfDirective extends WfStepDirective {
      @ContentChild("step") wfTrue? : ElementRef
      @ContentChild("else_step") wfFalse? : ElementRef

      handleResult(result:boolean){
        
         
          if (this.wfTrue)
          {
            if (result)
            {
                console.log("Running True condition")
                this.wfManager.getStep(this.wfTrue).execute()
                
              
            }
            
            else{
              if (this.wfFalse)
                this.wfManager.getStep(this.wfFalse).execute()
            }
          }
      }
       override setResult(result: any): void {
       
          super.setResult(result)
          this.handleResult(result as boolean)

       }
      

}
