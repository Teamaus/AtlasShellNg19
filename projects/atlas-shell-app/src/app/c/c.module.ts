import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRoutingModule } from './c-routing.module';
import { CComponent } from './c/c.component';
import { CO1Component } from './co1/co1.component';
import { cReducer } from './c/c.reducer';

import {  AtlasShellEntityDirective, AtlasShellUIModule, ShellActionService, ShellEntityModule } from 'atlas-shell-ui';
import { EffectsModule } from '@ngrx/effects';
import { EffectService } from '../effect.service';
import { AtlasSignatureModule } from '../atlas-signature/atlas-signature.module';
import { DocService } from '../doc.service';
import { AtlasShellWfModule } from 'atlas-shell-wf';
import { ConditionDirective } from '../wf_op/condition.directive';
import { ShowDirective } from '../wf_op/show.directive';
import { Show2Directive } from '../wf_op/show2.directive';
import { Show3Directive } from '../wf_op/show3.directive';
import { Co12Component } from './co1/co12/co12.component';
import { Co13Component } from './co1/co13/co13.component';
import { Co2Component } from './co2/co2.component';




@NgModule({
  declarations: [
    CComponent,
    CO1Component,
    ConditionDirective,
    ShowDirective,
    Show2Directive,
    Show3Directive,
    Co12Component,
    Co13Component,
    Co2Component
    
  ],
  imports: [
    CommonModule,
    AtlasShellWfModule,
    ShellEntityModule.feature("COP", { "cData": cReducer }),
    EffectsModule.forFeature([EffectService]),
    CRoutingModule,
    ShellEntityModule
],  
   
    providers:[ShellActionService,DocService]

 
})
export class CModule { 
  
  
  
}
