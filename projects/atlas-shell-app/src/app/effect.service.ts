import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { AtlasShellEntityService, AtlasShellEventsService, ShellActionService } from 'atlas-shell-ui';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { SETVALUE } from './c/c/c.reducer';
import { EFFECT_ACTION, NAVIGATE_ACTION } from './c/c.actions';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DocService } from './doc.service';
import { CService } from './c.service';

function getValue():Observable<any>{
    return of({workflow:"abcd",value:Math.floor(Math.random()*10)})
}
@Injectable()
export class EffectService {
  static count = 0 
  effect:any
  effid = 0
  selector$ = new BehaviorSubject<any>("")
  constructor(private shellActionService:ShellActionService,
    private doc:DocService,
    private router:Router
    ,private activatedRoute:ActivatedRoute
    ,private shellEventService:AtlasShellEventsService) {
      this.effid = ++EffectService.count
      console.log("SASID:",this.shellActionService.sasid,"EFFID",this.effid)
      
      this.effect = createEffect(()=>
      {
        console.log("SSAID 2:",this.shellActionService.sasid,"EFF",this.effid)
   return this.shellActionService.actions$(EFFECT_ACTION).pipe(
    //Here we wll have an effect that will create the data
    tap(data=>this.shellActionService.getRegisteredService(CService).DoIt()),
    
    tap(data=>console.log("DATA=>>>1:",data,this.shellActionService.getActiveInstanceID())),
    
    tap(data=>console.log("DATA 2=>>>",this.shellActionService.currentAction.actions[0])),
    
    switchMap(data=>getValue().pipe(
      tap(data=>console.log("DATA=>>>",data)),
      
      switchMap(data=>this.shellActionService.doActions_wf({workflow:"abcd"},SETVALUE(data),NAVIGATE_ACTION()))
      ,
      finalize(()=>alert("All actions "))
    
    )
   )
   )})
   }

   
   /*navEffect = createEffect(
    ()=>this.shellActionService.actions$(NAVIGATE_ACTION).pipe(
      tap(data=>console.log("NAVIGATING....2")),
      //tap(data=>this.shellActionService.NavigateModal("signature"))
      tap(data=>this.shellActionService.NavigateReuse("CO1"))
      
    )
   )*/
   

}

