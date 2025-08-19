import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ATLAS_SHELL_TOKEN } from '../atlas-shell.tokens';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AtlasShellTokenModule {
  static AtlasShellToken(shellSlice:string):ModuleWithProviders<AtlasShellTokenModule>{
    return {
      ngModule: AtlasShellTokenModule,
      providers: [{provide:ATLAS_SHELL_TOKEN,useValue:shellSlice}]
    };
  }
 }
