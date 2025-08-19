import { Component, Inject, Injectable, Injector, Optional } from '@angular/core';
import { ActivatedRoute, EventType, NavigationEnd, RouteReuseStrategy, Router } from '@angular/router';
import { Action, Store, createSelector } from '@ngrx/store';
import { ATLAS_SET_ACTIVE_INSTANCE_ACTION, ATLAS_SHELL_ENTITY_FEATURE_TOKEN, ATLAS_SHELL_TOKEN, AtlasShellEntity, AtlasShellEntityFactoryService, AtlasShellRegistryService, AtlasShellSelectorService, TREE_ADDENTITY, TREE_SETACTIVE, actionToPlainActionType, actionTypeToEntityActionType, createCompositeAction } from 'atlas-shell-logic';
import { AtlasShellRoutingService } from './atlas-shell-routing.service';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { AtlasShellModalEntityService } from './atlas-shell-modal-entity.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Location } from '@angular/common';
import { IShellEntity } from 'atlas-shell-logic';
import { ShellActionService } from './shell-action.service';
import { AtlasShellReuseStrategy } from './atlas-reuse-strategy';
import { AtlasNavigationEndService } from './atlas-navigation-end.service';


export function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')   // החלף + ב־-
    .replace(/\//g, '_')   // החלף / ב־_
    .replace(/=+$/, '');   // הסר = בסוף
}

export function base64UrlDecode(str: string): string {
  // החזר את התווים ל-Base64 רגיל
  let base64 = str
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  // הוסף חזרה את ה־= שחסרים
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return atob(base64);
}



export const rootCategory=(id:string)=>"root_"+id
export let es_counter = 0 
function getCounter(){
  const retval = ++es_counter
  console.log("ES_COUNTER:",retval)
  return retval
}
@Injectable()
export class AtlasShellEntityService implements IShellEntity {
  component?:any
  get add_e(){ return  TREE_ADDENTITY(this.shellToken)}
  get activate_e(){return  TREE_SETACTIVE(this.shellToken)}
  childEntities:any
  entity:any 
  entitiesIDS : any
  childEntities$:any
  navURL:string = ""
  navModalURL:string ="XXXXX"
  instanceID = getCounter()
  constructor(
    private store:Store<any>,
    private router:Router,private activatedRoute:ActivatedRoute
    ,private shellEntityFactory:AtlasShellEntityFactoryService,
    private shellSelector:AtlasShellSelectorService,
    private registryService:AtlasShellRegistryService,
    @Inject(ATLAS_SHELL_TOKEN)private shellToken:string,
    @Inject(ATLAS_SHELL_ENTITY_FEATURE_TOKEN)private  featureToken:string,
    private atlasShellAction:ShellActionService,
    private atlasShellRoutingService:AtlasShellRoutingService,
    private modelService:AtlasShellModalEntityService,
    private injector:Injector,
    private location:Location,
    private atlasNavigationEnd:AtlasNavigationEndService,
    @Optional() @Inject(RouteReuseStrategy) private routeReuseStrategy:AtlasShellReuseStrategy) 
    { 
      this.atlasNavigationEnd.navigationEnd.pipe(filter(param=>!this.entity)).subscribe(
        param=>{
          console.log("Yup we are here 3",param)
          if (this.routeReuseStrategy){
            this.routeReuseStrategy.navMode="URL"
          }
          if (!this.entity){
                console.log("Init Service...",param)
                this.initService(param)
                return 
            }
        }
        
      )
          
      //this.setNavModal("CTOR","YYYZZZ")
        
        
        

  }
  initService(param:any){
    
    let entityParam =base64UrlDecode(param)
      console.log("createOrActivateChildRootEntity 5",param)
    if (entityParam!="")
    {
    
      this.entity = JSON.parse(entityParam)
        console.log("createOrActivateChildRootEntity 5.1",this.entity)
      this.entitySubject.next(this.entity)
    
    }
    
    this.initSelectors()

  }
  setEntity(id:string){
    this.store.select(this.shellSelector.entityTreeIDSelector(id))
    .pipe(take(1))
    .subscribe(
      entity=>{
        
        this.entity=entity
        this.initSelectors()
      }
    )
  }
  setNavModal(caller:string, v:string){
    this.navModalURL = v 

  }

  navCountObj :any = {BACK:0,SET:0} 
  closeRoute_(v:any){
    
    this.routeReuseStrategy.setSavedValue(v.value,false)
    
  }
  
