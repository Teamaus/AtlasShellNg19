import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AtlasShellModalModuleModule { 

  static modals:{[modalName:string]:any} = {} 
  static feature(modalName:string,component:any):ModuleWithProviders<AtlasShellModalModuleModule>{
    this.modals = {...this.modals,[modalName]:component}
      return {
        ngModule:AtlasShellModalModuleModule
      }
  }
}
