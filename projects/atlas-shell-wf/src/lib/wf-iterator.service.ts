import { Injectable } from '@angular/core';
import { IIterator, IIteratorService } from './TOKENS';

@Injectable()
export class WfIteratorService implements IIteratorService {

  iterators:{[key:string]:IIterator} ={}
  constructor() { }
  delete(key: string): void {
    if (this.iterators[key]){
       delete this.iterators[key]
    }
  }
  add(key: string, iterator: IIterator): IIterator {
    this.iterators[key] = iterator 
    return iterator 
  }
  
  get(key:string):IIterator{
      return this.iterators[key]
  }
 
}
