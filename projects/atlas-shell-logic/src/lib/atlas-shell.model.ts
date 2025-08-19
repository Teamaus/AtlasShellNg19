import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity"
import { atlas_log } from "atlas-utils"
import { AtlasShellEntity } from "./atlas-shell-entity-factory.service"
import { DListManager } from "./DLinkList"

export interface EntityTree<T extends {id:string,path:string}>{

    
    entityState:EntityState<T>,
    entities:EntityTree<T>[]
}
export function getMappedState(state:EntityState<any>,path:string[],adapter:EntityAdapter<any>){
    let retval  = {...state}
    if (path.length>0)
    {
            let [first,...rest] = path  
            retval = {...retval,
            entities:
                {...(retval.entities?retval.entities:adapter.getInitialState().entities),
                    [first]:getMappedState(retval.entities[first],rest,adapter)
                }}
    }
    return retval 
        

}
let getInstanceID=(state:any):number=>{
    let retval =  Math.floor((Math. random() * 1000000) + 1)
    if (state[retval])
         return getInstanceID(state)
     else
         return retval 
 }
 const RootState = (state:any)=>state.activeID?state.entities[state.activeID.root]:state

 export class TreeEntityAdapter{
    activePath:string[]=[]
    adapter:EntityAdapter<any> = createEntityAdapter()
    state:EntityState<any> = this.adapter.getInitialState()
    constructor(){

    }
    findEntity(state:EntityState<any>,id:string){
            console.log("FIND ENTITY STATE",state,"SEARCH FOR",id)
            let retval :any = state
            if (!state.entities){
                retval =  undefined
            } 
            else
            if (state.entities[id]){
                retval = state.entities[id]
            }
            else{
                for (var l_id of state.ids){
                    retval = this.findEntity(state.entities[l_id],id)
                    if (retval){
                        break
                    }
                }
            }
            console.log("FIND ENTITY STATE 2",retval,"SEARCH FOR",id)
            return retval 
    }

    findEntityPath(state:EntityState<any>,path:string[]){
            let retval :any = state
           // console.log("FINDENTITYPATH",state,"PATH",path)
            if (retval){
                if (path.length>0){
                    let [first,...rest] = path
                    retval = undefined
                    if (state.entities)
                        if (state.entities[first])
                            retval = this.findEntityPath(state.entities[first],rest)
                    
                }
                    


            }
            return retval 
                
                

    }
    setURL(stateURL:EntityState<any>,payload:any){
        return {...stateURL,[payload.id]:payload.url}
    }
    setObjValue(state:EntityState<any>,path:string[],objFunc:(inState:any)=>any)
    {

        let retval:any  = {...state}
         if (retval)
         {
                if (path.length == 0 ){
                        if(!retval.entities) 
                            retval = {...retval,...this.adapter.getInitialState()}
                        
                        retval = objFunc(retval)
                    }
                    else{
                        if (retval.entities)
                        {
                            let [first,...rest] = path  
                            retval = {...retval,
                            entities:
                                {...retval.entities,
                                    [first]:this.setObjValue(retval.entities[first],rest,objFunc)
                                }}
                        }
                        else{
                            retval = undefined
                        }
            }
         }

                        return retval 
    }
    addEntityChild(state:EntityState<any>,parentID:string,entity:AtlasShellEntity){
        let parentEntity = this.findEntity(state,parentID)
        return this.addEntity(state,parentEntity.path,entity)
    }
    addEntity(state:EntityState<any>,path:string[],entity:AtlasShellEntity){
             let entityPath = path 
             let f=(state:EntityState<any>,path:any)=>
             {
                    let r =this.setObjValue(state,path,(retval)=>this.adapter.addOne({...entity,path:entityPath},retval)) 
                    atlas_log(this,"ADDENTITY=>>>",r)
                    return r
             }
             
            return f(state,path)
    }
    getEntitiesByCategory(state:EntityState<any>,categoryPath:string[]):any
    {
        let obj:any = state
        if (!obj)
            return obj
        let active = obj.activeID
        let [first,...rest]=categoryPath
        if (rest.length==0){
            if (obj.active[first])
            return state.entities[first].entities
        }
        return this.getEntitiesByCategory(state.entities[first],rest)
    }
         

    
    setActive(state:EntityState<any>,path:string[],id:string){
             let entity = this.findEntity(state,id)
             console.log("ENTITY FOUND",entity,id,path)
             let f=(state:EntityState<any>,path:any)=>
             {
                if (path.length == 0 )
                {
                    return {...state,activeID:{root:id}}
                }
                return this.setObjValue(state,path,(retval)=>{return {...retval,activeID:{...retval.activeID,[entity.category]:entity.id}}})
             }
             let retval = {...f(state,entity.path) ,activeInstanceID:entity.id}
             
            return retval 
    }
    getEntity(state:EntityState<any>,path:string[]){
        let obj:any = state
        let retval:any = state
        console.log("getEntity():path,retval",path,retval)
        if (path.length>0)
        {
            let [first,...rest] = path
            retval =  this.getEntity(obj.entities[first],rest)
        }
        return retval 
    }
    getEntities2(state:EntityState<any>,activeEntity:any,entitiesCategory='')
    {
        
        let path = [...activeEntity.path]
      
        if (activeEntity.category!=entitiesCategory){
            path = [activeEntity.id,...path]    

        }
        
        
        return this.getEntities(state,path,entitiesCategory)
    }
    getEntities(state:EntityState<any>,path:string[],entitiesCategory=''):any{
        
        let filterEntities=(entities:any,category:any)=>
            Object.keys(entities).filter((key:any)=>entities[key].category==category)
            .reduce((acc:any,id)=>{return {...acc,[id]:entities[id]}},{})
        
        if (!path  ||path.length==0){
            if (state)
            {
                if (entitiesCategory=='')
                {
                   
                    return state.entities
                }
                else
                {
                   
                    return filterEntities(state.entities,entitiesCategory)
                    
                }
            
                    
            }
            else
                return state
        }
        let [first,...rest] = path
        console.log("FIRST=>>>",first)
        return this.getEntities(state.entities[first],rest,entitiesCategory)
    }
    getActivCategoryPath(state:EntityState<any>,category:string){
        let obj:any = state
        if (obj && obj.activeID){
            if (obj.activeID[category]){
                return [category]
            }
            else{
                for (let cat in obj.activeID){
                    let retval:any = this.getActivCategoryPath(obj.entities[obj.activeID[cat]],category)
                    if (retval)
                        return [cat,...retval]
                    else
                        return retval
                }
            }
        }
        else{
            return undefined
        }
    }
    getActivePath(state:EntityState<any>):any{
        let obj:any = state
        let retval = {}
        if (obj && obj.activeID) 
        {
             
            for (let category in obj.activeID){
                 let id = obj.activeID[category]
                    retval = {...retval,[id]:this.getActivePath(obj.entities[id])}
            }
           
        }
        
        return retval 

    }
    getActiveEntityByPath(state:EntityState<any>,path:string[]){
            let obj:any=state
            let retval:any = undefined 
            if (path.length==0)
            {
                if (obj.activeID!.root){
                    atlas_log(this,"PATH_LENGTH_0", obj.entities[obj.activeID.root])
                    return obj.entities[obj.activeID.root]
                }
                return obj
            }
            
            if (obj && obj.activeID){
                
                let [first,...rest] = path
                atlas_log(this,"FIRST=>",first)
                if (obj.activeID[first]){
                    retval= this.getActiveEntityByPath(obj.entities[obj.activeID[first]],rest)
                }
               

            }
            
            return retval
            
    }
    getActiveEntity(state:EntityState<any>,outlet:string){
        let obj:any = state 
        let retval:any = {}
        if (obj && obj.activeID){
            for (let category in obj.activeID){
                console.log("getActiveEntity()",category,outlet)
                if (category==outlet){
                        
                        retval = obj.entities[obj.activeID[category]]
                        console.log("FOUND=>>>",retval)
                    break;
                }
                else{
                  
                    retval = this.getActiveEntity(obj.entities[obj.activeID[category]],outlet)
                }
            }
            
        
        }
     
        return retval 
        
    }
    findEntityByCategory(state:EntityState<any>,category:string):any{
        let obj:any = state
        let retval = undefined
        
        if (!obj)
            return retval
        if (obj.entities)
            for (let entityID of Object.keys(obj.entities)){
               
                if (obj.entities[entityID].category==category)
                {
                    retval = obj.entities[entityID]
                    break
                }
                else{
                    retval = this.findEntityByCategory(obj.entities[entityID],category)
                }
            }
        
        return retval

    
        
    }
    findEntityByIDAndCategory(state:EntityState<any>,id:string,category:string):any{
        let f = (objState:any,id:string):any=>{
                let retval = undefined
                if (objState.entities){
                    for (let entityID of Object.keys(ent.entities)){
                        if (entityID==id){
                            retval = objState.entities[id]
                            break
                        }
                        else{
                            retval = f(objState[entityID],id)
                        }
                    }
                }
                return retval 
        }
        let ent = this.findEntityByCategory(state,category)
        
        if (ent){
            if (ent.id == id)
                return ent 
            else
            {
                return f(ent,id)
            }
        } 
        
    }
    findActiveEntity(state:EntityState<any>,id:string):any{
        let obj:any = state
        let retval = undefined
        if (!obj.activeID)
            retval = ""
        else{
            for (let category in obj.activeID){
                if (obj.activeID[category]==id){
                    //We found it 
                    retval = obj.entities[id]
                    break
                }
                else{
                
                    retval = this.findActiveEntity(obj.entities[obj.activeID[category]],id)    
                } 
            }
        }
       

        return retval

    }
    getActiveEntityInstanceID(state:EntityState<any>,id:string):string{
       return this.findActiveEntity(state,id).instanceID

    }
    getEntityByInstance(state:EntityState<any>,instanceID:number):any{
           let retval = undefined
           atlas_log(this,"ENTITY BY INSTANCE ID_PRE:",state.ids)
           for (let id of state.ids){
                atlas_log(this,"ENTITY BY INSTANCE ID:",id)
                if (state.entities[id].instanceID == instanceID){
                    return state.entities[id]        
                }
                let retval = this.getEntityByInstance(state.entities[id],instanceID)
                if (retval)
                    return retval 

           }
           return retval 
    }
    getActiveID(state:EntityState<any>,level:number,category:string):any{
        let obj:any = state
        let retval = undefined
        if (level == 0 && obj &&obj.activeID ){
                    console.log("FOUND=>>>",category)   
                    retval = {[category]:obj.activeID[category]}
        }
        else
        if (obj && obj.activeID)
        {
            
            for (let cat in obj.activeID)
            {
                retval = this.getActiveID(obj.entities[obj.activeID[cat]],level-1,category)
            }
        }
        return retval 

    }
    
    addSnapShot(state:EntityState<any>,path:string[],snapShot:any){
        let f=(state:EntityState<any>,path:any)=>
            this.setObjValue(state,path,
            (inState)=>{return {...inState,snapShot:snapShot}})
        return f(state,path) 
    }
    removeSnapShot(state:EntityState<any>,path:string[]){
        let f=(state:EntityState<any>,path:any)=>this.setObjValue(state,path,(inState)=>{let {snapShot,...retval}=inState;return retval})     
        return f(state,path)
    }
    getPath(state:EntityState<any>,entity:any,parentID:string):string[]{
        if (state.entities[parentID]){
            for (let ent of state.entities[parentID].entities){
                if (ent.id==entity.id && entity.category==ent.category){
                    return [parentID]
                }
                else{
                    return [parentID,...this.getPath(state.entities[parentID],entity,ent.id)]
                }
            }
        }
        
        return []
        
    }




    

}

