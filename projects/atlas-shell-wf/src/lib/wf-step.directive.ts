import { Directive, forwardRef, Inject, Input, SkipSelf } from '@angular/core';
import { IWfCustomRunner, IWfRunnable, IWfStep, PARENT_TOKEN, setParentToken } from './TOKENS';
import { WfElement } from './wf-element';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Directive({
  standalone:false,
  selector: 'wf-step',
  providers:[setParentToken(WfStepDirective)]
})
export class WfStepDirective extends WfElement implements IWfRunnable {
  setRunner(runner: IWfCustomRunner): void {
   
    this.runner = runner
  }
 // onExecute$ = new Subject<any>()
  @Input() RefName:string = "" 
  result$ = new Subject<any>(); 
  runner?:IWfCustomRunner
  getResult$<T>(): Observable<T> {
    return this.result$
  }
  
  
  execute(): void {
    if (this.runner){
      this.result$ = new Subject<any>();
     
      this.runner.run() ;
      
     
    }
    else{
      console.log("NO RUNNER")
    }
  }
  result:any = {} 
  
  

  ngOnInit()
  {
      
  }
  setResult(result:any){
    
    this.result$.next(result)
    console.log("COMPLETED setResult")
    if (this.RefName!='')
      this.wfManager.setRef(this.RefName,this.root.getWfName(),result)
    this.result$.complete()
  
  }
  getResult(){
    return this.result
  }
  ngAfterContentInit(){
      
      
  }
}
