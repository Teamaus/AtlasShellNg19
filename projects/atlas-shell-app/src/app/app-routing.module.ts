import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BComponent } from './b/b.component';
import { AComponent } from './a/a.component';
import { O2Component } from './o2/o2.component';
import { O1Component } from './o1/o1.component';
import { O3Component } from './o3/o3.component';
import { O0Component } from './o0/o0.component';


const routes: Routes = [
  {path:"A/:entity",component:AComponent,children:[
    {path:"O0",component:O0Component},
    {path:"O1",component:O1Component},
    {path:"O2",component:O2Component}

  ]},
  {path:"B",component:BComponent,outlet:"root_XXXX",children:[
    {path:"O3",component:O3Component,outlet:"info"},
    {path:"O3/:entity",component:O3Component,outlet:"info"}
    
  ]},
  {path:"C",loadChildren:()=>import('../app/c/c.module').then(m=>m.CModule),outlet:"root_XXXX"},
  {path:"D/:entity",loadChildren:()=>import('../app/d/d.module').then(m=>m.DModule),outlet:"root_XXX"},
 

  
];
const appRoutes: Routes = [];
@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
