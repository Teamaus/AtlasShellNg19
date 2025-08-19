import { Directive, Inject } from '@angular/core';

import { IWfCustomRunner, IWfRunnable, IWfStep, PARENT_TOKEN } from 'atlas-shell-wf';
import { take } from 'rxjs/operators';

@Directive({
    standalone:false,
  selector: '[condition]'
})
export class ConditionDirective implements IWfCustomRunner{
  constructor(@Inject(PARENT_TOKEN) private parent:IWfStep|IWfRunnable){

  }
  run(): void {
    alert("Condition Running...");
    let result :any = (this.parent as IWfStep).getParam("show-result");
    (this.parent as IWfStep).setResult(result.confirm)
   
  }
  ngOnInit(){
    (this.parent as IWfRunnable).setRunner(this)

  }

}