  navigate(value:any,extras?:any|undefined){
  
    this.navigate_(value,true,extras)
  }
  navigateSave(value:any,extras?:any|undefined){
  
    this.navigate_(value,true,extras)
  }
  navigate_(value:any,save:boolean,extras?:any|undefined){
    let routedValue = value
    console.log("entityIDSelectorSubscribe",value,save,extras)
    
    
    if (this.routeReuseStrategy)
    {
      let pathState = ((this.routeReuseStrategy) as any).pathState
      
      this.routeReuseStrategy.setSavedValue(value,save)    
      routedValue = pathState.get(this.routeReuseStrategy.getKey(value))?pathState.get(this.routeReuseStrategy.getKey(value)):value
      if (this.routeReuseStrategy.navMode=="URL")
        this.routeReuseStrategy.entityType = this.entity.type

      

    }
 
      
    console.log("ASE>>>",routedValue,value)
    if (routedValue==value)
    {
        console.log("entityIDSelectorSubscribe",routedValue==value)
        this.router.navigate(routedValue,extras)
    }
    else
    {
        this.router.navigateByUrl(routedValue,extras)
    }
        
      
    

  }
  getEventObservable(event:string,eventSubject:string):Observable<any>{
        let eventSubjectSelector =  this.shellSelector.eventSubjectSelector(this.entity.id,event,eventSubject)
        let eventValueSelector = this.shellSelector.eventValueSelector(this.entity.id,event)
        let value$ = this.store.select(eventValueSelector).pipe(filter(v=>v!=undefined))
        let subject$ = this.store.select(eventSubjectSelector).pipe(
          filter(v=>v!=undefined && v[eventSubject]!=this.navCountObj[eventSubject]))
        let retval$ = subject$.pipe(
          tap(v=>this.navCountObj[eventSubject]=v[eventSubject]),
          switchMap(s=>value$.pipe(take(1),map(v=>{return {...v,id:s.id}})))
        )
        return retval$
      
  }
  navigateFunc(v:any,eventSubject:string){
    const ar = this.routeReuseStrategy?this.routeReuseStrategy.currentShellActionActivatedRoute?this.routeReuseStrategy.currentShellActionActivatedRoute:this.activatedRoute:this.activatedRoute
    
    this.navigate_(v.value.value,v.value.reuse,{relativeTo:ar})
  }
  initSelectors(){
        let entitySelector = this.shellSelector.rootSelector() ///Take the root 
        if (this.entity){
          entitySelector = this.shellEntityFactory.createEntitySelector(this.entity)
        }
        

          let entitiesIDSSelector = this.shellEntityFactory.getEntitiesIDSSelctor(entitySelector)
          
          this.entitiesIDS = this.store.select(entitiesIDSSelector)
          let entitiesSelector = createSelector(
            entitySelector,
            (entity:any)=>entity.entities
          )
          this.childEntities$ = this.store.select(entitiesSelector)
          .pipe(filter(entities=>entities))
          .pipe(map(entities=>Object.keys(entities).filter(key=>key!="0").map(key=>entities[key])))
          this.store.select(entitiesIDSSelector).subscribe(entities=>this.childEntities = entities)
          this.store.select(entitySelector).subscribe((entity:any)=>this.childEntities = entity.entities)
          if (this.entity)
          {
              this.getEventObservable("NAVIGATE","SET")
              .subscribe(
                    (v:any)=>{

                            if (v.value.close)
                            {
                               
                                this.closeRoute_(v.value)
                            }
                            else

                            {
                               
                                this.navigateFunc(v,"SET")
                            }
                        }


              )
              this.getEventObservable("NAVIGATE","BACK")
              .subscribe(
                v=>{
                      this.location.back()    
                    }
              )
              this.getEventObservable("NAVIGATE_MODAL","SET")
              .subscribe(                  
                v=>{
                  this.modelService.navigateModal(this.entity.id,v.value,v.value,this.injector)
                })
             
             


                
            }
        
  }

  NavEntity(entity:AtlasShellEntity){
    if (entity.category!=''){
      let param = base64UrlEncode(JSON.stringify(entity))
      
      if (this.routeReuseStrategy)
        this.routeReuseStrategy.setEntityType(entity.type)
     console.log("entityIDSelectorSubscribe",entity,param)
     this.navigateSave([{outlets:{[entity.category]:[entity.type,param]}}], {relativeTo:this.activatedRoute})
    }
  }
  private getID = ()=> this.entity?this.entity.id:this.atlasShellAction.getActiveInstanceID()
  entitySubject = new BehaviorSubject<any>(undefined);
  entity$ = ()=>this.entitySubject.pipe(
    filter(e=>e!=undefined),
    take(1))
  atlasAction(action:Action):any{
    let entityAction = {...action}
    
    entityAction.type = actionTypeToEntityActionType(action.type)
    let id = this.getID()
    let compositeAction = createCompositeAction("COMPOSE_ACTIONS_"+action.type,ATLAS_SET_ACTIVE_INSTANCE_ACTION({id:id}),entityAction)
    return compositeAction
  }
  dispatch(action:Action,useID=true){
    //this.atlasShellAction.currentAction = action
    
    let compositeAction = this.atlasAction(action)
    useID?this.store.dispatch(compositeAction):this.store.dispatch(action)
    
  }
  createChildEntity(type:string,category:string){
    if (this.entity)
       this.createEntity([...this.entity.path,this.entity.id],type,category)
  }
  
