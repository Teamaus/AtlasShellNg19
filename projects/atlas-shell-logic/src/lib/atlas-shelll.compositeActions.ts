import { Action } from "@ngrx/store"

export interface CompositeAction extends Action{
    type: string
    actions:Action[]
  
  
  
  }
  
  export function isCompositeAction(obj:any):obj is CompositeAction
  {
    
    return (obj.type!=undefined && obj.actions!=undefined)
  }
  export function createCompositeAction(actionName:string,...actions:Action[]):CompositeAction
  {
    console.log("COMPOSITE ACTION NAME",actionName)
    return {type:actionName,actions:actions}
  }
  