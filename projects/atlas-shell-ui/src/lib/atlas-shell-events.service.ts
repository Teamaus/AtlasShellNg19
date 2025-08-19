import { Inject, Injectable } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { ATLAS_SET_ACTIVE_INSTANCE_ACTION, ATLAS_SHELL_TOKEN, AtlasShellSelectorService, CompositeAction, RAISE_EVENT,UNRAISE_EVENT } from 'atlas-shell-logic';


export interface AtlasEvent{
  event:string,//NAVIGATE
  eventSubject:string,//SET,BACK,FORWARD 
  value:any //Linked List 
}
@Injectable({
  providedIn: 'root'
})
export class AtlasShellEventsService {

  constructor(private store:Store<any>,@Inject(ATLAS_SHELL_TOKEN) private shellToken:string,private shellSelectors:AtlasShellSelectorService) { }
  
    
  createEvent(eventName:string,eventSubject:string,eventValue:any):AtlasEvent{
      return {"event":eventName,"value":eventValue,"eventSubject":eventSubject}
  }
  RaiseEvent(compositeAction:CompositeAction,eventObj:any){
    console.warn("RAISE EVENT ",compositeAction,"...EventOBj",eventObj)
    let action:any = compositeAction.actions[0]
    if (action.type==ATLAS_SET_ACTIVE_INSTANCE_ACTION.type){
        this.store.dispatch(RAISE_EVENT(this.shellToken)({id:action.id,event:eventObj.event,value:eventObj.value,eventSubject:eventObj.eventSubject}))
    }
  
    
  }
  
}