  createOrActivateChildAntity(type:string,category:string){
 
      let ids = this.childEntities?Object.keys(this.childEntities).filter(k=>this.childEntities[k].type==type):[]

      if (ids.length==0 ){
          this.createChildEntity(type,category)
      }
      else{
        this.entityIDSelectorSubscribe(ids[0],true)
        this.store.dispatch(this.activate_e(this.childEntities[ids[0]]))
      }
  }
  rootEntities$(){
      
      let obs$  = this.store.select(this.shellSelector.rootSelector())
      .pipe(map((root:any)=>root.entities))
      .pipe(map((entities:any)=>entities?Object.keys(entities).map(key=>entities[key]):entities)

      
      )
      return obs$
  }
  
  entityIDSelectorSubscribe(id:string,isChild=true){
    
    return this.store.select(this.shellSelector.entityTreeIDSelector(id))
    .pipe(
      filter(e=>(e!=undefined)),
      take(1)
    )
    .subscribe(
          
          entity=>{
              console.log("entityIDSelectorSubscribe",entity)
              if (entity){
              if (isChild) this.NavEntity(entity)
              }
          }
    )
    
  }
  createEntity(path:string[],type:string,category:string){
    let ent = this.shellEntityFactory.createEntity(type,category)
      console.log("createOrActivateChildRootEntity 3",ent)
      this.entityIDSelectorSubscribe(ent.id,true)
      
      let actions = createCompositeAction("ADD_AND_ACTIVATE",this.add_e({path:path,entity:ent}),this.activate_e({id:ent.id,path:[]}))
      this.registryService.registerInstance(ent.id,this)
      this.store.dispatch(actions)
  }
  isRoot(entity:any){
    return entity.category == 'root'
  }

  createRootEntity(type:string){
      let ent = this.shellEntityFactory.createEntity(type,"root")
      ent.id = base64UrlEncode(type)
    
      this.entityIDSelectorSubscribe(ent.id,false)
      let actions = createCompositeAction("ADD_AND_ACTIVATE",this.add_e({path:[],entity:ent}),this.activate_e({id:ent.id,path:[]}))
      this.store.dispatch(actions)
      let entry = this.atlasShellRoutingService.rootOutlet(ent.id)
      this.atlasShellRoutingService.AddEntry(entry)
  
    
    
    
    

  }
  createChildRootEntity(type:string,root_id:string){
      this.createEntity([root_id],type,rootCategory(root_id))
  }
  createOrActivateChildRootEntity(type:string){
      this.store.select(this.shellSelector.rootSelector())
      .pipe(take(1))
      .subscribe(
        (state:any)=>{
          console.log("createOrActivateChildRootEntity",state)
          let entityID = state.activeID[Object.keys(state.activeID)[0]]
          let entity = state.entities[entityID]
          if (entity){
            let ids = entity.entities?Object.keys(entity.entities).filter(k=>entity.entities[k].type==type):[] 
            if (ids.length==0){
              console.log("createOrActivateChildRootEntity 1",state)
              this.createChildRootEntity(type,entity.id)
            }
            else{
               console.log("createOrActivateChildRootEntity 2",entity.id)
              this.store.dispatch(this.activate_e({id:ids[0],path:[entity.id]}))
            //  this.router.navigate([{outlets:{[rootCategory(entity.id)]:[type,btoa(JSON.stringify(entity.entities[ids[0]]))]}}])
            this.routeReuseStrategy.setEntityType(type)
            this.navigateSave([{outlets:{[rootCategory(entity.id)]:[type,base64UrlEncode(JSON.stringify(entity.entities[ids[0]]))]}}],{relativeTo:this.activatedRoute})

            }
          }

        }
      )


  }
  shellEntityFeatureSelector(selector:any,featureToken:string,keyMap:string = ""){
    console.log("shellEntityFeatureSelector",this.instanceID)
    if (keyMap=="")
    return (state:any)=>state[featureToken]![this.entity.id]?selector(state[featureToken]![this.entity.id]):selector(state[this.featureToken]["@shell_entity_initialState"])
  
  return (state:any)=>state[featureToken][keyMap]![this.entity.id]?selector(state[featureToken][keyMap]![this.entity.id]):selector(state[this.featureToken][keyMap]["@shell_entity_initialState"])
 
  }
  shellEntitySelector(selector:any,keyMap:string = ""){
      
     return this.shellEntityFeatureSelector(selector,this.featureToken,keyMap)
     
  }
  shellEntitySelect(selector:any,keyMap:string=""){
    let atSelector = this.shellEntitySelector(selector,keyMap)
    
    return this.entity$().pipe(
      filter(e=>e!=undefined),
      switchMap(entity=>this.store.select(atSelector))
    )
  }


  


}
