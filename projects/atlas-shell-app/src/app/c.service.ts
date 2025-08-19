import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtlasShellRegistryService } from 'atlas-shell-logic';
import { AtlasShellEntityService } from 'atlas-shell-ui';
import { DocService } from './doc.service';


@Injectable()
export class CService  {

  constructor(private shellEntity:AtlasShellEntityService,private store:Store<any>,private docService:DocService) {
    
    
    
    
   }
   DoIt(){

    console.log("CService",this.shellEntity.entity.id,this.store,this.docService)
   }
}
