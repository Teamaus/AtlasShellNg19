import { Inject, Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { actionTypeToEntityActionType, ATLAS_SET_ACTIVE_INSTANCE_ACTION, ATLAS_SHELL_TOKEN, AtlasShellEntityFactoryService, AtlasShellRegistryService, createCompositeAction, TREE_ADDENTITY, TREE_SETACTIVE } from 'atlas-shell-logic';
import { Observable } from 'rxjs';
import { AtlasStoreBaseService } from './atlas-store-base.service';




@Injectable()
export class AtlasStoreService extends AtlasStoreBaseService {
    
  constructor(private store:Store,
              @Inject(ATLAS_SHELL_TOKEN) shellToken:string,
              private shellEntityFactory:AtlasShellEntityFactoryService,
              private registryService:AtlasShellRegistryService) {
                super(shellToken)
      
  }
  dispatch(id:string,action:Action,useID=true)
  {
       let compositeAction = this.atlasAction(id,action)
       useID?this.store.dispatch(compositeAction):this.store.dispatch(action)
  }
  setActive(id:string){
    const path:string[] = []
    
    this.store.dispatch(this.activate_e({id,path}))
  }
  
  private atlasAction(id:string,action:Action):any{
      let entityAction = {...action}
      
      entityAction.type = actionTypeToEntityActionType(action.type)
     
      let compositeAction = createCompositeAction("COMPOSE_ACTIONS_"+action.type,ATLAS_SET_ACTIVE_INSTANCE_ACTION({id}),entityAction)
      return compositeAction
  }
  createEntity(path:string[],type:string,category:string):any{
    let ent = this.shellEntityFactory.createEntity(type,category)
    
    ent.path = path
    console.log("createOrActivateChildRootEntity 3...",ent)  
    let actions = createCompositeAction("ADD_AND_ACTIVATE",this.add_e({path:path,entity:ent}),this.activate_e({id:ent.id,path:[]}))
    this.registryService.registerInstance(ent.id,this)
    console.log("ACTION:",actions)
    
    this.store.dispatch(actions)
    return ent
  }
  select(mapFn: (state: object) => any):Observable<any>{
    return this.store.select(mapFn)
  }  


}
