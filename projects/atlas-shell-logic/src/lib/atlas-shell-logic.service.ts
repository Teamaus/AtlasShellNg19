import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AtlasShellLogicService {

  constructor(private store:Store<any>)
  { 

  }
  activeID$(){
    return this.store.select(state=>state.activeInstanceID)
  }
  
  
}
