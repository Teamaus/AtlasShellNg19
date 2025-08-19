import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import { WfForDirective } from './wf-for.directive';
import { IHandler, IIterator, IIteratorService, IWfCustomRunner, IWfRunnable, IWfStep, PARENT_TOKEN, WF_ITERATOR, WF_ITERATOR_SERVICE } from './TOKENS';

function getIterator(iteratorService:IIteratorService
,elem:ElementRef):IIterator
{
    return  iteratorService.get(elem.nativeElement.attributes[0].name)
}
@Directive({
  standalone:false,
  selector: '[wf-current]',
  providers:[{provide:WF_ITERATOR,useFactory:getIterator,deps:[WF_ITERATOR_SERVICE,ElementRef]}]

  
})
export class WfCurrentDirective implements IWfCustomRunner,OnInit {
  handler?:IHandler 
  constructor(@Inject(WF_ITERATOR) private iterator:IIterator ,@Inject(PARENT_TOKEN)private parent:IWfStep|IWfRunnable) { }
  ngOnInit(): void {
      const runner = this.parent as IWfRunnable
      runner.setRunner(this)
  }
  run(): void {
      if (this.handler)
      {
        this.handler?.run();
        const step  =  this.parent as IWfStep 
        step.setResult((this.handler as any).getResult())
      }
 
  }

  setHandler(handler:IHandler){
      this.handler = handler 
  }

}
