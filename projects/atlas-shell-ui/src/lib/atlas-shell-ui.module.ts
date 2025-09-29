import { ModuleWithProviders, NgModule } from '@angular/core';
import { AtlasShellUIComponent } from './atlas-shell-ui.component';
import { AtlasShellAddEntityComponent } from './atlas-shell-add-entity/atlas-shell-add-entity.component';
import { AtlasShellEntityPanelComponent } from './atlas-shell-entity-panel/atlas-shell-entity-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AtlasContainerComponent } from './atlas-container/atlas-container.component';
import { AtlasRouterOutletAdapterDirective } from './atlas-router-outlet-adapter.directive';
import { AtlasShellRootEntityPanelComponent } from './atlas-shell-root-entity-panel/atlas-shell-root-entity-panel.component';
import { AtlasShellAddEntityV2Component } from './atlas-shell-add-entity-v2/atlas-shell-add-entity-v2.component';
import { RouterModule } from '@angular/router';
import { AtlasShellEntityMediatorComponent } from './atlas-shell-entity-mediator/atlas-shell-entity-mediator.component';
import { StoreModule } from '@ngrx/store';
import { ATLAS_SHELL_ROOT_TOKENS, ATLAS_SHELL_TOKEN, entityTreeReducer, metaReducers } from 'atlas-shell-logic';
import { ShellEntityModule } from './shell-entity/shell-entity.module';
import { TestComponent } from './test/test.component';
import { CompElementDirective } from './comp-element.directive';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { C1Component } from './c1/c1.component';
import { WfStepDirective } from './wf-step.directive';
import { WfElementComponent } from './wf-element/wf-element.component';
import { Show2Directive } from './show2.directive';
import { RouterOutletAdapterComponent } from './router-outlet-adapter/router-outlet-adapter.component';
import { AtlasShellEntityDirective } from './atlas-shell-entity.directive';


function rootReducers<T extends string>(slices:Array<T>){
  
  let retval =  slices.reduce((retval:any,slice)=>{return {...retval,[slice as string]:entityTreeReducer(slice as string)}},{})
  return retval 
}


@NgModule({
  declarations: [
    AtlasShellUIComponent,
    AtlasShellAddEntityComponent,
    AtlasShellEntityPanelComponent,
    AtlasContainerComponent,
    AtlasRouterOutletAdapterDirective,
    AtlasShellRootEntityPanelComponent,
    AtlasShellAddEntityV2Component,
    AtlasShellEntityMediatorComponent,
    TestComponent,
    CompElementDirective,
    AComponent,
    BComponent,
    C1Component,
    WfStepDirective,
    WfElementComponent,
    Show2Directive,
    RouterOutletAdapterComponent,
    
    

   ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot([]),
    //StoreModule.forRoot({shell:entityTreeReducer("shell")},{metaReducers}),
    StoreModule.forRoot(ATLAS_SHELL_ROOT_TOKENS,{metaReducers}),
    ShellEntityModule.root()
    

  
    
  ],
  exports: [
    AtlasShellUIComponent,
    AtlasShellAddEntityComponent,
    AtlasShellEntityPanelComponent,
    AtlasContainerComponent,
    AtlasShellRootEntityPanelComponent ,
    AtlasShellAddEntityV2Component,
    AtlasShellEntityMediatorComponent,
    RouterOutletAdapterComponent,
    AtlasShellEntityDirective


  ],
  //Here we add provider .....
  providers:[{provide:ATLAS_SHELL_TOKEN,useValue:"shell"}]
})
export class AtlasShellUIModule { 

  static forRoot<T extends string>(...rootSlices:Array<T>):ModuleWithProviders<AtlasShellUIModule>{
        return {
          ngModule:AtlasShellUIModule,
          providers:[{provide:ATLAS_SHELL_ROOT_TOKENS,useValue:rootReducers(rootSlices)}]
        }
  }
}
