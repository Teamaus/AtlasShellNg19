import { InjectionToken } from "@angular/core"
import { ActivatedRouteSnapshot } from "@angular/router"

export interface IAtlasReuseStrategyV19
{
	CloseNav(url:string):void 
	SaveNav(url:string):void 
	SaveSnapshot(snapshot:ActivatedRouteSnapshot):void 
	CloseSnapshot(snapshot:ActivatedRouteSnapshot):void 


}
export const REUSE_STRATEGY = new InjectionToken("REUSE_STRATEGY")

