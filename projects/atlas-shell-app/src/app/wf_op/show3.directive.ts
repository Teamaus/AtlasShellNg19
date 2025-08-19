import { Directive, ElementRef, Inject } from '@angular/core';
import { IWfCustomRunner, IWfRunnable, IWfStep, PARENT_TOKEN } from 'atlas-shell-wf';
import { WfManagerService } from 'atlas-shell-wf';

@Directive({
    standalone:false,
  selector: '[show3]'
})
export class Show3Directive  implements IWfCustomRunner {

  constructor(@Inject(PARENT_TOKEN) private parent:IWfStep|IWfRunnable,private el:ElementRef,private wfManager:WfManagerService) {
   
   }
  run(): void {
    console.log("SHOW3:",(this.parent as IWfStep).getParams())
    console.log("SHOW3:",this.wfManager._ref);
    (this.parent as IWfStep).setResult("SHOW3 ")
    
  }
  ngOnInit(){
    (this.parent as IWfRunnable).setRunner(this);
    (this.parent as IWfStep).getResult$().subscribe(res=>console.log("RESULT:",res))
  }
}
