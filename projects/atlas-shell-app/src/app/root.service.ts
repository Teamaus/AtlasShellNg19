import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootService {
  count=0
  constructor() { }
  incr(){
    return ++this.count
  }
}
