import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DRoutingModule } from './d-routing.module';
import { DComponent } from './d/d.component';
import { ShellEntityModule } from 'atlas-shell-ui';
import { DReducer } from './d.reducer';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DComponent
  ],
  imports: [
    CommonModule,
    DRoutingModule,
    ReactiveFormsModule,
    ShellEntityModule.feature("DOP",DReducer)
  ]
})
export class DModule { }
