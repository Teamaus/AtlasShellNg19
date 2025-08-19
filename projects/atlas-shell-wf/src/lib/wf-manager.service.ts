import { ElementRef, Injectable, Optional } from '@angular/core';
import { IWfStep } from './TOKENS';
import { AtlasShellEntityService } from 'atlas-shell-ui';
import { SET_REF } from './wf-reducer';
import { createFeature, createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WfManagerService {
  _steps:any[] = []
  _ref:{[refname:string]:any} = {} 
  entityID:string = ""
  constructor(private shellEntityService:AtlasShellEntityService,private store:Store<any>) { }
  register(el:ElementRef,step:IWfStep){
    this._steps.push({el,step})
    console.log("=>>>",this._steps)


  }
  getStep(el:ElementRef){
    let retval =  this._steps.find(e=>e.el.nativeElement==el.nativeElement)
    
    if (retval)
    {
      return retval.step
    }
  }
  setRef(refName:string,wf:string, value:any){
    this._ref[refName] = value     
    console.log("SET REF>>>",refName,this._ref) 
    this.shellEntityService.dispatch(SET_REF({id:this.shellEntityService.entity.id,wf,refName,value}))
  }
  getRef$(refName:string,wf:string):Observable<any>{
    return this.store.select(state=>state["workflow"][this.shellEntityService.entity.id]["workflow"][wf][refName])
    .pipe(filter(state=>state))
  
  }


  
}
