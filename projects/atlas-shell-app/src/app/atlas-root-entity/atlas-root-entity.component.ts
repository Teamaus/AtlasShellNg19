import { Location } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { AtlasShellEntityService } from 'atlas-shell-ui';

@Component({
    standalone:false,
  selector: 'atlas-root-entity',
  templateUrl: './atlas-root-entity.component.html',
  styleUrls: ['./atlas-root-entity.component.css'],
  providers:[AtlasShellEntityService]
})
export class AtlasRootEntityComponent implements OnInit {
  @Input() entitiesCategory = ""
  @Input() name = ""
  @Input() E:any
  @Input() title=""
  entityID(name:string){
    return name.split("_")[1]
  }
  constructor(private location:Location) { 
     console.log("###ROOT ENTITY",this)
  }
  ngDoCheck(){
    console.log("DO CHECK =>>>>>",this.name)
  }
  ngOnChanges(changes: SimpleChanges): void {
      console.log("TAKE ON CHANGE",this.name,this.E)

      this.E.DontRender=false
  }


  ngOnInit(): void {
    console.log("ROOT ENTITY CTOR=>>>",this.name)
  }
  back(){
    this.location.back()
  }


}
