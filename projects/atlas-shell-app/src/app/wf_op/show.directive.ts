import { Directive, Inject } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { AtlasShellEntityService } from 'atlas-shell-ui';
import { IWfCustomRunner, IWfRunnable, IWfStep, PARENT_TOKEN } from 'atlas-shell-wf'
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
@Directive({
    standalone:false,
  selector: '[show]'
})
export class ShowDirective implements  IWfCustomRunner{
     selectorB = createSelector(
        
      createFeatureSelector("COP"),
        (state:any)=>state.cData.value
    )
    
    constructor(@Inject(PARENT_TOKEN) private parent:IWfStep|IWfRunnable,private shellEntityService:AtlasShellEntityService,
  private store:Store<any>){
    
    }
    ngOnInit(){
      (this.parent as IWfRunnable).setRunner(this)
      this.store.select(state=>state)
      .subscribe(state=>console.log("$$$STATE:",state))
      console.log("$$$",this.shellEntityService.entity.id)

    }
    run(){
      this.shellEntityService.shellEntitySelect(this.selectorB,"cData")
      .pipe(take(1))
      .subscribe(
        (v:any)=>{
          let retval  = confirm("OH...?"+v);
          (this.parent as IWfStep).getResult$().subscribe(res=>console.log("SHO->>RESULT>>>:",res));
          (this.parent as IWfStep).setResult({confirm:retval})
        }
      )
    
    }
}
