import { Injectable } from '@angular/core';
import { createAction, Store } from '@ngrx/store';
import { atlas_log } from 'atlas-utils';
import { Observable, of } from 'rxjs';
import { ADD_SNAPSHOT } from './atlas-shell.reducer';
import { createCompositeAction } from './atlas-shelll.compositeActions';
export interface SnapshotEntry{
  path:string[],
  obj:any,
 
  valueObjFunc:(obj:any)=>any,
  outlet:string,
  compName:string

}
const NOACTION = createAction("NOACTION")

@Injectable({
  providedIn: 'root'
})
export class AtlasShellSnapshotService {

  snapShotRegistry:SnapshotEntry[] = []

  constructor(private store:Store<any>) { }
  registerSnapshotEntry(snapshotEntry:SnapshotEntry){
    
    
    this.snapShotRegistry =  [...this.snapShotRegistry,snapshotEntry]
   
    return this.registerSnapshotEntry

  }
  updateSnaphot$(key:string,value:any):Observable<any>{
    let index = this.snapShotRegistry.length-1
      atlas_log(this,"OBJ=>>>",this.snapShotRegistry[index].obj.value,"NEW VALUE:",value)
     
      this.snapShotRegistry[index].obj.get(key).setValue(value)
      return of(NOACTION)
  }
  updateSnapshotMetaData(obj:any){

  }
  updateSnapshotValue(obj:any){
      //Object.keys(obj).map(key=>
  } 
  
  saveSnapshot(slice:string){
    let actions = this.snapShotRegistry.map(snapshotEntry=>
      ADD_SNAPSHOT(slice)({path:snapshotEntry.path,snapshot:snapshotEntry.valueObjFunc(snapshotEntry.obj)}))
    let action = createCompositeAction("SNAPSHOTS",...actions)
    
    this.snapShotRegistry = [] //clear registry 
    this.store.dispatch(action)
  }
  saveSnapshot$(slice:string):Observable<any>
  {
   
    let actions = this.snapShotRegistry.map(snapshotEntry=>
      {
    
    
      return ADD_SNAPSHOT(slice)({path:snapshotEntry.path,snapshot:snapshotEntry.valueObjFunc(snapshotEntry.obj)})
      }
    )
      
    let compositeAction = createCompositeAction("SNAPSHOTS",...actions)
   
    this.snapShotRegistry = [] //clear registry 
    
    if (compositeAction.actions.length==0){
      atlas_log(this,"SNAPSHOT REGISTRY$ NOACTION")
      return of(NOACTION())
    }
   // this.snapShotRegistry = []
    return of(...compositeAction.actions)

  }
}
