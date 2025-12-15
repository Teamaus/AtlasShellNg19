import { InjectionToken } from "@angular/core"

export interface IAtlasReuseStrategyV19
{
	CloseNav(url:string):void 
	SaveNav(url:string):void 

}
export const REUSE_STRATEGY = new InjectionToken("REUSE_STRATEGY")

