

import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { NavUtilsV19Service } from './nav-utils-v19.service';

import { PathStateV19Service } from './path-state-v19.service';
import { IAtlasReuseStrategyV19, REUSE_STRATEGY } from './contracts/IAtlasReuseStrategyV19';

@Injectable()
export class AtlasNavV19Service {
  
  constructor(private router:Router,private activatedoute:ActivatedRoute,
    private navUtil:NavUtilsV19Service,private pathStateServie:PathStateV19Service,
  @Optional() @Inject(REUSE_STRATEGY)private myReuseStrategy:IAtlasReuseStrategyV19) { }
  setSaveRoute(save:boolean){
    this.router.events.pipe(
      filter(event=>event instanceof NavigationEnd),
      take(1)

    ).subscribe(event=>
    {
      console.log("The key will be ",event.url,event.type)
      this.pathStateServie.setPathState(this.activatedoute.snapshot,event.url)
      if (save)this.myReuseStrategy.SaveNav(event.url)
      console.log("PATH STATE:",this.pathStateServie.pathState)
    
    })
    
    
    
  }
  Close(op:string,outlet:string)
  {
    
    const url = this.navUtil.getFutureUrl(this.activatedoute.snapshot,op,outlet)
    this.myReuseStrategy.CloseNav(url)
    console.log("REUSE:Close",this.myReuseStrategy)
    
  }
  Nav(op:string,outlet:string,save = true)
  {
    this.setSaveRoute(save)
    
    const value = outlet==""?[op]:[{outlets:{[outlet]:op}}]
    
    const navUrl = this.pathStateServie.getPathState(this.activatedoute.snapshot,this.navUtil.navValue(value))
    if (!navUrl)
    {
    
      this.router.navigate(value,{relativeTo:this.activatedoute})
    }
    else
    {
    
      this.router.navigateByUrl(navUrl)
    }

  }
}

