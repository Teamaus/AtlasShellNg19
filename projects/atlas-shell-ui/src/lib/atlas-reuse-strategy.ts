import { ComponentRef, Inject, InjectionToken, Optional } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, DetachedRouteHandle, NavigationEnd, Router, RouteReuseStrategy } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { filter, tap } from "rxjs/operators";
export const ATLAS_ENTITIES_USE_REUSESTRATEGY = new InjectionToken<any>("ATLAS_ENTITIES_USE_REUSESTRATEGY")
export const ATLAS_ALL_ENTITIES = "ALL"
export function AtlasCreateReuseStrategy(useEntities:string[],router:Router){
	console.log("=>>>>",useEntities)
	return new AtlasShellReuseStrategy(useEntities)
  }
export type NavMode = "ENTITY"|"URL"

export class AtlasShellReuseStrategy implements RouteReuseStrategy{
	
	navMode :NavMode = "URL" 
	entityType:string =""
	entityTypes:string[] = []
	savedRoutes :{[key:string]:any} = {}
	activatedRoute$ = new Subject<ActivatedRoute|undefined>()
	setSavedValue(value:any,save:boolean){
		
		const key = this.getKey(value)

		this.savedRoutes[key] = save
		
		
		if (!save){
			console.log("CLOSE:",value,key )
			const childKeys = this.pathState.getChildKeys(key)
			this.pathState.delete(key)
			delete this.savedRoutes[key]
			const handler = this.routeStore.get(key) 
			let comp = handler?(handler as any).componentRef:handler
			//if (comp) comp.Destroy()
			console.log("COMPREF YUP:",comp)
			//if (comp) comp.destroy()
			this.routeStore.delete(key)
			console.log("CLOSE routestore:",this.routeStore)
			childKeys.forEach(childKey=>
			{
				console.log("try to Remove Children",childKey )
				this.setSavedValue([childKey],false)
			})
				
					
		}
		
	}
	getActivatedRoute$():Observable<ActivatedRoute|undefined>{
		return this.activatedRoute$
	}
	currentShellActionActivatedRoute:ActivatedRoute|undefined  
	setEntityType(entityType:string){
		this.entityTypes = [entityType,...this.entityTypes]
		this.navMode = "ENTITY"
	}
	setKey(path:string,outlet:string){
		console.log("SETKEY:",path,path.split("/:")[0],outlet)
		return path.split("/:")[0]+":"+outlet
	}
	getKey(value:any){
		let outlet = "primary"
		console.log("OUTLETS",value)
		let obj = value[0].outlets
		let retval = value[0]+":"+outlet
		if (obj){
			outlet = Object.keys(obj)[0]
			console.log("GETKEY:",obj[Object.keys(obj)[0]][0])
			retval = obj[Object.keys(obj)[0]][0]+":"+outlet	
		}
		return retval

	}
	
	constructor(@Optional()@Inject(ATLAS_ENTITIES_USE_REUSESTRATEGY)private entitiesUsingStrategy:any)
	{
	}
	isReuseStrategyEntity(operation:string){
		console.info("IS REUSE STRATEGY:",operation,this.entitiesUsingStrategy)
		let retval = false
		if (this.entitiesUsingStrategy)
			retval =  this.entitiesUsingStrategy.includes(operation)||this.entitiesUsingStrategy.includes(ATLAS_ALL_ENTITIES)
		console.info("IS REUSE STRATEGY:",retval)
		return retval  
			
	}
	
	getOperation(route:ActivatedRouteSnapshot):string{
		let retval = "NONE"
		if (route.url.length != 0 )
			retval =  route.url[0].path
		else
		{
			if (route.parent)
				retval =  this.getOperation(route.parent)
		}
	
		console.log("GET OPERATION ",retval )
		return retval 
	}
	getEntityOperation(action:"SHOULD_ATTACH"|"SHOULD_DETACH"):string{
		let retval = this.entityType
		if (this.navMode == "ENTITY"){
			retval = action=="SHOULD_ATTACH"?this.entityTypes[0]:this.entityTypes[1]
		}
		return retval 
	}
	getSave(route: ActivatedRouteSnapshot):boolean{
	
		if (route.routeConfig){
			if (route.routeConfig.path){
				const key = this.setKey(route.routeConfig.path,route.outlet)
				console.log("get save key",key)
				let parentSave = true
				if (route.parent?.routeConfig?.path)
				{
					console.log("get save parent")
					parentSave = this.getSave(route.parent)
					
					/*if (!parentSave){	
						
						for (var child of route.parent.children)
						{
							
							const key = this.setKey(child.routeConfig?.path as string,child.outlet)
							console.log("Destroy Children set save:",child,key)

							this.setSavedValue(key,false)
						}
					}*/
					
				}
				console.log("get save:",parentSave,this.savedRoutes[key],key)
				return parentSave&&this.savedRoutes[key]?true:false 
			}
		
		}
		return false
	}
	
	
	shouldDetach(route: ActivatedRouteSnapshot): boolean {
		
		let retval = this.isReuseStrategyEntity(this.getEntityOperation("SHOULD_DETACH"))
		
		retval = retval && this.getSave(route) 
		console.warn("SHOULD DETACH:",retval,this.getSave(route) ,route.routeConfig?.path,route.component)
		return retval
	}
	private routeStore = new Map<string, DetachedRouteHandle>();
	private pathState = new PathState(this)
	
