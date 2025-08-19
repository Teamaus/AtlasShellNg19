import { Action, ActionReducer, ActionReducerMap, createAction, createFeatureSelector, createReducer, createSelector, MetaReducer, on, props } from "@ngrx/store";
import { ShellEventAdapter, TreeEntityAdapter } from "./atlas-shell.model";
import { CompositeAction, isCompositeAction } from "./atlas-shelll.compositeActions";
import { atlas_log } from "atlas-utils";
import { actionToPlainActionType, isAtlasEntityAction } from "./atlas-shell.actions";




export const treeEntityAdapter = new TreeEntityAdapter()
const shellEventAdapter = new ShellEventAdapter()
export const TREE_ADDENTITYCHILD = (slice:string)=>createAction(slice+"_TREE_ADDENTITYCHILD",props<any>())
export const TREE_ADDENTITY = (slice:string)=>createAction(slice+"_TREE_ADDENTITY",props<any>())
export const TREE_SETACTIVE = (slice:string)=>createAction(slice+"_TREESETACTIVE",props<any>())
export const TREE_NOACTION = (slice:string)=>createAction(slice+"_NOACTION")
export const ADD_SNAPSHOT= (slice:string)=>createAction(slice+"_ADD_SNAPSHOT",props<any>())
export const REMOVE_SNAPSHOT = (slice:string)=>createAction("REMOVE_SNAPSHOT",props<any>())
export const RAISE_EVENT = (slice:string)=>createAction(slice+"_RAISE_EVENT",props<any>())
export const UNRAISE_EVENT = (slice:string)=>createAction(slice+"_UNRAISE_EVENT",props<any>())


export const entityTreeReducer =(slice:string)=> createReducer(
    {...treeEntityAdapter.adapter.getInitialState(),activeID:{root:0},entities:{0:{id:"0",category:"root",path:[]}}},
    on(TREE_ADDENTITY(slice),(state,payload)=>{
                                         let retval = treeEntityAdapter.addEntity(state,payload.path,payload.entity)
                                         atlas_log(this,"REDUCER ADD ENTITY",retval,payload)
                                         return retval 
    }),
    on(TREE_ADDENTITYCHILD(slice),(state,payload:any)=>treeEntityAdapter.addEntityChild(state,payload.parentID,payload.entity)),
    on(TREE_SETACTIVE(slice),(state,payload)=>{console.log("SET ACTIVE PAYLOAD",payload); return treeEntityAdapter.setActive(state,payload.path,payload.id)}),
    on(TREE_NOACTION(slice),(state)=>{return {...state}}),
    on(ADD_SNAPSHOT(slice),(state,payload:any)=>treeEntityAdapter.addSnapShot(state,payload.path,payload.snapshot)),
    on(REMOVE_SNAPSHOT(slice),(state,payload:any)=>treeEntityAdapter.removeSnapShot(state,payload.path)),
    on(RAISE_EVENT(slice),(state,payload)=>shellEventAdapter.raiseEvent(state,payload)),
    
 
    
     
 )
 
 export const  metaReducer = (reducer:ActionReducer<any>)=>{
    
    return (state:any,action:any)=>{
        console.log(reducer.prototype)        
      if (state)
      {
        

        let retval = reducer({},action)
    
        
        return retval 
         
        
      } 
      else
      {
        
        return reducer(state,action)
      }
  }
}
export const  compositeActionMetaReducer = (reducer:ActionReducer<any>)=>{
    return (state:any,action:any)=>{
      
      
      if (!isCompositeAction(action))
      {
         
          return reducer(state,action)
      }
      else
      {
       
       
        
        let retval =  (action as CompositeAction).actions.reduce((acc,action)=>reducer(acc,action),state)
        /*let retval = state
        for (let act of (action as CompositeAction).actions)
          {
              console.log("ACTION=>>",act)
              retval = reducer(retval,act)
          }*/
          return retval 
    }
  }
}
export const  metaReducers:MetaReducer[] = [compositeActionMetaReducer]


export const entityTreePathSelector = (slice:string,id:string,path:string[])=>
        createSelector(
            createFeatureSelector(slice),
            (state:any)=>treeEntityAdapter.findEntityPath(state,[...path,id])
        )
        

export const entityTreeIDSelector = (slice:string,id:string)=>createSelector(
     createFeatureSelector(slice),
    (state:any)=>id?treeEntityAdapter.findEntity(state,id):state
    )
export const entityTreeActivePathSelector= (slice:string)=>
createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getActivePath(state)
)
export const entityTreeActiveIDLevelSelector= (slice:string,level:number,category:string)=>
createSelector(
    createFeatureSelector(slice),
   
    (state:any)=>treeEntityAdapter.getActiveID(state,level,category)
)

export const entityTreeActiveSnapShotSelector=(slice:string,outlet:string)=>
createSelector(
    createFeatureSelector(slice),
    
    (state:any)=>treeEntityAdapter.getActiveEntity(state,outlet).snapShot
)

