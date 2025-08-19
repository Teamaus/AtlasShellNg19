import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { IWfStep, PARENT_TOKEN, WF_ROOT } from './TOKENS';
import { WfManagerService } from './wf-manager.service';
import { AtlasShellEntityService } from 'atlas-shell-ui';
import { WfRootDirective } from './wf-root.directive';
import { switchMap } from 'rxjs/operators';

@Directive({
  standalone:false,
  selector: 'wf-ref'
})
export class WfRefDirective {
  @Input() RefName:string = ""
  constructor(@Inject(PARENT_TOKEN)private parent:IWfStep,
  @Inject(WF_ROOT)private root:WfRootDirective, private el:ElementRef,
  private wfManager:WfManagerService) {
    
   }
   ngOnInit(){
    
    this.parent.getResult$()
    .subscribe((result:any)=>{this.wfManager.setRef(this.RefName,this.root.wf_name, result);console.log("HAAA")})
      
    console.log("REFNAME:>>>",this.RefName)
   }



}
