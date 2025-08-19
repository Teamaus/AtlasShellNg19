import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle, Router } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  attachToPath:string=""
  pathState:any = {}
  getFullPath(route: ActivatedRouteSnapshot):any{
      var url = (route as any)._routerState.url 
      var urlE = url.split(":")
      var path = urlE[1]
      var outlet = urlE[0]==""?"primary":urlE[0]
      return outlet+":"+path
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log("CRS shouldDetach",route, (route as any)._routerState)
    var fullPath = (route as any)._routerState.url
    
    var key = fullPath.split("/")[1]
    this.pathState[key] = fullPath


    return true
  }
  /*getFullPath(route: ActivatedRouteSnapshot): string {
    const pathFromRoot = route.pathFromRoot;
  
    // Extract the URL segments from each ActivatedRouteSnapshot in the pathFromRoot array
    const segments: string[] = pathFromRoot.map((r: ActivatedRouteSnapshot) => r.url.map(segment => segment.path)).reduce((a, b) => a.concat(b));
  
    // Join the segments to get the full path
    const fullPath: string = segments.join('/');
  
    return fullPath;
  }*/
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getFullPath(route)
   
    var retval = false 
    if (path)
      retval = !!this.routeCache.get(path)
    console.log("CRS shouldAttach",retval,"CACHE",this.routeCache,"PATH",path)
    return retval
    
  }

  routeCache = new Map<string, DetachedRouteHandle>();

  // Determines whether a route should be reused
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    
  
   
    
    let retval = (future.routeConfig == curr.routeConfig)
    console.log("CRS shouldReuseRoute",retval)
    return retval 
   
}

  // Stores the detached route
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    console.log("CRS store",arguments)
    let key = this.getFullPath(route)
    console.log("CRS Store KEY",key)
    if (handle) {
      
    
      
      if (true)//(!route.routeConfig?.children || (route.routeConfig?.children && route.children.length == 0) )
      {
        console.log("CRS STORE>>>",key,"HANDLE",handle,"ROUTE",route.routeConfig) 
        
        this.routeCache.set(key, handle);
        console.log("CRS Store cache",this.routeCache)
      }
      else
      {
        console.log("STORE=>>NO!!!")
      }
      
      
      
    }
    
  }

  // Retrieves the stored detached route
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    console.log("CRS retrieve")
    let key = this.getFullPath(route)
    let retval =  this.routeCache.get(key) || null;
    console.log("Cache:",this.routeCache)
    console.log("Retreive:",key,route,retval)
    console.log("********************")
    return retval 
  }

  // Determines the key for storing the route
  private getRouteKey(route: ActivatedRouteSnapshot): string {
    let next = route;
    
    
    if (!route)
      return ''
    let path = route.url.join('/')
    console.log("getRouteKey",route.pathFromRoot)
    /*if (route.children.length>0){

      path=path+"/"+route.children[0].url
    }*/
    console.log("PATH=>>>",path)
    return path
  }
}
