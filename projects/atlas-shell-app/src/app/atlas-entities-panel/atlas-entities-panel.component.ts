import { Component, Input, OnInit } from '@angular/core';
import { AtlasShellEntityService } from 'atlas-shell-ui';


import { Observable } from 'rxjs';


@Component({
    standalone:false,
  selector: 'atlas-entities-panel',
  templateUrl: './atlas-entities-panel.component.html',
  styleUrls: ['./atlas-entities-panel.component.css'],
  
})
export class AtlasEntitiesPanelComponent implements OnInit {
  @Input() entityType = "childEntity"
  @Input() entitiesCategory=""
  @Input() entityID = ""
  ids$?:Observable<any>
  entities$?:Observable<any>
 
  constructor(private componentService:AtlasShellEntityService) { 
        
        
  }

  ngOnInit(): void {
   if (this.entityID!=""){
      this.componentService.setEntity(this.entityID)
    }
    else{
      if (this.entitiesCategory=="root"){
        this.componentService.initSelectors()
      }
    }
    this.ids$ = this.componentService.entitiesIDS
    this.entities$=this.componentService.childEntities$
  }
  createOrActivate(type:string){
      console.log("Entity Type:",this.entityType)
      switch(this.entityType){
        case 'root':
            this.componentService.createRootEntity(type)
            break
        case 'childRoot':
          
          this.componentService.createOrActivateChildRootEntity(type)
          break
        case 'childEntity':
          this.componentService.createOrActivateChildAntity(type,this.entitiesCategory)
          

      }
  }
  HandleEntity(type:string){
      console.log("HANDLE ENTITY=>>>>",type,this.entityType)
      this.createOrActivate(type)
  }

}
