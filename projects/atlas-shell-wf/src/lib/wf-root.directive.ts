import { Directive, forwardRef, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { PARENT_TOKEN, WF_ITERATOR_SERVICE, WF_ROOT, WfRoot } from './TOKENS';
import { WfManagerService } from './wf-manager.service';


import { WfDirective } from './wf.directive';
import { AtlasShellEntityService, WfRegistryService } from 'atlas-shell-ui';
import { CREATE_WF } from './wf-reducer';
import { WfIteratorService } from './wf-iterator.service';



@Directive({
  standalone:false,
  selector: '[wf-root]',
  providers:[{provide:WF_ROOT,useExisting:forwardRef(()=>WfRootDirective)}
    ,{provide:WF_ITERATOR_SERVICE, useClass:WfIteratorService},
    WfManagerService]

})
export class WfRootDirective implements WfRoot,OnInit,OnDestroy{
  @Input("wf-name") wf_name:string = "" 
  constructor(@Inject(PARENT_TOKEN) private parent:WfDirective,private wfManager:WfManagerService,private wfRegistry:WfRegistryService,@Optional() private shellEntityService:AtlasShellEntityService) {
      console.log("WE HAVE A WF ROOT")
   }
  getWfName(): string {
    return this.wf_name
  }
  run(): void {
    this.parent.execute()
  }
  ngOnDestroy(): void {
       const id = this.shellEntityService?this.shellEntityService.entity.id:"0"
    this.wfRegistry.remove(id,this.wf_name)
  }
  getWfManager(): WfManagerService {
    return this.wfManager
  }
   ngOnInit(){
      const id = this.shellEntityService?this.shellEntityService.entity.id:"0"
      console.log("GOING TO REGISTER",this.wf_name)
      this.wfRegistry.register(id,this.wf_name,this)
      this.shellEntityService.dispatch(CREATE_WF({id:this.shellEntityService.entity.id,workflow:this.wf_name}))
   }
   exit(){
    this.parent.exit() 
   }
   
}
