import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';




import {  AtlasShellUIModule,  ATLAS_ENTITIES_USE_REUSESTRATEGY, AtlasCreateReuseStrategy } from 'atlas-shell-ui';
import { EffectsModule } from '@ngrx/effects';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';



type slices = "shell" | "doc"
@NgModule({
  declarations: [
      AppComponent
     ],
  
  imports: [
    BrowserModule,
    
    ReactiveFormsModule,
    AtlasShellUIModule.forRoot<slices>("shell","doc"),
    EffectsModule.forRoot(),
   // AtlasShellWfModule
    
    
  ],
    
  
  bootstrap: [AppComponent]
})
export class AppModule { }
