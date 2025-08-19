import { Directive, ElementRef, Inject } from '@angular/core';
import { WfManagerService } from 'atlas-shell-wf';
import { IWfCustomRunner, IWfRunnable, IWfStep, PARENT_TOKEN } from 'atlas-shell-wf';

@Directive({
    standalone:false,
  selector: '[show2]'
})
export class Show2Directive implements IWfCustomRunner {

  constructor(@Inject(PARENT_TOKEN) private parent:IWfStep|IWfRunnable,private el:ElementRef,private wfManager:WfManagerService) {
   
   }
  run(): void {
    alert("HEI")
    console.log("SHOW2:",(this.parent as IWfStep).getParams())
    console.log("SHOW2:",this.wfManager._ref);
    (this.parent as IWfStep).setResult("SHOW2 ")
    
  }
  ngOnInit(){
    (this.parent as IWfRunnable).setRunner(this);
   

  }
  

}
