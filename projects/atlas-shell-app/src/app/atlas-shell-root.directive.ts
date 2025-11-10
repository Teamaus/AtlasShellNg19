import { Directive, forwardRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtlasShellSelectorService } from 'atlas-shell-logic';
import { ATLAS_SHELL_ENTITY, IAtlasShellEntity } from 'atlas-shell-ui';
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
    private childrenEntitiesService:AtlasChildEntitiesV19Service) {

   }
  searchChildEntity(type: string) {
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
    .subscribe(state=>console.log("ROOTD=>ENTITIES",state[this.activeType].entities))
    
    
  }
  addChildEntity(entity:any){
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
