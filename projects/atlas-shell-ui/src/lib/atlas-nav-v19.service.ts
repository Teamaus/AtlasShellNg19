

import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { NavUtilsV19Service } from './nav-utils-v19.service';

import { PathStateV19Service } from './path-state-v19.service';
import { IAtlasReuseStrategyV19, REUSE_STRATEGY } from './contracts/IAtlasReuseStrategyV19';

@Injectable()
export class AtlasNavV19Service {
  
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
    private navUtil:NavUtilsV19Service,private pathStateServie:PathStateV19Service,
  @Optional() @Inject(REUSE_STRATEGY)private myReuseStrategy:IAtlasReuseStrategyV19) { }
  setSaveRoute(save:boolean){
    this.router.events.pipe(
      filter(event=>event instanceof NavigationEnd),
      take(1)

    ).subscribe(event=>
    {
      const activeSnapshot = this.navUtil.getCurrentActivatedRouteSnapshot(this.router.routerState.root.snapshot,this.activatedRoute.outlet)
      console.log("The key will be ",event.url,event.type,this.navUtil.getURLfromSnapshotWithOutlet(activeSnapshot))
      
      this.pathStateServie.setPathState(this.activatedRoute.snapshot,event.url)
      
      if (save)this.myReuseStrategy.SaveSnapshot(activeSnapshot)
      console.log("PATH STATE:",this.pathStateServie.pathState)
    
    })
    
    
    
  }
  Close_(op:string,outlet:string,activeRoute:ActivatedRoute)
  {
    const url = this.navUtil.getFutureUrl(activeRoute.snapshot,op,activeRoute.outlet)
    this.myReuseStrategy.CloseNav(url)
    console.log("REUSE:Close",this.myReuseStrategy)
  
  }
  
  Close(op:string,outlet:string)
  {
    
    this.Close_(op,outlet,this.activatedRoute) 
  }
  Nav_(op:string,outlet:string,activeRoute:ActivatedRoute,save = true)
  {
      this.setSaveRoute(save)
    
    const value = outlet==""?[op]:[{outlets:{[outlet]:op}}]
    
    const navUrl = this.pathStateServie.getPathState(this.activatedRoute.snapshot,this.navUtil.navValue(value))
    if (!navUrl)
    {
    
      this.router.navigate(value,{relativeTo:activeRoute})
    }
    else
    {
    
      this.router.navigateByUrl(navUrl)
    }  
  }
  Nav(op:string,outlet:string,save = true)
  {
    this.Nav_(op,outlet,this.activatedRoute,save)
    /*this.setSaveRoute(save)
    
    const value = outlet==""?[op]:[{outlets:{[outlet]:op}}]
    
    const navUrl = this.pathStateServie.getPathState(this.activatedoute.snapshot,this.navUtil.navValue(value))
    if (!navUrl)
    {
    
      this.router.navigate(value,{relativeTo:this.activatedoute})
    }
    else
    {
    
      this.router.navigateByUrl(navUrl)
    }*/

  }
}

