import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AComponent } from './a/a.component';
import { A2Component } from './a2/a2.component';
import { A1Component } from './a1/a1.component';
import { BComponent } from './b/b.component';

const routes: Routes = [{path:"A",component:AComponent,outlet:"123"
                        ,children:[
                                    {path:"A1",component:A1Component},
                                    {path:"A2",component:A2Component},
                                  ]
                        },
                        {
                          path:"B",component:BComponent,outlet:"123"
                        }]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
