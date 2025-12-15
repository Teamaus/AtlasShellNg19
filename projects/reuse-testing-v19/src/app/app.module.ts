import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';
import { A1Component } from './a1/a1.component';
import { A2Component } from './a2/a2.component';
import { RouteReuseStrategy } from '@angular/router';


import { BComponent } from './b/b.component';

import { ATLAS_ENTITIES_USE_REUSESTRATEGY, AtlasCreateReuseStrategy, AtlasNavV19Service, AtlasReuseStrategyV19Service, NavUtilsV19Service, REUSE_STRATEGY } from 'atlas-shell-ui';

@NgModule({
  declarations: [
    AppComponent,
    AComponent,
    A1Component,
    A2Component,
    BComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide:RouteReuseStrategy,useClass:AtlasReuseStrategyV19Service}
              ,{provide:REUSE_STRATEGY,useExisting:RouteReuseStrategy}
              ,AtlasNavV19Service
            
            ,{provide:ATLAS_ENTITIES_USE_REUSESTRATEGY,useValue:["A","A1","A2"]},
                {
                provide: RouteReuseStrategy,
                useFactory:AtlasCreateReuseStrategy,
                deps:[ATLAS_ENTITIES_USE_REUSESTRATEGY,NavUtilsV19Service]
                },],
  bootstrap: [AppComponent]
})
export class AppModule { }



