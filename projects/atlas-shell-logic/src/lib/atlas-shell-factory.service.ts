import { Injectable } from '@angular/core';
import { AtlasShellSnapshotService } from './atlas-shell-snapshot.service';


@Injectable({
  providedIn: 'root'
})
export class AtlasShellFactoryService {

  constructor(private snapShotService:AtlasShellSnapshotService) { }
  create(factoryFunc:()=>any):any{
      
      let retval = factoryFunc()
      return retval 


  }
}
