import { Inject, Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ATLAS_CREATE_INSTANCE_ACTION, entityTreeActivePathSelector, entityTreeActiveSnapShotSelector } from './atlas-shell.reducer';
import { atlas_log, getPathFromPathObj } from 'atlas-utils';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AtlasShellSnapshotService } from './atlas-shell-snapshot.service';
import { ActivatedRoute } from '@angular/router';
import { ATLAS_SHELL_ENTITY_ID_TOKEN, ATLAS_SHELL_TOKEN } from './atlas-shell.tokens';

import { AtlasShellSelectorService } from './atlas-shell-selector.service';
import { AtlasShellRootEntityService } from './atlas-shell-root-entity.service';




@Injectable()
export class AtlasShellComponentService {

  snapShotRegistry:{[key:string]:any}={}
  path = []
  snapShot:any
 
  compName:string='NONAME'
  instanceID:string = ""
  constructor(private store:Store<any>,private snapshotService:AtlasShellSnapshotService,private activatedRoute:ActivatedRoute,
   private shellService:AtlasShellSelectorService,@Inject(ATLAS_SHELL_TOKEN)private shellToken:string,
   @Inject(ATLAS_SHELL_ENTITY_ID_TOKEN)operationID:string,private rootEntityService:AtlasShellRootEntityService) { 
      
        this.store.select(this.shellService.entityInstanceIDSelector(operationID,this.rootEntityService.category))
        .subscribe(activeInstance=>{
      
          //this.store.dispatch(ATLAS_CREATE_INSTANCE_ACTION({instanceID:activeInstance})) 
          this.instanceID = activeInstance
        }
        )
        
  }
  registerSnapshot(key:string,obj:any,valueFunc:(obj:any)=>any){
  
    
   let path = getPathFromPathObj(this.path)
   return  this.snapshotService.registerSnapshotEntry({path:path,obj:obj,valueObjFunc:valueFunc,outlet:this.activatedRoute.outlet,compName:this.compName}) 
   
   }
  
  createForm(key:string,controls:{[key:string]:AbstractControl}){
    
    let retval =  new FormGroup(controls)
    this.store.select(entityTreeActivePathSelector(this.shellToken))
    .subscribe((path:any)=>{this.path=path;console.log("PATH",this.path)}) 
    let obs$ = this.store.select(entityTreeActiveSnapShotSelector("profile",this.activatedRoute.outlet))
    
    obs$.subscribe((snapShot:any)=>{
      
          if (snapShot)
          {
            retval.setValue(snapShot)
      
            this.registerSnapshot(key,retval,(retval)=>retval.value)
          }
    },
    (error:any)=>console.log("Error"),()=>console.log()
    )
   
    if (this.snapShot){
      
      retval.setValue(this.snapShot)
    }
    
    this.registerSnapshot(key,retval,(retval)=>retval.value)
    ///if we have values in the snapshot lets bring them
    
    //ToDo here 
    return retval 
  }
  select$(obs$:Observable<any>){
      return obs$
      
  }

}
