import { ActionCreator, ActionCreatorProps, createAction, props } from "@ngrx/store";
import { NotAllowedCheck } from "@ngrx/store";
import { EMPTY } from "rxjs";
export const atlasEntityAction = "@AtlasEntity"
export const atlasShellAction  = "@AtlasShell"
export function atlasCreateEntityAction<T extends string>(type: T, actionProps: any):any {
    return  createAction(
       atlasEntityAction+ "/"+type,
      props<typeof actionProps>()
    )
  }
  
export const isAtlasEntityAction = (actionType:string)=>actionType.startsWith(atlasEntityAction)
export const isAtlasShellAction = (actionType:string)=>actionType.startsWith(atlasShellAction)
export const actionToPlainActionType = (action:any)=>{console.log("actionToPlainActionType",action);return {...action,type:action.type.replace(atlasEntityAction+ "/","")}}
export const actionTypeToEntityActionType = (actionType:string)=> atlasEntityAction+ "/"+actionType
export const AtlasShell_EntityAction_Names={
    ADD_ENTITY:"ADD_ENTITY",
    ACTIVATE_ENTITY:"ACTIVATE_ENTITY"
}
export interface AtlasShell_EntityActions{
    ADD_ENTITY:ActionCreator<string,any>,
    ACTIVATE_ENTITY:ActionCreator<string,any>

    
}
export interface AtlasShell_SnapshotActions{
    ADD_SNAPSHOT:ActionCreator<any>,
    REMOVE_SNAPSHOT:ActionCreator<any>
}

export const AtlasShell_createActions =<T>(obj:{
    source:string,
    events:{[key:string]:ActionCreatorProps<any>}
})=>{
        let retval = Object.keys(obj.events)
        .reduce((acc:any,key:string)=>
        {return {...acc,[key]:createAction(key+"_"+obj.source,props<any>())}},createAction("EMPTY"))
       
        return retval as T

    }
export const AtlasShell_createEntityAction = (source:string)=>
AtlasShell_createActions
({source:source,
 events:{ADD_ENTITY:props<any>(),
        ACTIVATE_ENTITY:props<any>()}
}) as AtlasShell_EntityActions

 

export const AtlasShell_createShellSnapshot = (source:string)=>AtlasShell_createActions
({source:source,
 events:{ADD_SNAPSHOT:props<any>(),
        REMOVE_SNAPSHOT:props<any>()}
}) as AtlasShell_SnapshotActions




