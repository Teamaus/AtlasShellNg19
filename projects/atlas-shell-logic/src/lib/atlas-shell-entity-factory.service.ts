import { Inject, Injectable } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import { MemoizedSelector, Selector, createSelector } from '@ngrx/store';

import { atlas_log } from 'atlas-utils';
import { ATLAS_SHELL_TOKEN } from './atlas-shell.tokens';
import { AtlasShellSelectorService } from './atlas-shell-selector.service';
export interface AtlasShellEntity{
  id:string,
  type:string,
  path:string[] //path.length == 0 we add to root 
  category:string

}

@Injectable({
  providedIn: 'root'
})
export class AtlasShellEntityFactoryService {
  instanceID= 10000000
  getInstanceID(){
      return ++this.instanceID
  }

  constructor(@Inject(ATLAS_SHELL_TOKEN)private  shellToken:string,private shellSelector:AtlasShellSelectorService) { }
  createEntity(type:string,category:string):AtlasShellEntity{
      let retval = {id:this.getInstanceID().toString(),category:category,type:type,path:[]}
      
      
      atlas_log(this,"CreateEntity_Factory",retval)
      return retval
  }
  createEntitySelector(entity:AtlasShellEntity){
      return this.shellSelector.entityTreeIDSelector(entity.id)
  }
  getEntitiesIDSSelctor(selector:any){
    return createSelector(
      selector,
      (state:EntityState<any>)=>state.ids
    )
  }
  getEntitiesSelector(selector:any){
      return createSelector(
        selector,
        (state:EntityState<any>)=>state.entities
      )
  }
  getActiveEntitySelector(selector:any){
    return createSelector(
      selector,
      (state:any)=>(state.activeID)?state.activeID[Object.keys(state.activeID)[0]]:undefined
    )
  }

}
