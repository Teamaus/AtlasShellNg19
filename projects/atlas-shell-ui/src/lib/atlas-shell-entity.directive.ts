import { ContentChildren, Directive, effect, forwardRef, Inject, InjectionToken, input, OnInit, Optional, SkipSelf } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AtlasShellEntityFactoryService, AtlasShellFactoryService, AtlasShellSelectorService } from 'atlas-shell-logic';
import { AtlasShellEntityService } from './atlas-shell-entity.service';
import { AtlasShellEntityV19Service } from './atlas-shell-entity-v19.service';
import { AtlasChildEntitiesV19Service } from './atlas-child-entities-v19.service';
import { ActivatedRoute, NavigationEnd, Route, Router, RouteReuseStrategy } from '@angular/router';
import { AtlasShellNavigationV19Service } from './atlas-shell-navigation-v19.service';
import { AtlasStoreService } from './atlas-store.service';
import { AtlasNavV19Service } from './atlas-nav-v19.service';




export const ATLAS_SHELL_ENTITY = new InjectionToken<any>("ATLAS_SHELL_ENTITY")
export const ATLAS_SHELL_ENTITY_ID = new InjectionToken<any>("ATLAS_SHELL_ENTITY_ID")
export interface IAtlasShellEntity
{
    get childEntities():any[] 
    addChildEntity(entity:any):void 
    searchChildEntity(type:string):any
}
@Directive({
  selector: 'atlas-shell-entity',
  providers:[{provide:ATLAS_SHELL_ENTITY,useExisting:forwardRef(()=>AtlasShellEntityDirective)}
    //,{provide:ATLAS_SHELL_ENTITY_ID,deps:[forwardRef(()=>AtlasShellEntityDirective)],useFactory:(dir:AtlasShellEntityDirective)=>dir.entity.id}
    ,AtlasStoreService 
    
  , AtlasNavV19Service],
  standalone: false,
  exportAs:'parentEntity'
})
export class AtlasShellEntityDirective implements OnInit,IAtlasShellEntity{
  entityType = input<string>("")
  entityCategoty=input<string>("childRoot")
  counter = 0
  entity:any 
  /*
  ToDo: Change reuse strategy so the save will be during the navigation end on the directive 
  The key will be the url itself . But what we will save we need to store the handler 
  */
  constructor(private shellFactory:AtlasShellEntityFactoryService,
              
              public shellSelector:AtlasShellSelectorService,
              private navigation:AtlasNavV19Service,
              private childrenEntitiesService:AtlasChildEntitiesV19Service,
              private reuseStrategy:RouteReuseStrategy,
              private atlasStore:AtlasStoreService,
               @SkipSelf() @Optional() @Inject(ATLAS_SHELL_ENTITY) private parentEntity:AtlasShellEntityDirective,
              @Optional() private shellEntityService:AtlasShellEntityV19Service ) { 
    
    effect(()=>{
                  this.createtOrActivate(this.entityType())
                  this.shellEntityService.entity = this.entity
                  console.log("SHELL_ENTITY_SERVICE",this.shellEntityService)
                })
      console.log("DIRECTIVE CONSTRUCTOR PARENT:",this.parentEntity)
     
   
      
    
  }
  dispatch(action:Action){
    
      this.atlasStore.dispatch(this.entity.id,action)
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
       console.log("DIRECTIVE: atlas-shell-entity",this.entityType(),this.entityCategoty(),++this.counter)
        
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
          console.log("V19 ACTIVATE:>>> ", this.shellEntityService)
          this.atlasStore.setActive(this.entity.id)
        }  
        else
        {
          //Here we are going to create 
          const path = this.getPath()
          this.entity = this.atlasStore.createEntity(path,type,this.entityCategoty())
          console.log("ENTITY CREATED:",this.entity)
          this.shellEntityService.entity = this.entity 
          this.parentEntity.addChildEntity(this.entity)
          console.log("V19 CREATE: ", path)
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
  navigate(op:any,activatedRoute:ActivatedRoute,save=true){
     this.navigation.Nav(op,"")
  }

}
