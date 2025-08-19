import { Injectable } from '@angular/core';
import { AtlasSnapshotService } from './atlas-shell-snapshot.service';



@Injectable({
  providedIn: 'root'
})
export class AtlasShellErrorService {

  constructor(private snapShotService:AtlasSnapshotService) { 


  }
  raiseError(id:string,err:any){

      return this.snapShotService.updateSnapShot(id,"err",err)
      
  }
  getError(id:string){
    let retval = this.snapShotService.getSnapShotEntry(id)
    if (retval){
      retval = retval.err
    }
    return retval  
  }
  clearError(id:string){
    let retval = this.snapShotService.getSnapShotEntry(id)
    if (retval){
      retval = {...retval}
      delete retval['err']
    
    }
    return retval 
  }
}

