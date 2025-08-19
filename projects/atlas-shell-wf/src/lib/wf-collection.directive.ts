import { Directive, Inject, Input } from '@angular/core';
import { IIterator, IIteratorService, WF_ITERATOR_SERVICE } from './TOKENS';
class Iterator implements IIterator{
  index:number = 0
  constructor(private collection:any[]){

  }
  current(): any{
    return this.collection[this.index]
  }
  next() {
    return this.collection[++this.index]
  }
  first() {
    this.index=0 
    return this.collection[this.index]
  }
  prev() {
    return this.collection[--this.index]
  }
  last() {
    this.index = this.collection.length-1
    return this.collection[this.index]
  }
  end(): boolean {
    return this.index>=this.collection.length
  }
    
}
@Directive({
  standalone:false,
  selector: 'wf-collection'
})
export class WfCollectionDirective {
  @Input() collection:Array<any> = []
  constructor(@Inject(WF_ITERATOR_SERVICE)private iteratorService:IIteratorService) { 
      
  }
  getIterartor(key:string){
    const retval = new Iterator(this.collection)
    this.iteratorService.add(key,retval)
    return retval 
  }
  deleteIterator(key:string){
    this.iteratorService.delete(key)
  }
  
}
