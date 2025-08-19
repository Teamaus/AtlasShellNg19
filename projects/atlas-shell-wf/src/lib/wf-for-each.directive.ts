import { ContentChildren, Directive, ElementRef, Inject, QueryList } from '@angular/core';
import { IIterator, IIteratorService, IWfStep, PARENT_TOKEN, WF_ITERATOR_SERVICE, WF_ROOT, WfRoot } from './TOKENS';
import { WfStepDirective } from './wf-step.directive';
import { WfManagerService } from './wf-manager.service';


@Directive({
  standalone:false,
  selector: 'wf-for-each'
})
export class WfForEachDirective extends WfStepDirective{
  @ContentChildren("step") steps?:QueryList<WfStepDirective>
  iterators:{[key:string]:IIterator} = {} 
  constructor(@Inject(WF_ITERATOR_SERVICE) private iteratorService:IIteratorService
  ,elemRef:ElementRef,@Inject(PARENT_TOKEN) parent:IWfStep,@Inject(WF_ROOT) root:WfRoot,wfManager:WfManagerService) { 
    super(root,parent,elemRef,wfManager)
      this.iterators = this.getIterators()   

  }
  ngAfterViewInit(){

  }
  getIterators(){
    const iteratorsArr = this.el.nativeElement.attributes.map((attr:any)=>{return {[attr.name]:this.iteratorService.get(attr.name)}})
    return iteratorsArr.reduce((itObj:any,acc:any)=>acc.assign(itObj),{})
  }
  override execute(){
    for(;;){
        
    }
  }

}
