import { Directive, forwardRef } from '@angular/core';
import { ATLAS_SHELL_ENTITY, IAtlasShellEntity } from 'atlas-shell-ui';

@Directive({
  selector: 'atlas-shell-root',
  standalone: false,
  providers:[{provide:ATLAS_SHELL_ENTITY,useExisting:forwardRef(()=>AtlasShellRootDirective)}],
  exportAs:"atlasShellRoot"
})
export class AtlasShellRootDirective implements IAtlasShellEntity {
  _childrenType :{[key:string]:string[]}={}
  activeType = ""
  constructor() { }
  get childrenType(): string[] {
    if (this.activeType!="")
    {
       return this._childrenType[this.activeType]
    }
    throw new Error("Not active type")
  }
  addType(type: string): void {
    console.log("ADDTYPE:",type)
    this._childrenType[this.activeType] = [...this._childrenType[this.activeType],type]
    console.log("ADDTYPE",this._childrenType)
  }
  setActiveType(type:string){
    if (!this._childrenType[type])
    {
        this._childrenType[type] = [] 
    }
    this.activeType = type
  }
}
