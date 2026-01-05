
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, Router, RouteReuseStrategy } from '@angular/router';
import { NavUtilsV19Service } from './nav-utils-v19.service';
import { IAtlasReuseStrategyV19 } from './contracts/IAtlasReuseStrategyV19';
export const ATLAS_ENTITIES_USE_REUSESTRATEGY = new InjectionToken<any>("ATLAS_ENTITIES_USE_REUSESTRATEGY")
export const ATLAS_ALL_ENTITIES = "ALL"
export function AtlasCreateReuseStrategy_19(useEntities:string[],navUtil:NavUtilsV19Service){
	console.log("=>>>>",useEntities)
	return new AtlasReuseStrategyV19Service(useEntities,navUtil)
  }


@Injectable({
  providedIn: 'root'
})
export class AtlasReuseStrategyV19Service extends RouteReuseStrategy implements IAtlasReuseStrategyV19 {
  routeStorage : {[url:string]:DetachedRouteHandle} = {}
  saved :{[url:string]:boolean} = {}
  
  constructor(@Inject(ATLAS_ENTITIES_USE_REUSESTRATEGY)private useEntities:string[],private navUtil:NavUtilsV19Service){
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