export const entitiesTreeSelector = (slice:string,path:string[],entitiesCategory='')=>createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getEntities(state,path,entitiesCategory)
)

export const entitiesByActiveCategorySelector = (slice:string,category:string)=>createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getActiveEntity(state,category)
)

export const pathByActiveCategorySelector = (slice:string,category:string)=>createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getActivCategoryPath(state,category)
)


export const entitiesByActiveCategoryPathSelector = (slice:string,categoryPath:string[])=>createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getActiveEntityByPath(state,categoryPath)
)
export const activeEntityInstanceIDSelector=(slice:string,entityID:string)=>
createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getActiveEntityInstanceID(state,entityID)
)
export const entitySelector=(slice:string,entityID:string,category:string)=>
createSelector(
  createFeatureSelector(slice),
  (state:any)=>treeEntityAdapter.findEntityByIDAndCategory(state,entityID,category)
)
export const findActiveEntitySelector = (slice:string,entityID:string)=>
createSelector(
  createFeatureSelector(slice),
  (state:any)=>treeEntityAdapter.findEntity(state,entityID)
)

export const entityByInstanceIDSelector=(slice:string,instanceID:number)=>createSelector(
  createFeatureSelector(slice),
  (state:any)=>treeEntityAdapter.getEntityByInstance(state,instanceID)
)
export const ATLAS_CREATE_INSTANCE_ACTION = createAction("ATLAS_CREATE_INSTANCE_ACTION",props<any>())
export const ATLAS_SET_ACTIVE_INSTANCE_ACTION = createAction("ATLAS_SET_ACTIVE_INSTANCE_ACTION",props<any>())
const instanceIDReducer = (singleInitalState:any)=>createReducer(
  {},
  on(ATLAS_CREATE_INSTANCE_ACTION,(state,payload)=>{return {...state,activeInstanceID:payload.instanceID,[payload.instanceID]:singleInitalState}}),
  on(ATLAS_SET_ACTIVE_INSTANCE_ACTION,(state,payload)=>{return {...state,activeInstanceID:payload.id}})

)
export const composeReducers=(...reducers:any[])=>
{
    return (state:any,action:any)=>{
        return reducers.reduce((currentState,reducer)=>reducer(currentState,action),state)
    }
}
export function shellRedcersMapAdapter<T>(featureKey:string,mapReducers:ActionReducerMap<T>)
{
  let retval = {}
  for(let p in mapReducers){
    retval = {...retval,[p]:ShellReducerAdapter(mapReducers[p],featureKey+"."+p)}
  }   
  return retval 
}
function getObjValue(state:any,feature:string){
    const objValue:any=(state:any,features:string[])=>{
        if (features.length==0){
           return state
        }
        let [first,...rest] = features
        return objValue(state[first],rest)
    }
    let features = feature.split(".")
    return objValue(state,features)

}
function getFeatureObj(feature:string,value:any=undefined){
    
    const getObj:any = (retval:any,features:string[],value:any)=>
    {
        if (features.length==0){
          return value
        }
        let [first,...rest] = features
        return {...retval,[first]:getObj(retval,rest,value)}
    }
    return getObj({},feature.split("."),value)

}
export function ShellReducerAdapter<T extends Action>(
  reducer: ActionReducer<any, T>
,shellEntityFeature:string ): ActionReducer<any, T> {
  // Generate a unique instance ID for this store instance
  let init = false
  let initialState = {}
  
  // Return a new reducer function that wraps the original reducer
  return function(state: any, action: T) {
    // Add the instance ID to the action
    
   
   
   if (action.type == ATLAS_SET_ACTIVE_INSTANCE_ACTION.type)
    {
       
       return instanceIDReducer(initialState)(state,action)
    }
    
    

    if (action.type=="@ngrx/store/init")
    {
       
            
             return {}

           
           
           
    }
    if (action.type=="@ngrx/store/update-reducers"){
      if (!init){   
       
        initialState = reducer(state,action)
       
        init = true
        return {"@shell_entity_initialState":getFeatureObj(shellEntityFeature,initialState)}
      }
     
      
    }
    if (isAtlasEntityAction(action.type)){
          let plainAction = {...action}
       
          plainAction.type = actionToPlainActionType(action).type
          let instanceID = state.activeInstanceID
          
          let internalState = undefined
          if (!state[instanceID])
          {
       
              internalState = initialState
              state  = {...state,[instanceID]:getFeatureObj(shellEntityFeature,initialState)}
               
             
          }
          else{
            internalState=getObjValue(state[instanceID],shellEntityFeature)
          }
       
          let retval =  reducer(internalState, plainAction)
          
          if (retval==internalState){
            //We didnt handle the state so we return the state as is 
            return state
          }
       
          return {...state,[instanceID]:getFeatureObj(shellEntityFeature,retval)};
    }
    else{
      let retval = reducer(state,action)
      
      return retval
    }
    }
}









    




