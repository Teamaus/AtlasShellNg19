import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AtlasEntitiesPanelComponent } from '../atlas-entities-panel/atlas-entities-panel.component';

@Component({
    standalone:false,
  selector: 'atlas-entity-mediator',
  templateUrl: './atlas-entity-mediator.component.html',
  styleUrls: ['./atlas-entity-mediator.component.css']
})
export class AtlasEntityMediatorComponent implements OnInit {
  @Input() entityType = "childEntity"
  @Input() entitiesCategory=""
  @Input() entityID = ""
  @ViewChild(AtlasEntitiesPanelComponent) panelComponent?:AtlasEntitiesPanelComponent
  constructor() { }

  ngOnInit(): void {
    console.log("ENTITY TYPE:",this.entityType)
  }
  AddEntity(id:string){
      console.log("ADD ENTITY ",id)
      if (this.panelComponent){
        this.panelComponent.HandleEntity(id)
      }
  }
  


}
