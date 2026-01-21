import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CO1Component } from './co1/co1.component';
import { CComponent } from './c/c.component';
import { CShellComponent } from '../cshell/cshell.component';
import { BComponent } from '../b/b.component';
import { Co12Component } from './co1/co12/co12.component';
import { Co13Component } from './co1/co13/co13.component';
import { Co2Component } from './co2/co2.component';


const routes: Routes = [
  
  {path:'',component:CShellComponent,children:[
    
    {path:'',component:CComponent,
    children:[//{path: '', redirectTo: 'CO1', pathMatch: 'full'},
    {path:'CO1',component:CO1Component,children:[{path:'CO12',component:Co12Component},{path:'CO13',component:Co13Component}]},
    
    
  {path:"B1",component:BComponent},
  {path:"CO2",component:Co2Component}]},
 
                                
  ]}
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRoutingModule { }
