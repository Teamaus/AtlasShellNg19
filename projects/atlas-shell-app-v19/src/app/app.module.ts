import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtlasShellEntityDirective, AtlasShellUIModule, ShellEntityModule } from 'atlas-shell-ui';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AtlasShellUIModule.forRoot("shell") ,
    ShellEntityModule.root()
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
