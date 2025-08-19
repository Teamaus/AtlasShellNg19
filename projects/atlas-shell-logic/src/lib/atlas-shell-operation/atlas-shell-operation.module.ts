import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ATLAS_SHELL_TOKEN } from '../atlas-shell.tokens';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
  
})
export class AtlasShellOperationModule { 
    static AtlasShellToken(shell:string):ModuleWithProviders<AtlasShellOperationModule>{
      return {
        ngModule: AtlasShellOperationModule,
        providers: [{provide:ATLAS_SHELL_TOKEN,useValue:shell}]
      };
    }
}

