import { Inject, Injectable } from '@angular/core';

import { activeEntityInstanceIDSelector, entitiesByActiveCategoryPathSelector, entitiesByActiveCategorySelector, entitiesTreeSelector, entityByInstanceIDSelector, entitySelector, entityTreeActiveIDLevelSelector, entityTreeActivePathSelector, entityTreeActiveSnapShotSelector, entityTreeIDSelector, entityTreePathSelector, pathByActiveCategorySelector } from './atlas-shell.reducer';
import { ATLAS_SHELL_TOKEN } from './atlas-shell.tokens';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { atlas_log } from 'atlas-utils';


@Injectable({
  providedIn: 'root'
})

export class AtlasShellSelectorService {
  
  constructor(@Inject(ATLAS_SHELL_TOKEN)private shellToken:string) { 

  }
  entityTreeIDSelector=(id:string)=>entityTreeIDSelector(this.shellToken,id)
  entityTreePathSelector = (id:string,path:string[])=>entityTreePathSelector(this.shellToken,id,path)
  entityTreeActivePathSelector = ()=>entityTreeActivePathSelector(this.shellToken)
  entityTreeActiveIDLevelSelector = (level:number,category:string)=>entityTreeActiveIDLevelSelector(this.shellToken,level,category)
  entityTreeActiveSnapShotSelector = (outlet:string)=>entityTreeActiveSnapShotSelector(this.shellToken,outlet)
  entitiesTreeSelector = (path:string[],entitiesCategory='')=>entitiesTreeSelector(this.shellToken,path,entitiesCategory)
  entitiesByActiveCategorySelector = (category:string)=>entitiesByActiveCategorySelector(this.shellToken,category)
  pathByActiveCategorySelector = (category:string)=>pathByActiveCategorySelector(this.shellToken,category)
  entitiesByActiveCategoryPathSelector = (categoryPath:string[])=>entitiesByActiveCategoryPathSelector(this.shellToken,categoryPath)
  activeInstanceIDSelector = (entityID:string)=>activeEntityInstanceIDSelector(this.shellToken,entityID)
  entityInstanceIDSelector=(entityID:string,category:string)=>createSelector(
    entitySelector(this.shellToken,entityID,category),
    (entity:any)=>
    {
      console.log("GIVE ME CATEGORY=>>>",entityID,category)
      return entity.instanceID
    }
  )
  parentEntitySelector(entityID:string,category:string):any{
    if (entityID=='root'){
      let entID = category.split("_")[1]
      return createSelector(
        createFeatureSelector(this.shellToken),
        (state:any)=>state.entities[entID]
      )
    }
    atlas_log(this,"PARENT ENTITY ID",entityID,category)
    return this.entityInstanceIDSelector(entityID,category)
   }

  
  entitiesSelector = (entityID:string,category:string)=>createSelector(
    this.parentEntitySelector(entityID,category),
    (state:any)=> state?state.entities:state
  )
  entitySelectorByInstance=(slice:string,instanceID:number)=>entityByInstanceIDSelector(slice,instanceID)

  rootSelector = ()=>createSelector(
    createFeatureSelector(this.shellToken),
    (state)=>state
  )
  
  rootEntitiesSelector=()=>createSelector(  
    this.rootSelector(),
    (state:any)=>state.entities
  )
  rootActiveIDSelector=()=>createSelector(
    this.rootSelector(),
    (state:any)=>state.activeID["root"]
  )
  nestedSelector=(path:string[])=>{

      const f:any = (selector:any,path:string[])=>{
          if (path.length==0){
              return selector
          }
          let [first,...rest]=path
          return f(createSelector(selector,(state:any)=>state[first]),rest)

      }
      let [first,...rest]  = path
      let retval = f(createFeatureSelector(path[0]),rest)
      retval.path = path 
      return retval

  }
    
  get eventsSelector() {
  return  createSelector(
    createFeatureSelector(this.shellToken),
    (state:any)=>state.events
  )
}
  eventSubjectSelector = (id:string,event:string,eventSubject:string)=>createSelector(
    this.eventsSelector,
    (state:any)=>{

       
        let retval = state?state[id]?state[id][event]:undefined:undefined
       
        if (!retval)
          return retval
        return {[eventSubject]:retval!.Subject[eventSubject],id:id}
      }
    
  )
  eventValueSelector = (id:string,event:string)=>createSelector(
    this.eventsSelector,
    (state:any)=>{
      let retval = state?state[id]?state[id][event]:undefined:undefined
      return retval?retval.Value:undefined
    }
  )


}
