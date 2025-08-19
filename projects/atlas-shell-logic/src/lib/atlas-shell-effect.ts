import { Inject, Injectable, InjectionToken } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import { createAction, props } from "@ngrx/store"

import { switchMap, tap } from "rxjs/operators"
import { AtlasShellSnapshotService } from "./atlas-shell-snapshot.service"
import { AtlasShell_createEntityAction } from "./atlas-shell.actions"
import { TREE_ADDENTITY, TREE_SETACTIVE } from "./atlas-shell.reducer"
import { createCompositeAction } from "./atlas-shelll.compositeActions"
export const SLICES = new InjectionToken<string[]>("SLICES")
export const NAVENTITY = createAction("NAVENTITY",props<any>())

export const goBack = (activatedRoute:ActivatedRoute ,level:number):any=>
{
    if (activatedRoute.parent)
      console.log("ACTIVE  and Level",activatedRoute.snapshot.url,level);
    else{
      console.log("ACTIVE  unefined");
    }
    return level==0?activatedRoute:activatedRoute.parent?goBack(activatedRoute.parent,level-1):activatedRoute}
export const urlLevel=(url:string)=>url=="/"?0:url.replace("//","").split("/").length-1

@Injectable({
    providedIn: 'root'
  })
  export class AtlasShellEffectService{
  
    
    addEffectFunc = (slice:string)=>{
      console.log("Creating Effect",slice)
      return createEffect(
      ()=>this.actions$.pipe(
        ofType(AtlasShell_createEntityAction(slice).ADD_ENTITY),
        tap(data=>console.log("ADD=>EFFECT",data)),
        switchMap((actionParameters)=>this.snapShotService.saveSnapshot$(slice)
        .pipe(
      
            switchMap(data=>[createCompositeAction("COMPOSITE",data,TREE_ADDENTITY(slice)({path:actionParameters.path,entity:actionParameters.entity}),TREE_SETACTIVE(slice)({path:actionParameters.path,id:actionParameters.entity.id}))])
        ))
      )
    )}
    activeEffectFunc =(slice:string)=> createEffect(
      ()=>this.actions$.pipe(
        ofType(AtlasShell_createEntityAction(slice).ACTIVATE_ENTITY),
      
        switchMap((actionParameters)=>this.snapShotService.saveSnapshot$(slice)
        .pipe(
     
            switchMap(snapShotAction=>[createCompositeAction("COMPOSITE",snapShotAction,TREE_SETACTIVE(slice)({path:actionParameters.path,id:actionParameters.entity.id}))])
        ))
      )
    )
    
    
  
    
    constructor(private actions$:Actions,private snapShotService:AtlasShellSnapshotService,@Inject(SLICES) private slices:string[]){
  
        console.log("SLICES=>>>",this.slices)
        let obj = this as any
        this.slices.map((slice,index)=>obj["addeffects"+index] = 
        this.addEffectFunc(slice))
        this.slices.map((slice,index)=>obj["activeEffects"+index] = 
        this.activeEffectFunc(slice))
  
  
         
        
     }
  }
  