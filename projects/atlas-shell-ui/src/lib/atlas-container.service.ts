import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { goBack, urlLevel } from 'atlas-shell-logic';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class AtlasContainerService {

  currentPath:{[key:string]:string}={}
  private canNav = true
  get URL():string { return this.router.url}
  private syncNavSubject = new Subject()
  private subscribeRouter(router:Router){
    router.events.pipe(
    filter(event=>event instanceof NavigationEnd || event instanceof NavigationCancel )
  ).
  subscribe(
    event=>{
      this.canNav = true
      this.syncNavSubject.next("")
      
    }
  )
  this.router.events.pipe(
    filter(event=>event instanceof NavigationStart)
    
  ).
  subscribe(
    event=>{
        this.canNav = false
      
      
    }
  )
}

private NavTo(path:any){
  if (this.URL==this.router.url)
  {
    console.log("NAVIGATING",this.URL,path)
    this.router.navigate([{outlets:path}],{relativeTo:this.activatedRoute})
  }
  else{
      let relTo = goBack(this.activatedRoute,urlLevel(this.URL))
      this.router.navigate([{outlets:path}],{relativeTo:relTo})
  }
  let key = Object.keys(path)[0]
  this.currentPath[key]=path[key]

}
NavTo2(path:any){
  if (this.canNav){
    this.NavTo(path)
  }
  else{
    this.syncNavSubject.pipe(take(1))
    .subscribe(()=>this.NavTo2(path))
  }
}

constructor(private router:Router,private activatedRoute:ActivatedRoute) 
{
      this.subscribeRouter(router)

}

}
