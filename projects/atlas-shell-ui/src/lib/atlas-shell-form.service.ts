import { Injectable } from '@angular/core';


import { FormGroup } from '@angular/forms';

import { AtlasSnapshotService } from './atlas-shell-snapshot.service';
import { AtlasShellEntityService } from './atlas-shell-entity.service';

@Injectable({
  providedIn: 'root'
})
export class AtlasShellFormService{

  constructor(private snapShot:AtlasSnapshotService,private compService:AtlasShellEntityService) {

   }
   createForm(key:string,obj:any){
      let id = this.compService.entity!.id
      if (id){
          if (this.snapShot.getSnapshot(id,key)){
         
            return this.snapShot.getSnapshot(id,key)
          }
      }
      let retval = new FormGroup(obj)
      
      this.snapShot.addSnapshot(id,key,retval)
      return retval 

   }
   
}