export class ShellEventAdapter{
    //payload example {id:10000002,event:"NAVIGATE",value:"CO1"}ֿ
    values = new DListManager()
    setFunc = (payload:any)=>this.values.Set({value:payload.value,next:undefined,prev:undefined})
    func:any = {"SET":(payload:any)=>this.setFunc(payload),
    "SET_REUSE":(payload:any)=>this.setFunc(payload),
    "CLOSE":(payload:any)=>this.setFunc(payload),
    "BACK":(payload:any)=>this.values.Back(),
    "FORWARD":(payload:any)=>this.values.Forward()}

    getState(state:any,payload:any){
        let retval = {...state}
        if (!retval.events){
           
            retval = {...retval,events:{}}
         
        }
        if (!retval.events[payload.id]){
           
            retval.events = {...retval.events,[payload.id]:{}}
        }
        if (!retval.events[payload.id][payload.event]){
            retval.events[payload.id][payload.event] ={"Subject":{"SET":0,"FORWARD":0,"BACK":0,"CLOSE":0,"SET-REUSE":0}}
        }
        return retval 

    }
    raiseEvent(state:any,payload:any){
        let retval = this.getState(state,payload)
        let obj = retval.events[payload.id][payload.event]
      
        
        let eventObj = {"Subject":{...obj.Subject,[payload.eventSubject]:obj.Subject[payload.eventSubject]+1},"Value":this.func[payload.eventSubject](payload)}
        retval = {...retval,"events":{...retval.events,[payload.id]:{...retval.events[payload.id],[payload.event]:eventObj}}}
        
        return retval
    }
    
}
