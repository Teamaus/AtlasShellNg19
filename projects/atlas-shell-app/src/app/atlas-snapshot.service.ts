import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtlasSnapshotService {
  snapShots:{[id: string]: any}={}
  constructor() { 

  }
  createSnapShot(id:string,obj:any){
    
    this.snapShots[id] = obj

  }
  addSnapshot(id:string,key:string,obj:any){
    if (!this.snapShots[id]){
        this.createSnapShot(id,{[key]:obj})
    }
    else{
        this.snapShots = {...this.snapShots,id:{...this.snapShots[id],[key]:obj}}
    }
    console.log("SNAPSHOTS===>>",this.snapShots)
    
  }

  getSnapshot(id:string,key:string){
    if (this.snapShots[id])
    return this.snapShots[id][key]
  }
}
