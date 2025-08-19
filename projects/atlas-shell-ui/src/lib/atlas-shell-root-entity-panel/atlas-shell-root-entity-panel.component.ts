import { Component, ContentChild, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AtlasShellRoutingService } from '../atlas-shell-routing.service';
import { Store } from '@ngrx/store';
import { ATLAS_SHELL_TOKEN, AtlasShellEntityFactoryService, SLICES, TREE_ADDENTITY, TREE_SETACTIVE, createCompositeAction, entitiesTreeSelector } from 'atlas-shell-logic';
import { atlas_log } from 'atlas-utils';

import { AtlasShellAddEntityComponent } from '../atlas-shell-add-entity/atlas-shell-add-entity.component';
import { AtlasShellEntityPanelComponent } from '../atlas-shell-entity-panel/atlas-shell-entity-panel.component';
import { AtlasShellAddEntityV2Component } from '../atlas-shell-add-entity-v2/atlas-shell-add-entity-v2.component';



@Component({
    standalone:false,
  selector: 'atlas-shell-root-entity-panel',
  templateUrl: './atlas-shell-root-entity-panel.component.html',
  styleUrls: ['./atlas-shell-root-entity-panel.component.css']
})
export class AtlasShellRootEntityPanelComponent implements OnInit {
  @ContentChild(AtlasShellAddEntityComponent) addSubEntity?:AtlasShellAddEntityComponent
  @ContentChild(AtlasShellEntityPanelComponent) subEntitiesPanel?:AtlasShellEntityPanelComponent
  @ContentChild(AtlasShellAddEntityV2Component) addSubEntityV2?:AtlasShellAddEntityV2Component
  frm = new FormGroup({"In":new FormControl('')})
  @Input() entities:string[]=[]
  currentTab = ''
  @Output() addEntity = new EventEmitter<any>()
  constructor(private routingService:AtlasShellRoutingService
    ,private store:Store<any>,@Inject(ATLAS_SHELL_TOKEN) private shellToken:string,@Inject(SLICES) private slices:string[],
    private shellEntityFactoryService:AtlasShellEntityFactoryService
    ) 
    { 
      atlas_log(this,"ATLAS_SHELL_TOKEN",this.shellToken)
      this.store.select(state=>state)
      .subscribe(
        state=>{
                
                this.entities = state.shell.entities?Object.keys(state[ this.shellToken].entities):[]
                
                
        }
        )
    }

  ngOnInit(): void {
    
  }
  set CurrentTab(tab:string)
  {
    this.currentTab = tab
   
    
  }

  AddTab(){
   
    
    this.CurrentTab = this.frm.value.In?this.frm.value.In:"" 
    let entity = this.shellEntityFactoryService.createEntity(this.currentTab,'root')
    atlas_log(this,"CreateEntity_Factory>>>",entity)
    let action = createCompositeAction("ADD_AND_ACTIVATE",TREE_ADDENTITY(this.shellToken)({path:[],entity:entity}),TREE_SETACTIVE(this.shellToken)({path:[],id:this.currentTab}))
    this.store.dispatch(action)
    
    let outlet = "root_"+this.currentTab
    this.UpdateChilds()
    this.routingService.AddEntry(outlet)
    
    
    
  }
  UpdateChilds(){
    
    if (this.addSubEntity){
      console.log("CURRENT TAB_1")
        this.addSubEntity.Category = "root_"+this.currentTab
        this.addSubEntity.CategoryPath = ['root']
      }
      if (this.subEntitiesPanel){
        console.log("CURRENT TAB_2")
  
        this.subEntitiesPanel.EntityCategory = "root_"+this.currentTab
        this.subEntitiesPanel.path = [this.currentTab]
  
      }
      let outlet = 'root_'+this.currentTab
      if (this.addSubEntityV2){
        
        this.addSubEntityV2.rootEntity = this.currentTab
        this.addSubEntityV2.category =  outlet
      }
     
     
     
     
  }
  setActive(tab:string){
    this.store.dispatch(TREE_SETACTIVE(this.shellToken)({path:[],id:tab}))
    this.CurrentTab = tab
    this.UpdateChilds()

    
  }
  closeTab(tab:string){
    
    this.entities = this.entities.filter(elem=>elem!=tab)
    this.routingService.RemoveEntry(tab)
    return this.entities
  }
  visibilityStatus(tab:string){
      let state=this.currentTab==tab?'block':'none'
      let retval ={display:state}

      return retval

  }


}
