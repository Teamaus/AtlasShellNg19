import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRoute, RouteReuseStrategy, Router, Routes } from '@angular/router';

import { atlas_log } from 'atlas-utils';
import { AtlasShellReuseStrategy } from './atlas-reuse-strategy';


@Injectable({
  providedIn: 'root'
})
export class AtlasShellRoutingService {

  initialConfig:Routes
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
    @Optional() @Inject(RouteReuseStrategy) private routeResueStrategy:AtlasShellReuseStrategy) { 
   
    this.initialConfig = [...this.router.config]
    this.router.resetConfig(this.router.config)
    console.log("REUSESTRATEGY ",this.routeResueStrategy)
   
    
  }
  rootOutlet(tab:string):string{
    return "root_"+tab
  }
  AddEntry(entry:string){
        let config = this.initialConfig.map(route=>{return {...route,outlet:entry,data:{rootCategory:entry}}})
       // this.router.config = [...this.router.config,...config]
        //this.router.resetConfig(this.router.config)
        this.router.config.push(...config)
        
  }
  RemoveEntry(entry:string){
      let config = this.router.config.filter(r=>r.outlet!=entry)
      this.router.resetConfig(config)

  }
  navigate(value:any,extras?:any|undefined){
    let routedValue = value
    if (this.routeResueStrategy)
    {
      let pathState = ((this.routeResueStrategy) as any).pathState
      console.log("PATHSTATE",pathState)
      routedValue = pathState.get(value)?pathState.get(value):value
      console.log("URL2",routedValue)
    }
    if (extras)
      this.router.navigate(routedValue,extras)
    else
    this.router.navigate(routedValue)

  }
  _navigate(entityID:string,rootEntity:string){
    let outlet = this.rootOutlet(rootEntity)
  
    this.navigate([{outlets:{[outlet]:[entityID]}}])
    
  }
  
}
