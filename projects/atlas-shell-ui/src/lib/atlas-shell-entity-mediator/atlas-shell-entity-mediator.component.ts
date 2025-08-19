import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ATLAS_SHELL_TOKEN, AtlasShellSelectorService } from 'atlas-shell-logic';
import { atlas_log } from 'atlas-utils';

@Component({
    standalone:false,
  selector: 'atlas-shell-entity-mediator',
  templateUrl: './atlas-shell-entity-mediator.component.html',
  styleUrls: ['./atlas-shell-entity-mediator.component.css']
})
export class AtlasShellEntityMediatorComponent implements OnInit {
  instanceID:number = 0
  constructor(private store:Store<any>,
    @Inject(ATLAS_SHELL_TOKEN)private shellToken:string,
    private atlasShellSelector:AtlasShellSelectorService) { }

  ngOnInit(): void {
  }
  addEntity(entity:any){
    atlas_log(this,"ENTITY BY INSTANCE",entity)
      this.store.select(this.atlasShellSelector.entitySelectorByInstance
        (this.shellToken,entity.instanceID))
      .subscribe(
        entity=>atlas_log(this,"ENTITY BY INSTANCE",entity)
      )
  }

}
