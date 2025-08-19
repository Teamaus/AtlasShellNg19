import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import { IIterator, IIteratorService, WF_ITERATOR_SERVICE } from './TOKENS';
import { WfCollectionDirective } from './wf-collection.directive';

@Directive({
  standalone:false,
  selector: 'wf-iterator',
  
})
export class WfIteratorDirective implements OnInit {

  iterator?:IIterator
  constructor(private elemRef:ElementRef,private wfCollection:WfCollectionDirective,@Inject(WF_ITERATOR_SERVICE)iteratorService:IIteratorService) 
  {
      
  }
  ngOnInit(): void {
      this.iterator = this.wfCollection.getIterartor(this.elemRef.nativeElement.attributes[0].name)
      
      
  }
  ngOnDestroy(){
      this.wfCollection.deleteIterator(this.elemRef.nativeElement.attributes[0].name)
  }

}
