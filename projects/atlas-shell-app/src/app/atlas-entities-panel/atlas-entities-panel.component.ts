import { Component, Inject, Input, OnInit } from '@angular/core';
import { ATLAS_SHELL_ENTITY, AtlasNavV19Service, AtlasShellEntityService, AtlasShellNavigationV19Service, IAtlasShellEntity } from 'atlas-shell-ui';


import { Observable } from 'rxjs';
import { AtlasShellRootDirective } from '../atlas-shell-root.directive';
import { ActivatedRoute, Router } from '@angular/router';



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
  
  constructor(private componentService:AtlasShellEntityService,private router:Router,
    private activatedRoute:ActivatedRoute,
    private shellNavigationService:AtlasShellNavigationV19Service,
    private navService:AtlasNavV19Service,
    @Inject(ATLAS_SHELL_ENTITY) private atlas_shell_entity:AtlasShellRootDirective
    
  ) { 
        console.log("ATLAS SHELL ROOT ENTITY:",this.atlas_shell_entity)
        
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
      console.log("Entity Type:",this.entityType,this.entityID)
      switch(this.entityType){
        case 'root':
            console.log("Creating USER ...",type)
            
            this.componentService.createRootEntity(type)
            break
        case 'childRoot':
          if (type=="C" || type=="B")
          {
              
              console.log("NAV TO ",type,":config",this.router.config)
              console.log("NAV TO ",type,":",{outlets:{[this.entityID]:[type]}})
              
             // this.router.navigate([{outlets:{["root_"+this.entityID]:[type]}}])
           // this.shellNavigationService.navigate([{outlets:{["root_"+this.entityID]:[type]}}],true,type,{relativeTo:this.activatedRoute})
              
             this.atlas_shell_entity.navigate(type)
             // this.shellNavigationService.NavEntity(this.entityID,type,this.activatedRoute)
          }
          else
          {
              console.log("NAV TO C:config",this.router.config)
              this.componentService.createOrActivateChildRootEntity(type)
          }
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
