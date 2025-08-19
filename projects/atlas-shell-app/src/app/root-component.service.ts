import { Injectable } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { AtlasShellSelectorService } from 'atlas-shell-logic';
import { map, tap ,filter, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RootComponentService {

  constructor(private shellSelector:AtlasShellSelectorService,
    private store:Store<any>) { }
  rootEntities$(){
    let selector = this.shellSelector.rootEntitiesSelector()
     
    let obs$  = this.store.select(selector)
    .pipe(map((entities:any)=>{return {...entities}}))
    .pipe(map(entities=>{delete(entities["0"]);return entities}))
    .pipe(map((entities:any)=>entities?Object.keys(entities).map(key=>entities[key]):entities))


    
   
   
    return obs$
  }
  activeRootEntity$(){
    let obs$  = this.store.select(this.shellSelector.rootActiveIDSelector())
   
    
    return obs$
  }
  root$(){
    return this.store.select(this.shellSelector.rootSelector())
  }


}
