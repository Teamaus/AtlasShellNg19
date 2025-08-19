import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ATLAS_SHELL_TOKEN, TREE_ADDENTITY, TREE_SETACTIVE, createCompositeAction } from 'atlas-shell-logic';
import { AtlasShellRoutingService } from '../atlas-shell-routing.service';
import { Store } from '@ngrx/store';

@Component({
    standalone:false,
  selector: 'atlas-shell-add-entity-v2',
  templateUrl: './atlas-shell-add-entity-v2.component.html',
  styleUrls: ['./atlas-shell-add-entity-v2.component.css']
})
export class AtlasShellAddEntityV2Component implements OnInit {
  @Input() frm = new FormGroup({
    ID:new FormControl('')
  })
  @Input() rootEntity=''
  @Input() category='' 

  constructor(@Inject(ATLAS_SHELL_TOKEN)private shellToken:string,
  private shellRoutingService:AtlasShellRoutingService,
  private store:Store<any>) {

   }

  ngOnInit(): void {
  }
  addEntity(){
    let entityID = this.frm.get("ID")!.value
    let action = createCompositeAction("ADD_AND_ACTIVATE",TREE_ADDENTITY(this.shellToken)({path:[this.rootEntity],entity:{id:entityID,category:this.category,comment:"V2"}}),TREE_SETACTIVE(this.shellToken)({path:[this.rootEntity],id:entityID}))
    this.store.dispatch(action)
    if (entityID)
      this.shellRoutingService._navigate(entityID,this.rootEntity)
    
      
  }

  






}
