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
//Create a reuse strategy that will save the route based on path and entity type 
//We will create a new class and will change the whole concept 

export class AtlasShellReuseStrategy implements RouteReuseStrategy{
	
	navMode :NavMode = "URL" 
	entityType:string =""
	entityTypes:string[] = []
	savedRoutes :{[key:string]:any} = {}
	savedRoutes_2:{[key:string]:any}={}
	activatedRoute$ = new Subject<ActivatedRoute|undefined>()
	saveRoute(value:any,snapshot:ActivatedRouteSnapshot){
		this.pathState.set(value,snapshot)
		this.savedRoutes[value] = true
		console.log("SNAPSHOTURL:",value)
		this.savedRoutes_2[value]=true

	}
	closeRoute(value:any){
		this.savedRoutes[value] = false

	}

	setSavedValue(value:any,save:boolean){
		
		const key = this.getKey(value)
		
		this.savedRoutes[key] = save
		
		console.log("SETSAVEDVALUE:",value,save,key,this.savedRoutes )
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
		console.log("SETKEY:",path,path.split("/")[0],outlet)
		return path+":"+outlet
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
	entityFromPath(path:string):string
	{
		return path.split("/")[0]
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
	getRootRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
		if (route.parent==route.root) {
			return route;
		}
		return this.getRootRoute(route.parent!);

	}
	getSave(route: ActivatedRouteSnapshot):boolean{
	
		const routeRoot = this.getRootRoute(route)
		const path = routeRoot.routeConfig?.path
		
		if (!path)
			throw new Error("No path in route config")
		const key = this.setKey(path,routeRoot.outlet)
		console.log("GET SAVE PATH:>>",path,"key:",key,this.savedRoutes,this.pathState,route.routeConfig?.path)
		
		return this.savedRoutes[key]?true:false
		/*
		if (route.routeConfig){
			if (route.routeConfig.path){
				const key = this.setKey(route.routeConfig.path,route.outlet)
				console.log("get save key",key)
				let parentSave = true
				if (route.parent?.routeConfig?.path)
				{
					console.log("get save parent")
					parentSave = this.getSave(route.parent)
					
					
				}
				console.log("get save:",parentSave,this.savedRoutes[key],key)
				return parentSave&&this.savedRoutes[key]?true:false 
			}
		
		}
		return false*/
	}
	
	getPath(route:ActivatedRouteSnapshot):string{
		
		let outlet="primary"
		let retval = ""
		if (route.routeConfig!=null)
		{
				
				retval = route.routeConfig?.path+","+route.component?.name
				if (route.parent)
				{
				if (route.parent!=route.root)
					{
						retval=this.getPath(route.parent)+retval+"/"
					}
					else
					{
						retval = "/:"+route.outlet+"/"+this.getPath(route.parent)+retval+"/"
					}				
				}
		}
		
		return retval
	}
	shouldDetach(route: ActivatedRouteSnapshot): boolean {
		
		let retval = this.isReuseStrategyEntity(this.getEntityOperation("SHOULD_DETACH"))
		console.warn("SHOULD DETACH:>>",this.savedRoutes_2,route.url.join(","))

		retval = retval && this.getSave(route) 
		
		return retval
	}
	private routeStore = new Map<string, DetachedRouteHandle>();
	private pathState = new PathState(this)
	
	store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
		console.warn("SHOULD DETACH: REUSE:STORE...1",route.routeConfig)
		if (handle==null)
			return
		/*if (route.routeConfig)
			if (route.routeConfig.path)
			{	
				console.warn("REUSE:STORE...2",route.routeConfig.path,route.outlet,handle)
				this.routeStore.set(this.setKey(route.routeConfig.path,route.outlet), handle)
				this.pathState.set(this.setKey(route.routeConfig.path,route.outlet),route)
				let instance = (handle as any).componentRef.instance
				
				if (instance["sleep"]){
					instance.sleep() 

				}
				
				
			}*/
			
			const path = this.getPath(route)
		
			this.routeStore.set(this.setKey(path,route.outlet), handle)
			this.pathState.set(this.setKey(path,route.outlet),route)
			let instance = (handle as any).componentRef.instance
				
			if (instance["sleep"]){
				instance.sleep() 

			}
			console.log("STORE PATH:>>",path,"handele:",handle,"route store:",this.routeStore)
			
				
		
  	}
	shouldAttach(route: ActivatedRouteSnapshot): boolean {

		const rootRoute = this.getRootRoute(route)
		const rootPath = rootRoute.routeConfig?.path?rootRoute.routeConfig?.path:""
		const path = this.getPath(route)//route!.routeConfig!.path;
		

		console.log("SHOULD ATTACH PATH:>>",rootPath,"route-config:",route.routeConfig)

		let retval = false
		
		let reuse = this.entityTypes.length>0?this.isReuseStrategyEntity(this.getEntityOperation("SHOULD_ATTACH")):true
		if (route==route.root)
			return false
		if (path && reuse)
		{
			
			retval = this.routeStore.get(this.setKey(path,route.outlet)) != undefined
			
			const key = this.setKey(rootPath,rootRoute.outlet)
			this.pathState.set(key,route)
			console.log("SHOULD ATTACH RETVAL:",retval,key)
		}
		console.warn("SHOULD ATTACH",retval,this.getSave(route),path,route.component)
		return retval && this.getSave(route) 
		
	}
	retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
		
		const path = this.getPath(route)//route!.routeConfig!.path;
		console.log("Retreive:",path)
		let retval = null 
		if (path)
		{
			retval = this.routeStore.get(this.setKey(path,route.outlet))
			if  (retval){
				console.log("Retreive I0",retval,"===>>",route.component?.name)
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

	getURLfromSnapshotWithOutlet(route: ActivatedRouteSnapshot): string {
  		const chain = route.pathFromRoot;

  		const path = chain
    		.map(r => r.url.map(s => s.path).join('/'))
    		.filter(p => p.length > 0)
    		.join('/');

  		const outletSnap = chain.find(r => r.outlet && r.outlet !== 'primary');
  		if (!outletSnap) {
    		return '/' + path;
  		}

  		return `/(${outletSnap.outlet}:${path})`;
	}

	getRouteUrl(route:ActivatedRouteSnapshot | undefined | null){
		//Will change this 
		//return (route as any)._routerState.url 
		return this.getURLfromSnapshotWithOutlet(route as ActivatedRouteSnapshot)
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