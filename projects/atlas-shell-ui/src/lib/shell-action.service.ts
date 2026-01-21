import { Inject, Injectable, Optional, signal, Type } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AtlasShellRegistryService, actionToPlainActionType, actionTypeToEntityActionType, createCompositeAction, isAtlasEntityAction } from 'atlas-shell-logic';

import { filter, map } from 'rxjs/operators';
import { AtlasEvent, AtlasShellEventsService } from './atlas-shell-events.service';
import { Observable, of } from 'rxjs';
import {tap} from 'rxjs/operators'
import { AtlasShellErrorService } from './atlas-shell-error.service';
import { ActivatedRoute, RouteReuseStrategy } from '@angular/router';
import { AtlasShellReuseStrategy } from './atlas-reuse-strategy';
import { WfRegistryService } from './wf-registry.service';
import { AtlasNavV19Service } from './atlas-nav-v19.service';




export interface Events{
  raiseEvent(event:AtlasEvent):any
}
@Injectable({
  providedIn: 'root'
})
export class ShellActionService implements Events {
  currentAction:any
  static count = 0 
  sasid = 0
  constructor(private _actions$:Actions,private shellEventsService:AtlasShellEventsService,private errService:AtlasShellErrorService
    ,private registryService:AtlasShellRegistryService
    ,private wfRegistry:WfRegistryService
    ,private navService:AtlasNavV19Service
  ,@Optional()@Inject(RouteReuseStrategy) private routeReuseStrategy:AtlasShellReuseStrategy) {
     this.sasid = ++ShellActionService.count
    console.log("SASID:",this.sasid)
   
   }
  raiseEvent(event: AtlasEvent) {
    this.shellEventsService.RaiseEvent(this.currentAction,event)
  }
  NavigationClose(value:any,relativeTo?:ActivatedRoute)
  {
    
    if (relativeTo)  
      this.navService.Close_(value,"",relativeTo)
    else
      this.navService.Close(value,"")
    /*console.log("RELATIVE TO:",relativeTo)
    
    const __value = {value:[value],reuse:false,close:true}
    console.log("CLOSE NAVIGATE_",value,__value)
    this.raiseEvent({event:"NAVIGATE",value:__value,"eventSubject":"SET"})*/
  }
  navSignal = signal<{op:string,activeRoute?:ActivatedRoute}|null>(null)
  Navigate_(value:any,reuse:boolean, relativeTo?:ActivatedRoute){
    console.warn("OP:>>>",value,"REL TO:",relativeTo)
    this.navSignal.set({op:value,activeRoute:relativeTo})
    
  }
  Navigate(value:any,relativeTo?:ActivatedRoute){
    this.Navigate_([value],false,relativeTo)
  }
  NavigateReuse(value:any,relativeTo?:ActivatedRoute){
    console.warn("OP:>>>",value,"REL TO:",relativeTo)
    this.Navigate_(value,true,relativeTo)
    //this.navService.Nav_(value,"", relativeTo)
  }
  back(){
    this.raiseEvent({event:"NAVIGATE",value:"","eventSubject":"BACK"})
  }
  NavigateModal(value:any){
    this.raiseEvent({event:"NAVIGATE_MODAL","value":value,"eventSubject":"SET"})
  }
  actions$(...allowedActions:any[]){
      return this._actions$.pipe(
        this.ofType(...allowedActions),
        this.mapActionParameters()
      )
  }
  ofType(...allowedActions:any[]):any
  {
       
      return filter((action:any)=>{
        let retval = false 

        console.log("ENTER TO IN FILTER",action.type,action," Current:===>>",this.currentAction)
        if (action.actions)
        {
          if (isAtlasEntityAction(action.actions[1].type))
          {
           
              this.currentAction = action
              
              console.log("SASID:",this.currentAction,this.sasid)
           
              let arr = allowedActions.map((act:any)=>act.type)
           
              retval = arr.includes(actionToPlainActionType(action.actions[1]).type)

           
          }
        }
        return retval
      })
  }
  
  mapActionParameters(){
    return map((action:any)=>action.actions[1])
  }
  doActions_wf(data:any,...actions:Action[]){
    if (data){
      if (data["workflow"])
      {
        this.wfRegistry.run(this.getActiveInstanceID(),data["workflow"])
      }
    }
    return this.doActions(...actions)
  }
  doActions(
    
    ...actions:Action[]
  )
  {
  
    //Here We should run workflow 
     //let atlasActions = [this.currentAction.actions[0],...actions.map(action=>{return {...action,type:actionTypeToEntityActionType(action.type)}})]
      //let atlasActions = actions.map(action=>createCompositeAction(this.currentAction))
     // let retval =  createCompositeAction("COMPOSITE_ACTION",...atlasActions)
     
     let atlasActions = actions.map(action=>{return {...action,type:actionTypeToEntityActionType(action.type)}})
     
     let retval = atlasActions.map(action=>createCompositeAction("COMPOSITE_ACTIONS_"+action.type,this.currentAction.actions[0],action))
      //console.log("ATLAS ACTIONS==>",atlasActions)
      
      return retval
  }
  executeService(obs:Observable<any>):Observable<any>{
    return obs.pipe(
      tap(response=>
        {
          this.errService.clearError(this.currentAction.actions[0].id)
          if (response.err){
              this.errService.raiseError(this.currentAction.actions[0].id,response.err)
          
            

          
              
      }})
    )
    
  }
  getActiveInstanceID(){
    let retvalID = "0"
    if (this.currentAction)
    {
      console.log("shell-action-service:",this.currentAction)
      retvalID = this.currentAction.actions[0].id

    }
    return retvalID
  }
  getRegisteredService<T>(serviceType:Type<T>){
    return this.registryService.getInstance(this.getActiveInstanceID(),serviceType)
  }
  runWf(wfName:string){
    this.wfRegistry.run(this.getActiveInstanceID(),wfName)
  }
  

}
