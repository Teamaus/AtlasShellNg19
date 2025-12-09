import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { NavService } from './nav.service';
import { NavUtilService } from './nav-util.service';
import { IMyReuseStrategy } from './contracts/iMyReuseStrategy';

@Injectable({
  providedIn: 'root'
})
export class MyReuseStrategyService extends RouteReuseStrategy implements IMyReuseStrategy {
  routeStorage : {[url:string]:DetachedRouteHandle} = {}
  saved :{[url:string]:boolean} = {}
  pathState:{[url:string]:string} = {}
  constructor(private navUtil:NavUtilService){
    super()
  }
  CloseNav(url: string): void {
    this.saved[url] = false
  }
  SaveNav(url: string): void {
    this.saved[url] = true
  }
  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
     
      const url = this.navUtil.getURLfromSnapshotWithOutlet(route)
       console.log("Shoule Detach",url,this.saved[url])
      return this.saved[url]
      
  }
  override store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    const url = this.navUtil.getURLfromSnapshotWithOutlet(route)
     console.log("MyReuseStrategyService Store:",url)
    if (handle!=null)
      this.routeStorage[url] = handle
  }
  
  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
      const url = this.navUtil.getURLfromSnapshotWithOutlet(route)
      const pUrl = this.navUtil.getURLfromSnapshotWithOutlet(route.root)
      console.log("MyReuseStrategyService Should Attach:",url,pUrl,this.saved)
      const retval = (this.routeStorage[url]!=undefined) && this.saved[url]
      return retval
  }
  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const url = this.navUtil.getURLfromSnapshotWithOutlet(route)
    const handle = this.routeStorage[url]
    return handle?handle:null 
  }
  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {

    const fUrl = this.navUtil.getURLfromSnapshotWithOutlet(future)
    const cUrl = this.navUtil.getURLfromSnapshotWithOutlet(curr)

    
    const retval = (fUrl==cUrl)
      return retval
  }

  
}
