import { ContentChildren, Directive, effect, forwardRef, Inject, InjectionToken, input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AtlasShellEntityFactoryService, AtlasShellFactoryService } from 'atlas-shell-logic';

export const ATLAS_SHELL_ENTITY = new InjectionToken<any>("ATLAS_SHELL_ENTITY")
export interface IAtlasShellEntity
{
    get childrenType():string[]
    addType(type:string):void 
}
@Directive({
  selector: 'atlas-shell-enity',
  providers:[{provide:ATLAS_SHELL_ENTITY,useExisting:forwardRef(()=>AtlasShellEntityDirective)}],
  standalone: false,
  exportAs:'parentEntity'
})
export class AtlasShellEntityDirective implements OnInit,IAtlasShellEntity{
  entityType = input<string>("")
  childrenType:string[] = []
  constructor(private shellFactory:AtlasShellEntityFactoryService,
             @SkipSelf() @Optional() @Inject(ATLAS_SHELL_ENTITY) private parentEntity:AtlasShellEntityDirective ) { 

    effect(()=>this.createtOrActivate(this.entityType()))
  }   
  addType(type: string): void {
    this.childrenType = [...this.childrenType,type]
  }
  ngOnInit(): void {
      
  }
  createtOrActivate(type:string){
      let ret = "Create"
      if (this.parentEntity)
      { 
        console.log("ATLAS_SHELL_ENTITY_DIRECTIVE",this.parentEntity)  
        if (this.parentEntity.childrenType.filter(ctype=>ctype==type).length>0)
          ret="Activate"
        else
          this.parentEntity.addType(type)
        
      
      }
      
      console.log("ATLAS_SHELL_ENTITY_DIRECTIVE",ret,type,this.parentEntity)

  }
  

}
