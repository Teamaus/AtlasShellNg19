import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';
import { A1Component } from './a1/a1.component';
import { A2Component } from './a2/a2.component';
import { RouteReuseStrategy } from '@angular/router';
import { MyReuseStrategyService } from './my-reuse-strategy.service';
import { NavService } from './nav.service';
import { BComponent } from './b/b.component';
import { REUSE_STRATEGY } from './contracts/iMyReuseStrategy';

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
  providers: [{provide:RouteReuseStrategy,useClass:MyReuseStrategyService}
              ,{provide:REUSE_STRATEGY,useExisting:RouteReuseStrategy}
              ,NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
