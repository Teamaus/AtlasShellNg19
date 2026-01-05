import { Directive, forwardRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtlasShellSelectorService } from 'atlas-shell-logic';
import { ATLAS_SHELL_ENTITY, AtlasNavV19Service, IAtlasShellEntity, NavUtilsV19Service } from 'atlas-shell-ui';
import { AtlasChildEntitiesV19Service } from 'atlas-shell-ui';
import { switchMap, take, tap } from 'rxjs';

@Directive({
  selector: 'atlas-shell-root',
  standalone: false,
  providers:[{provide:ATLAS_SHELL_ENTITY,useExisting:forwardRef(()=>AtlasShellRootDirective)},
              {provide:AtlasChildEntitiesV19Service}
  ],
  exportAs:"atlasShellRoot"
})
export class AtlasShellRootDirective implements IAtlasShellEntity,OnInit {
  _childrenType :{[key:string]:string[]}={}
  childEntities:any[]=[] 
  activeType = ""
  entityID = "" 
  constructor(private store:Store,private shellSelector:AtlasShellSelectorService,
    private childrenEntitiesService:AtlasChildEntitiesV19Service,
    private navService:AtlasNavV19Service
  ) {
      

   }
  navigate(op:string){
    this.navService.Nav(op,`root_${this.activeType}`,false)
  }
  searchChildEntity(type: string) {
    this.childrenEntitiesService.childEntities = this._childrenType[this.activeType]
    return this.childrenEntitiesService.searchEntity(type)
  }
  ngOnInit(): void {
    this.store.select(state=>state)
    .subscribe(state=>console.log("ROOTD=>",state))
    this.store.select(this.shellSelector.rootActiveIDSelector())
    .subscribe(
      state=>this.setActiveType(state)
    )
    
    this.store.select(this.shellSelector.rootEntitiesSelector())
    .subscribe(state=>console.log("ROOTD=>ENTITIES",state[this.activeType].entities,this.activeType))
    
    
  }
  addChildEntity(entity:any){
    this.childrenEntitiesService.childEntities = this._childrenType[this.activeType]
    this.childrenEntitiesService.addEntity(entity)
  }
  
  setActiveType(type:string){
    if (!this._childrenType[type])
    {
        this._childrenType[type] = [] 
    }
    
    
    this.activeType = type
  
    
    
  }
  
  getPath():string[]{
    return [this.activeType]
  }
}
