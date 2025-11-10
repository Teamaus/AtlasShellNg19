import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BComponent } from './b/b.component';
import { AComponent } from './a/a.component';
import { O1Component } from './o1/o1.component';
import { O2Component } from './o2/o2.component';
import { O3Component } from './o3/o3.component';
import { AtlasShellUIModule, ShellEntityModule, ATLAS_ENTITIES_USE_REUSESTRATEGY, AtlasCreateReuseStrategy, 
 } from 'atlas-shell-ui';
import { AtlasEntitiesPanelComponent } from './atlas-entities-panel/atlas-entities-panel.component';
import { AtlasRootEntityComponent } from './atlas-root-entity/atlas-root-entity.component';
import { AtlasAddEntityComponent } from './atlas-add-entity/atlas-add-entity.component';
import { AtlasEntityMediatorComponent } from './atlas-entity-mediator/atlas-entity-mediator.component';
import { EffectsModule } from '@ngrx/effects';
import { CShellComponent } from './cshell/cshell.component';
import { RouteReuseStrategy } from '@angular/router';

import { KesemDirective } from './kesem.directive';
import { O0Component } from './o0/o0.component';
import { AtlasShellWfModule } from 'atlas-shell-wf';
import { ConditionDirective } from './wf_op/condition.directive';
import { ShowDirective } from './wf_op/show.directive';
import { Show2Directive } from './wf_op/show2.directive';
import { Show3Directive } from './wf_op/show3.directive';
import { MyTestDirective } from './my-test.directive';
import { DirTestComponent } from './dir-test/dir-test.component';
import { AtlasShellRootDirective } from './atlas-shell-root.directive';


type slices = "shell" | "doc"
@NgModule({
  declarations: [
    AppComponent,
    BComponent,
    AComponent,
    O1Component,
    O2Component,
    O3Component,
    AtlasEntitiesPanelComponent,
    AtlasRootEntityComponent,
    AtlasAddEntityComponent,
    AtlasEntityMediatorComponent,
    CShellComponent,
    KesemDirective,
    O0Component,
    MyTestDirective,
    DirTestComponent,
    AtlasShellRootDirective,
    
    
    
    
    
  ],
  providers: [
    {provide:ATLAS_ENTITIES_USE_REUSESTRATEGY,useValue:["B","O3","C"]},
    {
    provide: RouteReuseStrategy,
    useFactory:AtlasCreateReuseStrategy,
    deps:[ATLAS_ENTITIES_USE_REUSESTRATEGY]
    },
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AtlasShellUIModule.forRoot<slices>("shell","doc"),
    EffectsModule.forRoot(),
    
    ShellEntityModule.root(),
    ShellEntityModule
    
    
   // AtlasShellWfModule
    
    
  ],
    
  
  bootstrap: [AppComponent]
})
export class AppModule { }
