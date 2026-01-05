import { Inject, Injectable } from '@angular/core';
import { AtlasStoreBaseService } from './atlas-store-base.service';
import { base64UrlEncode } from './entity-utils';
import { ATLAS_SHELL_TOKEN, AtlasShellEntityFactoryService, createCompositeAction } from 'atlas-shell-logic';
import { Store } from '@ngrx/store';
import { AtlasShellRoutingService } from './atlas-shell-routing.service';


@Injectable({
  providedIn: 'root'
})
export class AtlasRootStoreService extends AtlasStoreBaseService {

  constructor(private store:Store<any>,
    private shellEntityFactory:AtlasShellEntityFactoryService,
    private atlasShellRoutingService:AtlasShellRoutingService,
    @Inject(ATLAS_SHELL_TOKEN) shellToken:string,) {
     super(shellToken)
   }
  createRootEntity(type:string):any{
        let ent = this.shellEntityFactory.createEntity(type,"root")
        ent.id = base64UrlEncode(type)
     //   this.entityIDSelectorSubscribe(ent.id,false)
        let actions = createCompositeAction("ADD_AND_ACTIVATE",this.add_e({path:[],entity:ent}),this.activate_e({id:ent.id,path:[]}))
        this.store.dispatch(actions)
        let entry = this.atlasShellRoutingService.rootOutlet(ent.id)
        
        this.atlasShellRoutingService.AddEntry(entry)
        return ent
    }
    

}
