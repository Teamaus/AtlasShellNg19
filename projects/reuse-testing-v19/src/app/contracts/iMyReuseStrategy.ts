import { InjectionToken } from "@angular/core"

export interface IMyReuseStrategy
{
	CloseNav(url:string):void 
	SaveNav(url:string):void 

}
export const REUSE_STRATEGY = new InjectionToken("REUSE_STRATEGY")

