import { ContentChildren, Directive, forwardRef, Input, QueryList, ViewChildren } from '@angular/core';
import { IWfStep, setParentToken, WF_STEP } from './TOKENS';
import { WfElement } from './wf-element';

import { from, Observable, Subject } from 'rxjs';
import { concatMap, finalize, takeWhile, tap } from 'rxjs/operators';
import { WfStepDirective } from './wf-step.directive';




@Directive({
  standalone:false,
  selector: 'wf',
  providers:[setParentToken(WfDirective)]
  
})
export class WfDirective extends WfStepDirective {
  @Input("wf-name") wf_name = "" 
  quit = false
  
  @ContentChildren(WF_STEP) children?:QueryList<IWfStep>
  
  
  exit(){
    this.quit = true
  }
  override execute(): void {
      
      if (this.children)
      {
          (this.onExecute$ as Subject<any>).next("")
          console.log("CHILDREN LENGTH",this.children.toArray().length)
          from(this.children.toArray()).pipe(
            concatMap(step=>{
              //const step = this.wfManager.getStep(child)
              step.execute()
              return step.getResult$().pipe(
              tap(data=>console.log("TAP RESULT:",data))
            
            )}),
            

          ).subscribe(
            (data) => console.log("DATA AFTER WF:",data),
            err => console.error("Error:", err),
            () => {this.setResult("COMPLETED");(this.onExecute$ as Subject<any>).complete()}
          )
          /*
        for (const child of this.children){
            this.wfManager.getStep(child).execute()
            if (this.quit) break
            
        }*/
      }
  }
  ngAfterViewInit(){
    console.log("=>>>:",this.children)
    
  }
  


  
}