	store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
		console.warn("REUSE:STORE...1")
		if (handle==null)
			return
		if (route.routeConfig)
			if (route.routeConfig.path)
			{	
				console.warn("REUSE:STORE...2",route.routeConfig.path,route.outlet,handle)
				this.routeStore.set(this.setKey(route.routeConfig.path,route.outlet), handle)
				this.pathState.set(this.setKey(route.routeConfig.path,route.outlet),route)
				let instance = (handle as any).componentRef.instance
				
				if (instance["sleep"]){
					instance.sleep() 

				}
				
				
			}
		
  	}
	shouldAttach(route: ActivatedRouteSnapshot): boolean {

		const path = route!.routeConfig!.path;
		let retval = false
		
		let reuse = this.entityTypes.length>0?this.isReuseStrategyEntity(this.getEntityOperation("SHOULD_ATTACH")):true
		
		if (path && reuse)
		{
			
			retval = this.routeStore.get(this.setKey(path,route.outlet)) != undefined
			
			const key = this.setKey(path,route.outlet)
			this.pathState.set(key,route)
		}
		console.warn("SHOULD ATTACH",retval,this.getSave(route),path,route.component)
		return retval && this.getSave(route) 
		
	}
	retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
		
		const path = route!.routeConfig!.path;
		let retval = null 
		if (path)
		{
			retval = this.routeStore.get(this.setKey(path,route.outlet))
			if  (retval){
				console.log("Retreive I0",retval)
				return retval
			}
			else{
				console.log("Retreive I1")
				return null
			}
		}
		else 
		{
			console.log("Retreive I2")
			return null
		}
	}
	shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
		return future.routeConfig === curr.routeConfig;
	 }
}
export interface IPathState{
	get(key:string):string | undefined
	set(key:string,route:ActivatedRouteSnapshot):void
	delete(key:string):void 
	getChildKeys(key:string):string[] 
}
export class PathState implements IPathState{
	
	constructor(private reuse:AtlasShellReuseStrategy){

	}
	getChildKeys(key: string): string[] {
		const ar = this.pathState.get(key)
		let  retval :string[]= []
		if (ar)
		{
			if (ar.routeConfig?.children)
				retval =  ar.routeConfig.children.filter(child=>child.path!=undefined).map(child=>child.path) as string[]
		}
		return retval  
	}
	getRouteUrl(route:ActivatedRouteSnapshot | undefined | null){
		//Will change this 
		return (route as any)._routerState.url 
	}
	set(key: string, route: ActivatedRouteSnapshot): void {
		this.pathState.set(key,route)
		route.children.forEach(
			child=>{
				if (child.routeConfig)
					if (child.routeConfig.path)
						this.set(this.reuse.setKey(child.routeConfig.path,child.outlet),child)
			}
		)
		
	}
	delete(key: string) {
		
		const ar = this.pathState.get(key)
		
		//console.log("===Component",((ar?.component) as any).name,this.getRouteUrl(ar),key)

		console.log("===Component",ar?.routeConfig?.children)
		this.pathState.delete(key)
	}
	get(key: string): string |undefined  {
		
		const ar = this.pathState.get(key)
		
		//Need to update that so we wont use private 
		
		const retval =  ar?this.getRouteUrl(ar):ar
		return retval
		
	}

	private pathState = new Map<string,ActivatedRouteSnapshot>()
	logPathState():void
	{
		console.log("******PathState Begin*****")
		console.log(this.pathState)
		this.pathState.forEach(state=>console.log("******PathState:",state))
		console.log("******PathState end*****")
	}

	
}