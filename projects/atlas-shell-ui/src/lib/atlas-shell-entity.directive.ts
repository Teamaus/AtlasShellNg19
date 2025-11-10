import { ContentChildren, Directive, effect, forwardRef, Inject, InjectionToken, input, OnInit, Optional, SkipSelf } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtlasShellEntityFactoryService, AtlasShellFactoryService, AtlasShellSelectorService } from 'atlas-shell-logic';
import { AtlasShellEntityService } from './atlas-shell-entity.service';
import { AtlasShellEntityV19Service } from './atlas-shell-entity-v19.service';
import { AtlasChildEntitiesV19Service } from './atlas-child-entities-v19.service';


export const ATLAS_SHELL_ENTITY = new InjectionToken<any>("ATLAS_SHELL_ENTITY")
export interface IAtlasShellEntity
{
    get childEntities():any[] 
    addChildEntity(entity:any):void 
    searchChildEntity(type:string):any
}
@Directive({
  selector: 'atlas-shell-entity',
  providers:[{provide:ATLAS_SHELL_ENTITY,useExisting:forwardRef(()=>AtlasShellEntityDirective)},{provide:AtlasShellEntityV19Service}],
  standalone: false,
  exportAs:'parentEntity'
})
export class AtlasShellEntityDirective implements OnInit,IAtlasShellEntity{
  entityType = input<string>("")
  entityCategoty=input<string>("childRoot")
  
  entity:any 
  
  constructor(private shellFactory:AtlasShellEntityFactoryService,
              private store:Store, 
              private shellSelector:AtlasShellSelectorService,
              private shellEntityService:AtlasShellEntityV19Service, 
              private childrenEntitiesService:AtlasChildEntitiesV19Service,
             @SkipSelf() @Optional() @Inject(ATLAS_SHELL_ENTITY) private parentEntity:AtlasShellEntityDirective ) { 
    
    effect(()=>this.createtOrActivate(this.entityType()))
  }
  get childEntities(): any[] {
      return this.childrenEntitiesService.childEntities    
  }
  searchChildEntity(type: string) {
    return this.childrenEntitiesService.searchEntity(type)
  }
     
  addChildEntity(entity:any)
  {
      this.childrenEntitiesService.addEntity(entity)
  }
  ngOnInit(): void {
      this.shellFactory.getInstanceID()
  }
  createtOrActivate(type:string){
      let ret = "Create"
      
      
      if (this.parentEntity)
      { 
        
        
        console.log("ATLAS_SHELL_ENTITY_DIRECTIVE",this.parentEntity)  
        this.entity = this.parentEntity.searchChildEntity(type)
        if (this.entity)
        {
          ret="Activate"
           
          this.shellEntityService.entity = this.entity
          console.log("V19 ACTIVATE: ", this.shellEntityService)
          this.shellEntityService.setActive()
        }  
        else
        {
          //Here we are going to create 
          
          this.entity = this.shellEntityService.createEntity_2(this.getPath(),type,this.entityCategoty())
          this.shellEntityService.entity = this.entity 
         
          this.parentEntity.addChildEntity(this.entity)
        }
        
      
      }
      
      console.log("ATLAS_SHELL_ENTITY_DIRECTIVE",ret,type,this.parentEntity)

  }
  getPath():string[]{
    let ret:string[] = []
    if (this.parentEntity){
      ret = [...ret,...this.parentEntity.getPath()]

    }
    return ret
  }

}
