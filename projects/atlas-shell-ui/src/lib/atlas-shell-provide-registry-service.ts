import { Type } from "@angular/core";
import { AtlasShellRegistryService } from "atlas-shell-logic";
import { AtlasShellEntityService } from "./atlas-shell-entity.service";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

export function createRegisteredService<T>(serviceType:Type<T>)
{
	return (registryService:AtlasShellRegistryService,shellEntityService:AtlasShellEntityService,store:Store<any>,...args:any)=>
	
	{
		let params = []
		console.log("createRegisteredService=>>>",registryService,shellEntityService,args)
		let retval = new serviceType(shellEntityService,store,...args)
		
		shellEntityService.entity$().subscribe(
			
			entity=>{
				console.log("ENTITY$2==>>",entity)
			registryService.registerInstance(entity.id,retval)
			}
		)
		
		return retval 
	}
}
export function AtlasProvideRegistryService<T>(serviceType:Type<T>,...deps:Type<any>[]){
	let retval = {provide:serviceType,useFactory:createRegisteredService(serviceType),deps:[AtlasShellRegistryService,AtlasShellEntityService,Store,...deps]}
	console.log("REGISTRY",retval)
	return retval
}

export function AtlasShellSelect(shellEntityService:AtlasShellEntityService,obs:Observable<any>):Observable<any>
{
	return shellEntityService.entity$().pipe(
		switchMap(entity=>obs)
	)
}